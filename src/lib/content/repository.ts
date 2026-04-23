import { rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { navigation, projectCategories } from "@/data/site";
import { getDb, getUploadsDir } from "@/lib/content/db";
import type {
  DashboardProject,
  DashboardSectionKey,
  DashboardSections,
  DashboardSnapshot,
  MediaAsset,
  PublicSiteContent,
} from "@/lib/content/types";

type ProjectRow = {
  id: string;
  slug: string;
  category: DashboardProject["category"];
  category_label: string;
  title: string;
  subtitle: string;
  excerpt: string;
  hero_label: string;
  location: string;
  area: string;
  duration: string;
  status: string;
  year: string;
  hero_image: string;
  hero_alt: string;
  card_image: string;
  overview: string;
  challenge: string;
  solution: string;
  deliverables: unknown;
  gallery: unknown;
  materials: unknown;
  results: unknown;
  award_title: string;
  award_description: string;
  home_order: number | null;
};

type SectionRow = {
  key: DashboardSectionKey;
  value: unknown;
};

type MediaRow = {
  id: string;
  file_name: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  path: string;
  url: string;
  alt_text: string;
  created_at: string;
};

function parseJson<T>(value: unknown): T {
  if (typeof value === "string") {
    return JSON.parse(value) as T;
  }

  return value as T;
}

function mapProject(row: ProjectRow): DashboardProject {
  const homeOrder = row.home_order ?? null;

  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    categoryLabel: row.category_label,
    title: row.title,
    subtitle: row.subtitle,
    excerpt: row.excerpt,
    heroLabel: row.hero_label,
    location: row.location,
    area: row.area,
    duration: row.duration,
    status: row.status,
    year: row.year,
    heroImage: row.hero_image,
    heroAlt: row.hero_alt,
    cardImage: row.card_image,
    overview: row.overview,
    challenge: row.challenge,
    solution: row.solution,
    deliverables: parseJson(row.deliverables),
    gallery: parseJson(row.gallery),
    materials: parseJson(row.materials),
    results: parseJson(row.results),
    awardTitle: row.award_title,
    awardDescription: row.award_description,
    homeOrder,
    showOnHome: homeOrder !== null,
  };
}

function mapMedia(row: MediaRow): MediaAsset {
  return {
    id: row.id,
    fileName: row.file_name,
    originalName: row.original_name,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    path: row.path,
    url: row.url,
    altText: row.alt_text,
    createdAt: row.created_at,
  };
}

async function getSections(): Promise<DashboardSections> {
  const db = await getDb();
  const sections = await db.query<SectionRow>(
    "SELECT key, value FROM content_sections ORDER BY key ASC",
  );

  return sections.rows.reduce(
    (accumulator, row) => {
      accumulator[row.key] = parseJson(row.value);
      return accumulator;
    },
    {} as DashboardSections,
  );
}

export async function getProjects() {
  const db = await getDb();
  const result = await db.query<ProjectRow>(
    `
      SELECT *
      FROM projects
      ORDER BY
        CASE WHEN home_order IS NULL THEN 1 ELSE 0 END,
        home_order ASC NULLS LAST,
        created_at DESC
    `,
  );

  return result.rows.map(mapProject);
}

export async function getMediaAssets() {
  const db = await getDb();
  const result = await db.query<MediaRow>(
    `
      SELECT *
      FROM media_assets
      ORDER BY created_at DESC
    `,
  );

  return result.rows.map(mapMedia);
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [sections, projects, media] = await Promise.all([
    getSections(),
    getProjects(),
    getMediaAssets(),
  ]);

  return {
    sections,
    projects,
    media,
  };
}

export async function getPublicSiteContent(): Promise<PublicSiteContent> {
  const [sections, projects] = await Promise.all([getSections(), getProjects()]);
  const featuredProjects = [...projects]
    .filter((project) => project.homeOrder !== null)
    .sort((left, right) => (left.homeOrder ?? 99) - (right.homeOrder ?? 99));
  const heroProject =
    projects.find((project) => project.slug === sections.hero.featuredProjectSlug) ?? null;

  return {
    navigation,
    projectCategories,
    sections,
    projects,
    featuredProjects,
    heroProject,
  };
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getRelatedProjects(slug: string) {
  const projects = await getProjects();
  return projects.filter((project) => project.slug !== slug).slice(0, 2);
}

export async function saveSection<K extends DashboardSectionKey>(
  key: K,
  value: DashboardSections[K],
) {
  const db = await getDb();

  await db.query(
    `
      INSERT INTO content_sections (key, value)
      VALUES ($1, CAST($2 AS jsonb))
      ON CONFLICT (key)
      DO UPDATE SET
        value = EXCLUDED.value,
        updated_at = NOW()
    `,
    [key, JSON.stringify(value)],
  );

  return value;
}

function normaliseSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function ensureUniqueSlug(slug: string, ignoreId?: string) {
  const db = await getDb();
  const base = normaliseSlug(slug) || "project";
  let candidate = base;
  let index = 1;

  while (true) {
    const result = await db.query<{ id: string }>(
      "SELECT id FROM projects WHERE slug = $1 LIMIT 1",
      [candidate],
    );

    const existing = result.rows[0];

    if (!existing || existing.id === ignoreId) {
      return candidate;
    }

    index += 1;
    candidate = `${base}-${index}`;
  }
}

async function clearHomeSlot(slot: number, ignoreId?: string) {
  const db = await getDb();

  if (ignoreId) {
    await db.query(
      "UPDATE projects SET home_order = NULL, updated_at = NOW() WHERE home_order = $1 AND id <> $2",
      [slot, ignoreId],
    );
    return;
  }

  await db.query(
    "UPDATE projects SET home_order = NULL, updated_at = NOW() WHERE home_order = $1",
    [slot],
  );
}

async function findFirstFreeHomeSlot(ignoreId?: string) {
  const projects = await getProjects();
  const occupied = new Set(
    projects
      .filter((project) => project.id !== ignoreId && project.homeOrder !== null)
      .map((project) => project.homeOrder as number),
  );

  for (let slot = 1; slot <= 4; slot += 1) {
    if (!occupied.has(slot)) {
      return slot;
    }
  }

  return null;
}

type SaveProjectInput = Omit<DashboardProject, "showOnHome"> & {
  showOnHome?: boolean;
};

export async function saveProject(project: SaveProjectInput) {
  const db = await getDb();
  const id = project.id || crypto.randomUUID();
  const slug = await ensureUniqueSlug(project.slug || project.title, project.id || undefined);

  let homeOrder: number | null = null;

  if (project.showOnHome) {
    homeOrder =
      project.homeOrder && project.homeOrder >= 1 && project.homeOrder <= 4
        ? project.homeOrder
        : await findFirstFreeHomeSlot(project.id);

    if (homeOrder !== null) {
      await clearHomeSlot(homeOrder, project.id);
    }
  }

  await db.query(
    `
      INSERT INTO projects (
        id, slug, category, category_label, title, subtitle, excerpt, hero_label,
        location, area, duration, status, year, hero_image, hero_alt, card_image,
        overview, challenge, solution, deliverables, gallery, materials, results,
        award_title, award_description, home_order
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
        $17, $18, $19, CAST($20 AS jsonb), CAST($21 AS jsonb), CAST($22 AS jsonb),
        CAST($23 AS jsonb), $24, $25, $26
      )
      ON CONFLICT (id)
      DO UPDATE SET
        slug = EXCLUDED.slug,
        category = EXCLUDED.category,
        category_label = EXCLUDED.category_label,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        excerpt = EXCLUDED.excerpt,
        hero_label = EXCLUDED.hero_label,
        location = EXCLUDED.location,
        area = EXCLUDED.area,
        duration = EXCLUDED.duration,
        status = EXCLUDED.status,
        year = EXCLUDED.year,
        hero_image = EXCLUDED.hero_image,
        hero_alt = EXCLUDED.hero_alt,
        card_image = EXCLUDED.card_image,
        overview = EXCLUDED.overview,
        challenge = EXCLUDED.challenge,
        solution = EXCLUDED.solution,
        deliverables = EXCLUDED.deliverables,
        gallery = EXCLUDED.gallery,
        materials = EXCLUDED.materials,
        results = EXCLUDED.results,
        award_title = EXCLUDED.award_title,
        award_description = EXCLUDED.award_description,
        home_order = EXCLUDED.home_order,
        updated_at = NOW()
    `,
    [
      id,
      slug,
      project.category,
      project.categoryLabel,
      project.title,
      project.subtitle,
      project.excerpt,
      project.heroLabel,
      project.location,
      project.area,
      project.duration,
      project.status,
      project.year,
      project.heroImage,
      project.heroAlt,
      project.cardImage,
      project.overview,
      project.challenge,
      project.solution,
      JSON.stringify(project.deliverables),
      JSON.stringify(project.gallery),
      JSON.stringify(project.materials),
      JSON.stringify(project.results),
      project.awardTitle,
      project.awardDescription,
      homeOrder,
    ],
  );

  return getProjectBySlug(slug);
}

export async function saveFeaturedProjectSlots(
  assignments: Array<{ slot: number; projectId: string | null }>,
) {
  const db = await getDb();

  await db.query("UPDATE projects SET home_order = NULL, updated_at = NOW()");

  for (const assignment of assignments) {
    if (!assignment.projectId) {
      continue;
    }

    await db.query(
      "UPDATE projects SET home_order = $1, updated_at = NOW() WHERE id = $2",
      [assignment.slot, assignment.projectId],
    );
  }

  return getProjects();
}

export async function deleteProject(id: string) {
  const db = await getDb();
  const projectResult = await db.query<{ slug: string }>(
    "SELECT slug FROM projects WHERE id = $1 LIMIT 1",
    [id],
  );

  const slug = projectResult.rows[0]?.slug ?? null;

  await db.query("DELETE FROM projects WHERE id = $1", [id]);

  if (slug) {
    const sections = await getSections();

    if (sections.hero.featuredProjectSlug === slug) {
      await saveSection("hero", {
        ...sections.hero,
        featuredProjectSlug: null,
      });
    }
  }
}

function sanitiseFileName(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, extension);

  return `${baseName
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "media"}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}${extension || ".bin"}`;
}

export async function storeMediaAsset(file: File, altText = "") {
  const uploadsDir = getUploadsDir();
  const fileName = sanitiseFileName(file.name);
  const diskPath = path.join(uploadsDir, fileName);
  const url = `${process.env.NEXT_PUBLIC_UPLOADS_BASE_PATH ?? "/uploads"}/${fileName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(diskPath, buffer);

  const db = await getDb();
  const id = crypto.randomUUID();

  await db.query(
    `
      INSERT INTO media_assets (
        id, file_name, original_name, mime_type, size_bytes, path, url, alt_text
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      )
    `,
    [
      id,
      fileName,
      file.name,
      file.type || "application/octet-stream",
      buffer.byteLength,
      path
        .relative(/* turbopackIgnore: true */ process.cwd(), diskPath)
        .replace(/\\/g, "/"),
      url,
      altText,
    ],
  );

  const media = await getMediaAssets();
  return media.find((item) => item.id === id) ?? null;
}

export async function deleteMediaAsset(id: string) {
  const db = await getDb();
  const result = await db.query<MediaRow>(
    "SELECT * FROM media_assets WHERE id = $1 LIMIT 1",
    [id],
  );

  const asset = result.rows[0];

  if (!asset) {
    return;
  }

  await db.query("DELETE FROM media_assets WHERE id = $1", [id]);

  const absolutePath = path.resolve(/* turbopackIgnore: true */ process.cwd(), asset.path);
  const uploadsDir = path.resolve(getUploadsDir());

  if (absolutePath.startsWith(uploadsDir)) {
    await rm(absolutePath, { force: true });
  }
}
