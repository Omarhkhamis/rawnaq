import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";

import {
  initialMediaBlueprint,
  seedProjects,
  seedSections,
} from "@/lib/content/seed";
import type { DashboardProject, DashboardSectionKey } from "@/lib/content/types";
import type { PGlite as PGliteType } from "@electric-sql/pglite";

type DbInstance = PGliteType;

declare global {
  var __rawnaqDb: Promise<DbInstance> | undefined;
}

const DATABASE_PATH = path.resolve(
  /* turbopackIgnore: true */ process.cwd(),
  process.env.DATABASE_PATH ?? ".data/postgres",
);

const UPLOADS_DIR = path.resolve(
  /* turbopackIgnore: true */ process.cwd(),
  process.env.UPLOADS_DIR ?? "public/uploads",
);

function ensureDirectory(targetPath: string) {
  mkdirSync(targetPath, { recursive: true });
}

async function createSchema(db: DbInstance) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS content_sections (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      category_label TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL DEFAULT '',
      excerpt TEXT NOT NULL DEFAULT '',
      hero_label TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      area TEXT NOT NULL DEFAULT '',
      duration TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT '',
      year TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      hero_alt TEXT NOT NULL DEFAULT '',
      card_image TEXT NOT NULL DEFAULT '',
      overview TEXT NOT NULL DEFAULT '',
      challenge TEXT NOT NULL DEFAULT '',
      solution TEXT NOT NULL DEFAULT '',
      deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
      gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
      materials JSONB NOT NULL DEFAULT '[]'::jsonb,
      results JSONB NOT NULL DEFAULT '[]'::jsonb,
      award_title TEXT NOT NULL DEFAULT '',
      award_description TEXT NOT NULL DEFAULT '',
      home_order INTEGER UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT home_order_range CHECK (home_order BETWEEN 1 AND 4 OR home_order IS NULL)
    );

    CREATE TABLE IF NOT EXISTS media_assets (
      id TEXT PRIMARY KEY,
      file_name TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL DEFAULT 0,
      path TEXT NOT NULL,
      url TEXT NOT NULL,
      alt_text TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

function buildProjectParams(project: DashboardProject) {
  return [
    project.id,
    project.slug,
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
    project.homeOrder,
  ];
}

async function copySeedMediaIfNeeded(db: DbInstance) {
  ensureDirectory(UPLOADS_DIR);

  for (const item of initialMediaBlueprint) {
    const sourcePath = path.resolve(/* turbopackIgnore: true */ process.cwd(), item.sourcePath);
    const targetPath = path.resolve(/* turbopackIgnore: true */ process.cwd(), item.path);

    if (!existsSync(targetPath) && existsSync(sourcePath)) {
      copyFileSync(sourcePath, targetPath);
    }

    const existing = await db.query<{ id: string }>(
      "SELECT id FROM media_assets WHERE url = $1 LIMIT 1",
      [item.url],
    );

    if (existing.rows.length > 0 || !existsSync(targetPath)) {
      continue;
    }

    const stat = statSync(targetPath);

    await db.query(
      `
        INSERT INTO media_assets (
          id, file_name, original_name, mime_type, size_bytes, path, url, alt_text
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        )
      `,
      [
        crypto.randomUUID(),
        item.fileName,
        item.originalName,
        item.mimeType,
        stat.size,
        item.path,
        item.url,
        item.altText,
      ],
    );
  }
}

async function seedSectionsIfEmpty(db: DbInstance) {
  const sectionKeys = Object.keys(seedSections) as DashboardSectionKey[];

  for (const key of sectionKeys) {
    const result = await db.query<{ key: string }>(
      "SELECT key FROM content_sections WHERE key = $1 LIMIT 1",
      [key],
    );

    if (result.rows.length > 0) {
      continue;
    }

    await db.query(
      `
        INSERT INTO content_sections (key, value)
        VALUES ($1, CAST($2 AS jsonb))
      `,
      [key, JSON.stringify(seedSections[key])],
    );
  }
}

async function seedProjectsIfEmpty(db: DbInstance) {
  const existing = await db.query<{ total: number }>(
    "SELECT COUNT(*)::int AS total FROM projects",
  );

  if ((existing.rows[0]?.total ?? 0) > 0) {
    return;
  }

  for (const project of seedProjects) {
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
      `,
      buildProjectParams(project),
    );
  }
}

async function seedDatabase(db: DbInstance) {
  await copySeedMediaIfNeeded(db);
  await seedSectionsIfEmpty(db);
  await seedProjectsIfEmpty(db);
}

async function initialiseDb() {
  ensureDirectory(path.dirname(DATABASE_PATH));
  ensureDirectory(UPLOADS_DIR);

  const { PGlite } = await import("@electric-sql/pglite");
  const db = new PGlite(DATABASE_PATH);

  await createSchema(db);
  await seedDatabase(db);

  return db;
}

export async function getDb() {
  globalThis.__rawnaqDb ??= initialiseDb();
  return globalThis.__rawnaqDb;
}

export function getUploadsDir() {
  ensureDirectory(UPLOADS_DIR);
  return UPLOADS_DIR;
}
