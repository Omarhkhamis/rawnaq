"use client";

import { useMemo, useState, useTransition } from "react";
import { Plus, Trash2, X } from "lucide-react";

import type { IconKey } from "@/data/site";
import type { DashboardProject, FeatureIconKey, MediaAsset } from "@/lib/content/types";
import { MediaPickerField } from "@/components/dashboard/media-picker-field";

type ProjectModalProps = {
  initialProject: DashboardProject | null;
  media: MediaAsset[];
  onClose: () => void;
  onSave: (
    project: Omit<DashboardProject, "showOnHome"> & { showOnHome: boolean },
  ) => Promise<void>;
  onUploadMedia: (file: File, altText?: string) => Promise<MediaAsset | null>;
  onDeleteMedia: (id: string) => Promise<void>;
};

type ProjectDraft = Omit<DashboardProject, "showOnHome"> & { showOnHome: boolean };

const categoryOptions = [
  { value: "residential", label: "سكني", categoryLabel: "مشاريع سكنية" },
  { value: "commercial", label: "تجاري", categoryLabel: "مشاريع تجارية" },
] as const;

const iconOptions: Array<{ value: FeatureIconKey; label: string }> = [
  { value: "drafting", label: "Drafting" },
  { value: "paint", label: "Paint" },
  { value: "structure", label: "Structure" },
  { value: "ruler", label: "Ruler" },
  { value: "shield", label: "Shield" },
  { value: "window", label: "Window" },
  { value: "sofa", label: "Sofa" },
  { value: "badge", label: "Badge" },
  { value: "clock", label: "Clock" },
  { value: "handshake", label: "Handshake" },
  { value: "sparkles", label: "Sparkles" },
  { value: "layers", label: "Layers" },
  { value: "building", label: "Building" },
  { value: "home", label: "Home" },
  { value: "calculator", label: "Calculator" },
  { value: "calendar", label: "Calendar" },
  { value: "folder", label: "Folder" },
  { value: "file", label: "File" },
];

const contentIconOptions = iconOptions.filter(
  (option) =>
    option.value !== "calculator" &&
    option.value !== "calendar" &&
    option.value !== "folder" &&
    option.value !== "file",
);

function createEmptyProject(): ProjectDraft {
  return {
    id: "",
    slug: "",
    category: "residential",
    categoryLabel: "مشاريع سكنية",
    title: "",
    subtitle: "",
    excerpt: "",
    heroLabel: "",
    location: "",
    area: "",
    duration: "",
    status: "",
    year: "",
    heroImage: "",
    heroAlt: "",
    cardImage: "",
    overview: "",
    challenge: "",
    solution: "",
    deliverables: [""],
    gallery: [{ src: "", alt: "" }],
    materials: [{ title: "", description: "", icon: "layers" }],
    results: [{ value: 0, label: "", suffix: "", prefix: "", description: "" }],
    awardTitle: "",
    awardDescription: "",
    homeOrder: null,
    showOnHome: false,
  };
}

function Field({
  label,
  children,
  description,
}: {
  label: string;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-text">{label}</span>
      {description ? <p className="text-xs leading-6 text-text-muted">{description}</p> : null}
      {children}
    </label>
  );
}

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60 ${props.className ?? ""}`}
    />
  );
}

function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={`min-h-32 w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60 ${props.className ?? ""}`}
    />
  );
}

function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60 ${props.className ?? ""}`}
    />
  );
}

export function ProjectModal({
  initialProject,
  media,
  onClose,
  onSave,
  onUploadMedia,
  onDeleteMedia,
}: ProjectModalProps) {
  const [draft, setDraft] = useState<ProjectDraft>(
    initialProject
      ? {
          ...initialProject,
          showOnHome: initialProject.showOnHome,
        }
      : createEmptyProject(),
  );
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  const title = useMemo(
    () => (initialProject ? `تعديل مشروع: ${initialProject.title}` : "إضافة مشروع جديد"),
    [initialProject],
  );

  return (
    <div className="fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-black/75 px-4 py-8">
      <div className="panel w-full max-w-6xl px-5 py-5 md:px-6">
        <div className="flex items-center justify-between gap-4 border-b border-line/70 pb-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-text">{title}</h3>
            <p className="mt-1 text-sm text-text-muted">كل تفاصيل المشروع تُدار من هذا المودال، بما في ذلك الصور والمحتوى والعرض في الرئيسية.</p>
          </div>
          <button
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white/5 text-text-muted transition hover:text-text"
            onClick={onClose}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Field label="عنوان المشروع">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                value={draft.title}
              />
            </Field>
            <Field label="Slug">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, slug: event.target.value }))}
                value={draft.slug}
              />
            </Field>
            <Field label="التصنيف">
              <Select
                onChange={(event) => {
                  const option = categoryOptions.find((item) => item.value === event.target.value);

                  setDraft((current) => ({
                    ...current,
                    category: event.target.value as ProjectDraft["category"],
                    categoryLabel: option?.categoryLabel ?? current.categoryLabel,
                  }));
                }}
                value={draft.category}
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="عنوان التصنيف">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, categoryLabel: event.target.value }))}
                value={draft.categoryLabel}
              />
            </Field>
            <Field label="العنوان الفرعي">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, subtitle: event.target.value }))}
                value={draft.subtitle}
              />
            </Field>
            <Field label="وسم الهيرو">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, heroLabel: event.target.value }))}
                value={draft.heroLabel}
              />
            </Field>
            <Field label="الموقع">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))}
                value={draft.location}
              />
            </Field>
            <Field label="المساحة">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, area: event.target.value }))}
                value={draft.area}
              />
            </Field>
            <Field label="المدة">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, duration: event.target.value }))}
                value={draft.duration}
              />
            </Field>
            <Field label="الحالة">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}
                value={draft.status}
              />
            </Field>
            <Field label="السنة">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, year: event.target.value }))}
                value={draft.year}
              />
            </Field>
          </div>

          <Field label="وصف مختصر">
            <Textarea
              onChange={(event) => setDraft((current) => ({ ...current, excerpt: event.target.value }))}
              rows={4}
              value={draft.excerpt}
            />
          </Field>

          <div className="grid gap-4 xl:grid-cols-2">
            <MediaPickerField
              label="صورة الهيرو"
              media={media}
              onChange={(value) => setDraft((current) => ({ ...current, heroImage: value }))}
              onDeleteMedia={onDeleteMedia}
              onUpload={onUploadMedia}
              value={draft.heroImage}
            />
            <Field label="النص البديل لصورة الهيرو">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, heroAlt: event.target.value }))}
                value={draft.heroAlt}
              />
            </Field>
            <MediaPickerField
              label="صورة البطاقة"
              media={media}
              onChange={(value) => setDraft((current) => ({ ...current, cardImage: value }))}
              onDeleteMedia={onDeleteMedia}
              onUpload={onUploadMedia}
              value={draft.cardImage}
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <Field label="نظرة عامة">
              <Textarea
                onChange={(event) => setDraft((current) => ({ ...current, overview: event.target.value }))}
                value={draft.overview}
              />
            </Field>
            <Field label="التحدي">
              <Textarea
                onChange={(event) => setDraft((current) => ({ ...current, challenge: event.target.value }))}
                value={draft.challenge}
              />
            </Field>
            <Field label="الحل">
              <Textarea
                onChange={(event) => setDraft((current) => ({ ...current, solution: event.target.value }))}
                value={draft.solution}
              />
            </Field>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <Field label="عنوان التميز">
              <Input
                onChange={(event) => setDraft((current) => ({ ...current, awardTitle: event.target.value }))}
                value={draft.awardTitle}
              />
            </Field>
            <Field label="وصف التميز">
              <Textarea
                onChange={(event) => setDraft((current) => ({ ...current, awardDescription: event.target.value }))}
                rows={4}
                value={draft.awardDescription}
              />
            </Field>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-black/15 p-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-display text-xl font-bold text-text">العرض في الرئيسية</h4>
                <p className="text-sm text-text-muted">يمكنك تفعيل المشروع في الرئيسية وتحديد ترتيبه بين 4 خانات.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
              <label className="inline-flex items-center gap-3 rounded-2xl border border-line bg-white/5 px-4 py-3 text-sm text-text">
                <input
                  checked={draft.showOnHome}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      showOnHome: event.target.checked,
                      homeOrder: event.target.checked ? current.homeOrder ?? 1 : null,
                    }))
                  }
                  type="checkbox"
                />
                إظهار في الرئيسية
              </label>
              <Select
                disabled={!draft.showOnHome}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    homeOrder: event.target.value ? Number(event.target.value) : null,
                  }))
                }
                value={draft.homeOrder ?? ""}
              >
                <option value="">اختر الترتيب</option>
                <option value="1">الخانة 1</option>
                <option value="2">الخانة 2</option>
                <option value="3">الخانة 3</option>
                <option value="4">الخانة 4</option>
              </Select>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-black/15 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="font-display text-xl font-bold text-text">نطاق العمل</h4>
                <p className="text-sm text-text-muted">أضف عناصر التنفيذ التي ستظهر داخل صفحة المشروع.</p>
              </div>
              <button
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    deliverables: [...current.deliverables, ""],
                  }))
                }
                type="button"
              >
                <Plus className="size-4" />
                إضافة بند
              </button>
            </div>
            <div className="space-y-3">
              {draft.deliverables.map((item, index) => (
                <div className="grid gap-3 md:grid-cols-[1fr_auto]" key={`deliverable-${index}`}>
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        deliverables: current.deliverables.map((deliverable, itemIndex) =>
                          itemIndex === index ? event.target.value : deliverable,
                        ),
                      }))
                    }
                    value={item}
                  />
                  <button
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200 transition"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        deliverables:
                          current.deliverables.length > 1
                            ? current.deliverables.filter((_, itemIndex) => itemIndex !== index)
                            : [""],
                      }))
                    }
                    type="button"
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-black/15 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="font-display text-xl font-bold text-text">معرض الصور</h4>
                <p className="text-sm text-text-muted">أضف صور المشروع التي تظهر داخل صفحة التفاصيل.</p>
              </div>
              <button
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    gallery: [...current.gallery, { src: "", alt: "" }],
                  }))
                }
                type="button"
              >
                <Plus className="size-4" />
                إضافة صورة
              </button>
            </div>
            <div className="space-y-4">
              {draft.gallery.map((image, index) => (
                <div className="rounded-3xl border border-line/70 p-4" key={`gallery-${index}`}>
                  <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr_auto]">
                    <MediaPickerField
                      label={`صورة ${index + 1}`}
                      media={media}
                      onChange={(value) =>
                        setDraft((current) => ({
                          ...current,
                          gallery: current.gallery.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, src: value } : item,
                          ),
                        }))
                      }
                      onDeleteMedia={onDeleteMedia}
                      onUpload={onUploadMedia}
                      value={image.src}
                    />
                    <Field label="النص البديل">
                      <Input
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            gallery: current.gallery.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, alt: event.target.value } : item,
                            ),
                          }))
                        }
                        value={image.alt}
                      />
                    </Field>
                    <button
                      className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200 transition"
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          gallery:
                            current.gallery.length > 1
                              ? current.gallery.filter((_, itemIndex) => itemIndex !== index)
                              : [{ src: "", alt: "" }],
                        }))
                      }
                      type="button"
                    >
                      <Trash2 className="size-4" />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-black/15 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="font-display text-xl font-bold text-text">المواد والتشطيبات</h4>
                <p className="text-sm text-text-muted">كل مادة تحتوي عنواناً ووصفاً وأيقونة.</p>
              </div>
              <button
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    materials: [...current.materials, { title: "", description: "", icon: "layers" }],
                  }))
                }
                type="button"
              >
                <Plus className="size-4" />
                إضافة مادة
              </button>
            </div>
            <div className="space-y-4">
              {draft.materials.map((material, index) => (
                <div className="grid gap-4 rounded-3xl border border-line/70 p-4 xl:grid-cols-[1fr_1.4fr_0.8fr_auto]" key={`material-${index}`}>
                  <Field label="الاسم">
                    <Input
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          materials: current.materials.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, title: event.target.value } : item,
                          ),
                        }))
                      }
                      value={material.title}
                    />
                  </Field>
                  <Field label="الوصف">
                    <Textarea
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          materials: current.materials.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, description: event.target.value } : item,
                          ),
                        }))
                      }
                      rows={4}
                      value={material.description}
                    />
                  </Field>
                  <Field label="الأيقونة">
                    <Select
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          materials: current.materials.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, icon: event.target.value as IconKey } : item,
                          ),
                        }))
                      }
                      value={material.icon}
                    >
                      {contentIconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <button
                    className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200 transition"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        materials:
                          current.materials.length > 1
                            ? current.materials.filter((_, itemIndex) => itemIndex !== index)
                            : [{ title: "", description: "", icon: "layers" }],
                      }))
                    }
                    type="button"
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-black/15 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="font-display text-xl font-bold text-text">نتائج المشروع</h4>
                <p className="text-sm text-text-muted">القيمة رقمية، ويمكن إضافة Prefix أو Suffix مثل + أو %.</p>
              </div>
              <button
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    results: [
                      ...current.results,
                      { value: 0, label: "", suffix: "", prefix: "", description: "" },
                    ],
                  }))
                }
                type="button"
              >
                <Plus className="size-4" />
                إضافة نتيجة
              </button>
            </div>
            <div className="space-y-4">
              {draft.results.map((result, index) => (
                <div className="grid gap-4 rounded-3xl border border-line/70 p-4 xl:grid-cols-[0.5fr_1fr_0.6fr_0.6fr_auto]" key={`result-${index}`}>
                  <Field label="القيمة">
                    <Input
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          results: current.results.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, value: Number(event.target.value || 0) } : item,
                          ),
                        }))
                      }
                      type="number"
                      value={String(result.value)}
                    />
                  </Field>
                  <Field label="العنوان">
                    <Input
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          results: current.results.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, label: event.target.value } : item,
                          ),
                        }))
                      }
                      value={result.label}
                    />
                  </Field>
                  <Field label="Prefix">
                    <Input
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          results: current.results.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, prefix: event.target.value } : item,
                          ),
                        }))
                      }
                      value={result.prefix ?? ""}
                    />
                  </Field>
                  <Field label="Suffix">
                    <Input
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          results: current.results.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, suffix: event.target.value } : item,
                          ),
                        }))
                      }
                      value={result.suffix ?? ""}
                    />
                  </Field>
                  <button
                    className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200 transition"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        results:
                          current.results.length > 1
                            ? current.results.filter((_, itemIndex) => itemIndex !== index)
                            : [{ value: 0, label: "", suffix: "", prefix: "", description: "" }],
                      }))
                    }
                    type="button"
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-line/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">{status ?? "تحقق من الحقول ثم احفظ التغييرات."}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-line bg-white/5 px-5 text-sm font-semibold text-text transition"
              onClick={onClose}
              type="button"
            >
              إغلاق
            </button>
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-primary bg-primary px-5 text-sm font-semibold text-[#53211c] transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  setStatus("جارٍ حفظ المشروع...");
                  await onSave(draft);
                  setStatus("تم حفظ المشروع.");
                  onClose();
                });
              }}
              type="button"
            >
              {isPending ? "جارٍ الحفظ..." : "حفظ المشروع"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
