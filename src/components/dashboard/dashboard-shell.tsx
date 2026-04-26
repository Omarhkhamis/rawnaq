"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  Copy,
  LogOut,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import { MediaPickerField } from "@/components/dashboard/media-picker-field";
import {
  FeatureIconSelectOption,
  FeatureIconSelectValue,
} from "@/components/dashboard/feature-icon-select-content";
import { ProjectModal } from "@/components/dashboard/project-modal";
import { SelectField as Select } from "@/components/dashboard/select-field";
import {
  dashboardTabs,
  type DashboardTabKey,
} from "@/lib/content/dashboard-tabs";
import type {
  AdminAccount,
  DashboardProject,
  DashboardSectionKey,
  DashboardSections,
  DashboardSnapshot,
  FeatureIconKey,
  MediaAsset,
} from "@/lib/content/types";
import { getSocialPlatformLabel, socialPlatformOptions, type IconKey } from "@/data/site";

type DashboardShellProps = {
  activeTab: DashboardTabKey;
  currentAdmin: AdminAccount;
  initialSnapshot: DashboardSnapshot;
};

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

const defaultSocialLink = {
  platform: socialPlatformOptions[0].value,
  label: socialPlatformOptions[0].label,
  href: "",
};

const confirmedDeleteButtons = new WeakSet<HTMLButtonElement>();

function showSaveToast() {
  void Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "تم الحفظ بنجاح",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#16a34a",
    color: "#ffffff",
    iconColor: "#ffffff",
  });
}

async function confirmDelete() {
  const result = await Swal.fire({
    title: "تأكيد الحذف",
    text: "هل أنت متأكد من تنفيذ عملية الحذف؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "نعم، احذف",
    cancelButtonText: "إلغاء",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    reverseButtons: true,
  });

  return result.isConfirmed;
}

function renderIconOption(value: string, selected = false) {
  const option = iconOptions.find((item) => item.value === value) ?? contentIconOptions.find((item) => item.value === value);

  if (!option) {
    return null;
  }

  return <FeatureIconSelectOption label={option.label} name={option.value} selected={selected} />;
}

function renderSelectedIconOption(value: string) {
  const option = iconOptions.find((item) => item.value === value) ?? contentIconOptions.find((item) => item.value === value);

  if (!option) {
    return <span className="text-text-muted">{value}</span>;
  }

  return <FeatureIconSelectValue label={option.label} name={option.value} />;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "حدث خطأ غير متوقع.";
}

async function requestJson<T>(url: string, init: RequestInit) {
  const response = await fetch(url, init);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error ?? "Request failed");
  }

  return data as T;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-text">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60 ${props.className ?? ""}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-28 w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60 ${props.className ?? ""}`}
    />
  );
}

function EditorCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel px-5 py-5 md:px-6">
      <div className="mb-5">
        <h2 className="font-display text-2xl font-bold text-text">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SaveBar({
  status,
  isPending,
  onSave,
}: {
  status: string | null;
  isPending: boolean;
  onSave: () => void;
}) {
  return (
    <div className="mt-5 flex flex-col gap-3 border-t border-line/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-text-muted">{status ?? "التغييرات المحلية لم تُحفظ بعد."}</p>
      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-primary bg-primary px-5 text-sm font-semibold text-[#53211c] transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isPending}
        onClick={onSave}
        type="button"
      >
        <Save className="size-4" />
        {isPending ? "جارٍ الحفظ..." : "حفظ التغييرات"}
      </button>
    </div>
  );
}

function useSectionDraft<T>(initialValue: T, onPersist: (value: T) => Promise<T>) {
  const [draft, setDraft] = useState(initialValue);
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      try {
        setStatus("جارٍ الحفظ...");
        const saved = await onPersist(draft);
        setDraft(saved);
        setStatus("تم حفظ التغييرات.");
      } catch (error) {
        setStatus(getErrorMessage(error));
      }
    });
  }

  return {
    draft,
    setDraft,
    status,
    isPending,
    save,
  };
}

function HeroEditor({
  section,
  projects,
  media,
  onSave,
  onUploadMedia,
  onDeleteMedia,
}: {
  section: DashboardSections["hero"];
  projects: DashboardProject[];
  media: MediaAsset[];
  onSave: (value: DashboardSections["hero"]) => Promise<DashboardSections["hero"]>;
  onUploadMedia: (file: File, altText?: string) => Promise<MediaAsset | null>;
  onDeleteMedia: (id: string) => Promise<void>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="إدارة الهيرو">
      <div className="space-y-5">
        <div className="grid gap-4 xl:grid-cols-2">
          <Field label="العنوان الرئيسي">
            <Textarea
              onChange={(event) => setDraft((current) => ({ ...current, heading: event.target.value }))}
              rows={3}
              value={draft.heading}
            />
          </Field>
          <Field label="الوصف">
            <Textarea
              onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
              rows={5}
              value={draft.description}
            />
          </Field>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <MediaPickerField
            label="صورة خلفية الهيرو"
            media={media}
            onChange={(value) => setDraft((current) => ({ ...current, backgroundImage: value }))}
            onDeleteMedia={onDeleteMedia}
            onUpload={onUploadMedia}
            value={draft.backgroundImage}
          />
          <Field label="النص البديل للخلفية">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, backgroundAlt: event.target.value }))}
              value={draft.backgroundAlt}
            />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="زر التواصل">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, primaryButtonLabel: event.target.value }))}
              value={draft.primaryButtonLabel}
            />
          </Field>
          <Field label="زر المشاريع">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, secondaryButtonLabel: event.target.value }))}
              value={draft.secondaryButtonLabel}
            />
          </Field>
          <Field label="وسم بطاقة المشروع">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, badgeText: event.target.value }))}
              value={draft.badgeText}
            />
          </Field>
          <Field label="النص العائم الصغير">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, floatingLabel: event.target.value }))}
              value={draft.floatingLabel}
            />
          </Field>
          <Field label="النص العائم الكبير">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, floatingTitle: event.target.value }))}
              value={draft.floatingTitle}
            />
          </Field>
          <Field label="المشروع المعروض">
            <Select
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  featuredProjectSlug: event.target.value || null,
                }))
              }
              value={draft.featuredProjectSlug ?? ""}
            >
              <option value="">بدون مشروع</option>
              {projects.map((project) => (
                <option key={project.id} value={project.slug}>
                  {project.title}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <EditorCard title="النقاط المختصرة">
          <div className="space-y-3">
            {draft.highlights.map((item, index) => (
              <div className="grid gap-3 md:grid-cols-[1fr_auto]" key={`highlight-${index}`}>
                <Input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      highlights: current.highlights.map((value, itemIndex) =>
                        itemIndex === index ? event.target.value : value,
                      ),
                    }))
                  }
                  value={item}
                />
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      highlights:
                        current.highlights.length > 1
                          ? current.highlights.filter((_, itemIndex) => itemIndex !== index)
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
            <button
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
              onClick={() => setDraft((current) => ({ ...current, highlights: [...current.highlights, ""] }))}
              type="button"
            >
              <Plus className="size-4" />
              إضافة نقطة
            </button>
          </div>
        </EditorCard>

        <EditorCard title="إحصائيات الصفحة">
          <div className="space-y-4">
            {draft.stats.map((stat, index) => (
              <div className="grid gap-4 rounded-3xl border border-line/70 p-4 xl:grid-cols-[0.6fr_1fr_0.6fr_0.6fr_auto]" key={`stat-${index}`}>
                <Field label="القيمة">
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        stats: current.stats.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, value: Number(event.target.value || 0) } : item,
                        ),
                      }))
                    }
                    type="number"
                    value={String(stat.value)}
                  />
                </Field>
                <Field label="العنوان">
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        stats: current.stats.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, label: event.target.value } : item,
                        ),
                      }))
                    }
                    value={stat.label}
                  />
                </Field>
                <Field label="Prefix">
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        stats: current.stats.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, prefix: event.target.value } : item,
                        ),
                      }))
                    }
                    value={stat.prefix ?? ""}
                  />
                </Field>
                <Field label="Suffix">
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        stats: current.stats.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, suffix: event.target.value } : item,
                        ),
                      }))
                    }
                    value={stat.suffix ?? ""}
                  />
                </Field>
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      stats:
                        current.stats.length > 1
                          ? current.stats.filter((_, itemIndex) => itemIndex !== index)
                          : [{ value: 0, label: "", suffix: "", prefix: "", description: "" }],
                    }))
                  }
                  type="button"
                >
                  <Trash2 className="size-4" />
                  حذف
                </button>
                <div className="xl:col-span-5">
                  <Field label="الوصف">
                    <Textarea
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          stats: current.stats.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, description: event.target.value } : item,
                          ),
                        }))
                      }
                      rows={3}
                      value={stat.description ?? ""}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </EditorCard>

        <SaveBar isPending={isPending} onSave={save} status={status} />
      </div>
    </EditorCard>
  );
}

function AboutEditor({
  section,
  media,
  onSave,
  onUploadMedia,
  onDeleteMedia,
}: {
  section: DashboardSections["about"];
  media: MediaAsset[];
  onSave: (value: DashboardSections["about"]) => Promise<DashboardSections["about"]>;
  onUploadMedia: (file: File, altText?: string) => Promise<MediaAsset | null>;
  onDeleteMedia: (id: string) => Promise<void>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="إدارة من نحن">
      <div className="space-y-5">
        <div className="grid gap-4 xl:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, eyebrow: event.target.value }))}
              value={draft.eyebrow}
            />
          </Field>
          <Field label="عنوان القسم">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              value={draft.title}
            />
          </Field>
        </div>

        <Field label="الوصف الرئيسي">
          <Textarea
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            rows={5}
            value={draft.description}
          />
        </Field>

        <div className="grid gap-4 xl:grid-cols-2">
          <MediaPickerField
            label="صورة القسم"
            media={media}
            onChange={(value) => setDraft((current) => ({ ...current, image: value }))}
            onDeleteMedia={onDeleteMedia}
            onUpload={onUploadMedia}
            value={draft.image}
          />
          <Field label="النص البديل للصورة">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, imageAlt: event.target.value }))}
              value={draft.imageAlt}
            />
          </Field>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Field label="عنوان بطاقة الإحصائيات">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, badgeTitle: event.target.value }))}
              value={draft.badgeTitle}
            />
          </Field>
          {draft.badgeLabels.map((label, index) => (
            <Field key={`badge-label-${index}`} label={`تسمية الإحصائية ${index + 1}`}>
              <Input
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    badgeLabels: current.badgeLabels.map((item, itemIndex) =>
                      itemIndex === index ? event.target.value : item,
                    ),
                  }))
                }
                value={label}
              />
            </Field>
          ))}
        </div>

        <EditorCard title="العناوين الفرعية">
          <div className="space-y-4">
            {draft.highlights.map((item, index) => (
              <div className="grid gap-4 rounded-3xl border border-line/70 p-4 xl:grid-cols-[1fr_1.4fr_auto]" key={`about-highlight-${index}`}>
                <Field label="العنوان">
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        highlights: current.highlights.map((value, itemIndex) =>
                          itemIndex === index ? { ...value, title: event.target.value } : value,
                        ),
                      }))
                    }
                    value={item.title}
                  />
                </Field>
                <Field label="الوصف">
                  <Textarea
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        highlights: current.highlights.map((value, itemIndex) =>
                          itemIndex === index ? { ...value, description: event.target.value } : value,
                        ),
                      }))
                    }
                    rows={4}
                    value={item.description ?? ""}
                  />
                </Field>
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      highlights:
                        current.highlights.length > 1
                          ? current.highlights.filter((_, itemIndex) => itemIndex !== index)
                          : [{ title: "", description: "" }],
                    }))
                  }
                  type="button"
                >
                  <Trash2 className="size-4" />
                  حذف
                </button>
              </div>
            ))}
            <button
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  highlights: [...current.highlights, { title: "", description: "" }],
                }))
              }
              type="button"
            >
              <Plus className="size-4" />
              إضافة عنوان فرعي
            </button>
          </div>
        </EditorCard>

        <EditorCard title="نقاط التعريف">
          <div className="space-y-3">
            {draft.points.map((point, index) => (
              <div className="grid gap-3 md:grid-cols-[1fr_auto]" key={`about-point-${index}`}>
                <Input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      points: current.points.map((value, itemIndex) =>
                        itemIndex === index ? event.target.value : value,
                      ),
                    }))
                  }
                  value={point}
                />
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      points:
                        current.points.length > 1
                          ? current.points.filter((_, itemIndex) => itemIndex !== index)
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
            <button
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
              onClick={() => setDraft((current) => ({ ...current, points: [...current.points, ""] }))}
              type="button"
            >
              <Plus className="size-4" />
              إضافة نقطة
            </button>
          </div>
        </EditorCard>

        <SaveBar isPending={isPending} onSave={save} status={status} />
      </div>
    </EditorCard>
  );
}

function ServicesEditor({
  section,
  media,
  onSave,
  onUploadMedia,
  onDeleteMedia,
}: {
  section: DashboardSections["services"];
  media: MediaAsset[];
  onSave: (value: DashboardSections["services"]) => Promise<DashboardSections["services"]>;
  onUploadMedia: (file: File, altText?: string) => Promise<MediaAsset | null>;
  onDeleteMedia: (id: string) => Promise<void>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="إدارة الخدمات">
      <div className="space-y-5">
        <div className="grid gap-4 xl:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, eyebrow: event.target.value }))}
              value={draft.eyebrow}
            />
          </Field>
          <Field label="عنوان القسم">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              value={draft.title}
            />
          </Field>
        </div>
        <Field label="وصف القسم">
          <Textarea
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            rows={4}
            value={draft.description ?? ""}
          />
        </Field>

        <div className="space-y-4">
          {draft.items.map((service, index) => (
            <div className="rounded-[1.75rem] border border-line bg-black/15 p-4" key={`${service.title}-${index}`}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-bold text-text">خدمة {index + 1}</h3>
                <button
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      items:
                        current.items.length > 1
                          ? current.items.filter((_, itemIndex) => itemIndex !== index)
                          : [
                              {
                                title: "",
                                description: "",
                                icon: "drafting",
                                eyebrow: "",
                                layout: "standard",
                              },
                            ],
                    }))
                  }
                  type="button"
                >
                  <Trash2 className="size-4" />
                  حذف
                </button>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                <Field label="اسم الخدمة">
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        items: current.items.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, title: event.target.value } : item,
                        ),
                      }))
                    }
                    value={service.title}
                  />
                </Field>
                <Field label="Eyebrow">
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        items: current.items.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, eyebrow: event.target.value } : item,
                        ),
                      }))
                    }
                    value={service.eyebrow}
                  />
                </Field>
                <Field label="الوصف">
                  <Textarea
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        items: current.items.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, description: event.target.value } : item,
                        ),
                      }))
                    }
                    rows={4}
                    value={service.description}
                  />
                </Field>
                <div className="grid gap-4">
                  <Field label="الأيقونة">
                    <Select
                      optionLayout="grid"
                      renderOption={(option, selected) => renderIconOption(option.value, selected)}
                      renderSelectedOption={(option) =>
                        option ? renderSelectedIconOption(option.value) : null
                      }
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          items: current.items.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, icon: event.target.value as IconKey }
                              : item,
                          ),
                        }))
                      }
                      value={service.icon}
                    >
                      {contentIconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="التمدد">
                    <Select
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          items: current.items.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, layout: event.target.value as "featured" | "standard" | "wide" }
                              : item,
                          ),
                        }))
                      }
                      value={service.layout}
                    >
                      <option value="featured">Featured</option>
                      <option value="standard">Standard</option>
                      <option value="wide">Wide</option>
                    </Select>
                  </Field>
                </div>
                <MediaPickerField
                  label="صورة الخدمة"
                  media={media}
                  onChange={(value) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, image: value } : item,
                      ),
                    }))
                  }
                  onDeleteMedia={onDeleteMedia}
                  onUpload={onUploadMedia}
                  value={service.image ?? ""}
                />
                <Field label="النص البديل للصورة">
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        items: current.items.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, imageAlt: event.target.value } : item,
                        ),
                      }))
                    }
                    value={service.imageAlt ?? ""}
                  />
                </Field>
              </div>
            </div>
          ))}
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                items: [
                  ...current.items,
                  {
                    title: "",
                    description: "",
                    icon: "drafting",
                    eyebrow: "",
                    layout: "standard",
                  },
                ],
              }))
            }
            type="button"
          >
            <Plus className="size-4" />
            إضافة خدمة
          </button>
        </div>

        <SaveBar isPending={isPending} onSave={save} status={status} />
      </div>
    </EditorCard>
  );
}

function WorkflowEditor({
  section,
  onSave,
}: {
  section: DashboardSections["workflow"];
  onSave: (value: DashboardSections["workflow"]) => Promise<DashboardSections["workflow"]>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="إدارة مسار العمل">
      <div className="space-y-5">
        <div className="grid gap-4 xl:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, eyebrow: event.target.value }))}
              value={draft.eyebrow}
            />
          </Field>
          <Field label="العنوان">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              value={draft.title}
            />
          </Field>
          <Field label="عنوان البطاقة الجانبية">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, summaryTitle: event.target.value }))}
              value={draft.summaryTitle}
            />
          </Field>
          <Field label="زر البطاقة">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, ctaLabel: event.target.value }))}
              value={draft.ctaLabel}
            />
          </Field>
        </div>
        <Field label="وصف البطاقة">
          <Textarea
            onChange={(event) => setDraft((current) => ({ ...current, summaryDescription: event.target.value }))}
            rows={4}
            value={draft.summaryDescription}
          />
        </Field>

        <div className="space-y-4">
          {draft.items.map((item, index) => (
            <div className="grid gap-4 rounded-[1.75rem] border border-line bg-black/15 p-4 xl:grid-cols-[0.4fr_1fr_1.6fr_auto]" key={`${item.step}-${index}`}>
              <Field label="رقم الخطوة">
                <Input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index ? { ...value, step: event.target.value } : value,
                      ),
                    }))
                  }
                  value={item.step}
                />
              </Field>
              <Field label="العنوان">
                <Input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index ? { ...value, title: event.target.value } : value,
                      ),
                    }))
                  }
                  value={item.title}
                />
              </Field>
              <Field label="الوصف">
                <Textarea
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index ? { ...value, description: event.target.value } : value,
                      ),
                    }))
                  }
                  rows={4}
                  value={item.description}
                />
              </Field>
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    items:
                      current.items.length > 1
                        ? current.items.filter((_, itemIndex) => itemIndex !== index)
                        : [{ step: "", title: "", description: "" }],
                  }))
                }
                type="button"
              >
                <Trash2 className="size-4" />
                حذف
              </button>
            </div>
          ))}
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                items: [...current.items, { step: "", title: "", description: "" }],
              }))
            }
            type="button"
          >
            <Plus className="size-4" />
            إضافة خطوة
          </button>
        </div>
        <SaveBar isPending={isPending} onSave={save} status={status} />
      </div>
    </EditorCard>
  );
}

function WhyEditor({
  section,
  onSave,
}: {
  section: DashboardSections["whyRawnaq"];
  onSave: (value: DashboardSections["whyRawnaq"]) => Promise<DashboardSections["whyRawnaq"]>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="إدارة لماذا رونق">
      <div className="space-y-5">
        <div className="grid gap-4 xl:grid-cols-3">
          <Field label="Eyebrow">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, eyebrow: event.target.value }))}
              value={draft.eyebrow}
            />
          </Field>
          <Field label="العنوان">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              value={draft.title}
            />
          </Field>
          <Field label="Watermark">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, watermark: event.target.value }))}
              value={draft.watermark}
            />
          </Field>
        </div>

        <div className="space-y-4">
          {draft.items.map((item, index) => (
            <div className="grid gap-4 rounded-[1.75rem] border border-line bg-black/15 p-4 xl:grid-cols-[1fr_1.5fr_0.8fr_auto]" key={`${item.title}-${index}`}>
              <Field label="العنوان">
                <Input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index ? { ...value, title: event.target.value } : value,
                      ),
                    }))
                  }
                  value={item.title}
                />
              </Field>
              <Field label="الوصف">
                <Textarea
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index ? { ...value, description: event.target.value } : value,
                      ),
                    }))
                  }
                  rows={4}
                  value={item.description}
                />
              </Field>
              <Field label="الأيقونة">
                <Select
                  optionLayout="grid"
                  renderOption={(option, selected) => renderIconOption(option.value, selected)}
                  renderSelectedOption={(option) =>
                    option ? renderSelectedIconOption(option.value) : null
                  }
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index
                          ? { ...value, icon: event.target.value as FeatureIconKey }
                          : value,
                      ),
                    }))
                  }
                  value={item.icon}
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    items:
                      current.items.length > 1
                        ? current.items.filter((_, itemIndex) => itemIndex !== index)
                        : [{ title: "", description: "", icon: "calculator" }],
                  }))
                }
                type="button"
              >
                <Trash2 className="size-4" />
                حذف
              </button>
            </div>
          ))}
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                items: [...current.items, { title: "", description: "", icon: "calculator" }],
              }))
            }
            type="button"
          >
            <Plus className="size-4" />
            إضافة بطاقة
          </button>
        </div>
        <SaveBar isPending={isPending} onSave={save} status={status} />
      </div>
    </EditorCard>
  );
}

function ValuesEditor({
  section,
  onSave,
}: {
  section: DashboardSections["values"];
  onSave: (value: DashboardSections["values"]) => Promise<DashboardSections["values"]>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="إدارة القيم الجوهرية">
      <div className="space-y-5">
        <div className="grid gap-4 xl:grid-cols-3">
          <Field label="Eyebrow">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, eyebrow: event.target.value }))}
              value={draft.eyebrow}
            />
          </Field>
          <Field label="العنوان">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              value={draft.title}
            />
          </Field>
          <Field label="Watermark">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, watermark: event.target.value }))}
              value={draft.watermark}
            />
          </Field>
        </div>
        <Field label="الوصف">
          <Textarea
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            rows={4}
            value={draft.description}
          />
        </Field>

        <div className="space-y-4">
          {draft.items.map((item, index) => (
            <div className="grid gap-4 rounded-[1.75rem] border border-line bg-black/15 p-4 xl:grid-cols-[1fr_1.5fr_0.8fr_auto]" key={`${item.title}-${index}`}>
              <Field label="العنوان">
                <Input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index ? { ...value, title: event.target.value } : value,
                      ),
                    }))
                  }
                  value={item.title}
                />
              </Field>
              <Field label="الوصف">
                <Textarea
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index ? { ...value, description: event.target.value } : value,
                      ),
                    }))
                  }
                  rows={4}
                  value={item.description}
                />
              </Field>
              <Field label="الأيقونة">
                <Select
                  optionLayout="grid"
                  renderOption={(option, selected) => renderIconOption(option.value, selected)}
                  renderSelectedOption={(option) =>
                    option ? renderSelectedIconOption(option.value) : null
                  }
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index
                          ? { ...value, icon: event.target.value as IconKey }
                          : value,
                      ),
                    }))
                  }
                  value={item.icon}
                >
                  {contentIconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    items:
                      current.items.length > 1
                        ? current.items.filter((_, itemIndex) => itemIndex !== index)
                        : [{ title: "", description: "", icon: "badge" }],
                  }))
                }
                type="button"
              >
                <Trash2 className="size-4" />
                حذف
              </button>
            </div>
          ))}
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                items: [...current.items, { title: "", description: "", icon: "badge" }],
              }))
            }
            type="button"
          >
            <Plus className="size-4" />
            إضافة قيمة
          </button>
        </div>
        <SaveBar isPending={isPending} onSave={save} status={status} />
      </div>
    </EditorCard>
  );
}

function FaqEditor({
  section,
  onSave,
}: {
  section: DashboardSections["faq"];
  onSave: (value: DashboardSections["faq"]) => Promise<DashboardSections["faq"]>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="إدارة الأسئلة الشائعة">
      <div className="space-y-5">
        <div className="grid gap-4 xl:grid-cols-2">
          <Field label="Eyebrow">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, eyebrow: event.target.value }))}
              value={draft.eyebrow}
            />
          </Field>
          <Field label="العنوان">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              value={draft.title}
            />
          </Field>
        </div>

        <div className="space-y-4">
          {draft.items.map((item, index) => (
            <div className="grid gap-4 rounded-[1.75rem] border border-line bg-black/15 p-4 xl:grid-cols-[1fr_1.5fr_auto]" key={`${item.question}-${index}`}>
              <Field label="السؤال">
                <Input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index ? { ...value, question: event.target.value } : value,
                      ),
                    }))
                  }
                  value={item.question}
                />
              </Field>
              <Field label="الجواب">
                <Textarea
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      items: current.items.map((value, itemIndex) =>
                        itemIndex === index ? { ...value, answer: event.target.value } : value,
                      ),
                    }))
                  }
                  rows={4}
                  value={item.answer}
                />
              </Field>
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    items:
                      current.items.length > 1
                        ? current.items.filter((_, itemIndex) => itemIndex !== index)
                        : [{ question: "", answer: "" }],
                  }))
                }
                type="button"
              >
                <Trash2 className="size-4" />
                حذف
              </button>
            </div>
          ))}
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                items: [...current.items, { question: "", answer: "" }],
              }))
            }
            type="button"
          >
            <Plus className="size-4" />
            إضافة سؤال
          </button>
        </div>
        <SaveBar isPending={isPending} onSave={save} status={status} />
      </div>
    </EditorCard>
  );
}

function ContactEditor({
  section,
  onSave,
}: {
  section: DashboardSections["contact"];
  onSave: (value: DashboardSections["contact"]) => Promise<DashboardSections["contact"]>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="إدارة تواصل معنا">
      <div className="grid gap-5 xl:grid-cols-2">
        <Field label="Eyebrow">
          <Input
            onChange={(event) => setDraft((current) => ({ ...current, eyebrow: event.target.value }))}
            value={draft.eyebrow}
          />
        </Field>
        <Field label="العنوان">
          <Input
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            value={draft.title}
          />
        </Field>
        <Field label="وصف القسم">
          <Textarea
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            rows={5}
            value={draft.description}
          />
        </Field>
        <div className="grid gap-4">
          <Field label="زر الاتصال">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, primaryButtonLabel: event.target.value }))}
              value={draft.primaryButtonLabel}
            />
          </Field>
          <Field label="زر البريد">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, secondaryButtonLabel: event.target.value }))}
              value={draft.secondaryButtonLabel}
            />
          </Field>
        </div>
        <Field label="رقم الهاتف">
          <Input
            onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))}
            value={draft.phone}
          />
        </Field>
        <Field label="البريد الإلكتروني">
          <Input
            onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))}
            value={draft.email}
          />
        </Field>
        <Field label="العنوان">
          <Textarea
            onChange={(event) => setDraft((current) => ({ ...current, address: event.target.value }))}
            rows={4}
            value={draft.address}
          />
        </Field>
        <div className="grid gap-4">
          <Field label="أيام العمل">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, workingDays: event.target.value }))}
              value={draft.workingDays}
            />
          </Field>
          <Field label="ساعات العمل">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, workingHours: event.target.value }))}
              value={draft.workingHours}
            />
          </Field>
        </div>
        <Field label="تسمية الهاتف">
          <Input
            onChange={(event) => setDraft((current) => ({ ...current, phoneLabel: event.target.value }))}
            value={draft.phoneLabel}
          />
        </Field>
        <Field label="تسمية البريد">
          <Input
            onChange={(event) => setDraft((current) => ({ ...current, emailLabel: event.target.value }))}
            value={draft.emailLabel}
          />
        </Field>
        <Field label="تسمية العنوان">
          <Input
            onChange={(event) => setDraft((current) => ({ ...current, addressLabel: event.target.value }))}
            value={draft.addressLabel}
          />
        </Field>
        <Field label="تسمية أوقات العمل">
          <Input
            onChange={(event) => setDraft((current) => ({ ...current, workingHoursLabel: event.target.value }))}
            value={draft.workingHoursLabel}
          />
        </Field>
      </div>
      <SaveBar isPending={isPending} onSave={save} status={status} />
    </EditorCard>
  );
}

function FooterEditor({
  section,
  media,
  onSave,
  onUploadMedia,
  onDeleteMedia,
}: {
  section: DashboardSections["footer"];
  media: MediaAsset[];
  onSave: (value: DashboardSections["footer"]) => Promise<DashboardSections["footer"]>;
  onUploadMedia: (file: File, altText?: string) => Promise<MediaAsset | null>;
  onDeleteMedia: (id: string) => Promise<void>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="إدارة الفوتر">
      <div className="space-y-5">
        <MediaPickerField
          label="أيقونة الفوتر"
          media={media}
          onChange={(value) => setDraft((current) => ({ ...current, iconPath: value }))}
          onDeleteMedia={onDeleteMedia}
          onUpload={onUploadMedia}
          value={draft.iconPath}
        />
        <Field label="الوصف">
          <Textarea
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            rows={4}
            value={draft.description}
          />
        </Field>
        <EditorCard title="خدمات الفوتر">
          <div className="space-y-3">
            {draft.services.map((service, index) => (
              <div className="grid gap-3 md:grid-cols-[1fr_auto]" key={`footer-service-${index}`}>
                <Input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      services: current.services.map((value, itemIndex) =>
                        itemIndex === index ? event.target.value : value,
                      ),
                    }))
                  }
                  value={service}
                />
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      services:
                        current.services.length > 1
                          ? current.services.filter((_, itemIndex) => itemIndex !== index)
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
            <button
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
              onClick={() => setDraft((current) => ({ ...current, services: [...current.services, ""] }))}
              type="button"
            >
              <Plus className="size-4" />
              إضافة خدمة
            </button>
          </div>
        </EditorCard>
        <SaveBar isPending={isPending} onSave={save} status={status} />
      </div>
    </EditorCard>
  );
}

function GeneralSettingsEditor({
  section,
  media,
  onSave,
  onUploadMedia,
  onDeleteMedia,
}: {
  section: DashboardSections["generalSettings"];
  media: MediaAsset[];
  onSave: (value: DashboardSections["generalSettings"]) => Promise<DashboardSections["generalSettings"]>;
  onUploadMedia: (file: File, altText?: string) => Promise<MediaAsset | null>;
  onDeleteMedia: (id: string) => Promise<void>;
}) {
  const { draft, setDraft, status, isPending, save } = useSectionDraft(section, onSave);

  return (
    <EditorCard title="الإعدادات العامة">
      <div className="space-y-5">
        <div className="grid gap-4 xl:grid-cols-2">
          <Field label="اسم الموقع">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              value={draft.name}
            />
          </Field>
          <Field label="الاسم المختصر">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, shortName: event.target.value }))}
              value={draft.shortName}
            />
          </Field>
          <Field label="الاسم الإنجليزي">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, englishName: event.target.value }))}
              value={draft.englishName}
            />
          </Field>
          <Field label="زر طلب عرض السعر">
            <Input
              onChange={(event) => setDraft((current) => ({ ...current, quoteButtonLabel: event.target.value }))}
              value={draft.quoteButtonLabel}
            />
          </Field>
        </div>
        <Field label="وصف الموقع">
          <Textarea
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            rows={4}
            value={draft.description}
          />
        </Field>
        <Field label="رابط واتس اب">
          <Input
            dir="ltr"
            onChange={(event) => setDraft((current) => ({ ...current, whatsappUrl: event.target.value }))}
            placeholder="https://wa.me/9665XXXXXXXX?text=..."
            value={draft.whatsappUrl ?? ""}
          />
        </Field>
        <div className="grid gap-4 xl:grid-cols-2">
          <MediaPickerField
            label="لوغو الموقع"
            media={media}
            onChange={(value) => setDraft((current) => ({ ...current, logoPath: value }))}
            onDeleteMedia={onDeleteMedia}
            onUpload={onUploadMedia}
            value={draft.logoPath}
          />
          <MediaPickerField
            label="Favicon"
            media={media}
            onChange={(value) => setDraft((current) => ({ ...current, faviconPath: value }))}
            onDeleteMedia={onDeleteMedia}
            onUpload={onUploadMedia}
            value={draft.faviconPath}
          />
        </div>
        <EditorCard title="وسائل التواصل الاجتماعي">
          <div className="space-y-4">
            {draft.socialLinks.map((item, index) => (
              <div className="grid gap-4 rounded-[1.75rem] border border-line bg-black/15 p-4 xl:grid-cols-[0.8fr_1.6fr_auto]" key={`${item.platform}-${index}`}>
                <Field label="المنصة">
                  <Select
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        socialLinks: current.socialLinks.map((value, itemIndex) =>
                          itemIndex === index
                            ? {
                                ...value,
                                platform: event.target.value,
                                label: getSocialPlatformLabel(event.target.value),
                              }
                            : value,
                        ),
                      }))
                    }
                    value={item.platform}
                  >
                    <option value="">اختر منصة</option>
                    {socialPlatformOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="الرابط">
                  <Input
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        socialLinks: current.socialLinks.map((value, itemIndex) =>
                          itemIndex === index ? { ...value, href: event.target.value } : value,
                        ),
                      }))
                    }
                    value={item.href}
                  />
                </Field>
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 self-end rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      socialLinks:
                        current.socialLinks.length > 1
                          ? current.socialLinks.filter((_, itemIndex) => itemIndex !== index)
                          : [{ ...defaultSocialLink }],
                    }))
                  }
                  type="button"
                >
                  <Trash2 className="size-4" />
                  حذف
                </button>
              </div>
            ))}
            <button
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  socialLinks: [...current.socialLinks, { ...defaultSocialLink }],
                }))
              }
              type="button"
            >
              <Plus className="size-4" />
              إضافة وسيلة
            </button>
          </div>
        </EditorCard>
        <SaveBar isPending={isPending} onSave={save} status={status} />
      </div>
    </EditorCard>
  );
}

function ProjectsEditor({
  projects,
  media,
  onSaveProject,
  onDeleteProject,
  onSaveFeatured,
  onUploadMedia,
  onDeleteMedia,
}: {
  projects: DashboardProject[];
  media: MediaAsset[];
  onSaveProject: (
    project: Omit<DashboardProject, "showOnHome"> & { showOnHome: boolean },
  ) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
  onSaveFeatured: (assignments: Array<{ slot: number; projectId: string | null }>) => Promise<void>;
  onUploadMedia: (file: File, altText?: string) => Promise<MediaAsset | null>;
  onDeleteMedia: (id: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<DashboardProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredAssignments, setFeaturedAssignments] = useState<
    Array<{ slot: number; projectId: string | null }>
  >([
    { slot: 1, projectId: projects.find((project) => project.homeOrder === 1)?.id ?? null },
    { slot: 2, projectId: projects.find((project) => project.homeOrder === 2)?.id ?? null },
    { slot: 3, projectId: projects.find((project) => project.homeOrder === 3)?.id ?? null },
    { slot: 4, projectId: projects.find((project) => project.homeOrder === 4)?.id ?? null },
  ]);

  return (
    <>
      <EditorCard title="إدارة المشاريع">
        <div className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-primary bg-primary px-5 text-sm font-semibold text-[#53211c] transition hover:bg-primary-strong"
              onClick={() => {
                setEditingProject(null);
                setIsModalOpen(true);
                setFeaturedAssignments([
                  { slot: 1, projectId: projects.find((project) => project.homeOrder === 1)?.id ?? null },
                  { slot: 2, projectId: projects.find((project) => project.homeOrder === 2)?.id ?? null },
                  { slot: 3, projectId: projects.find((project) => project.homeOrder === 3)?.id ?? null },
                  { slot: 4, projectId: projects.find((project) => project.homeOrder === 4)?.id ?? null },
                ]);
              }}
              type="button"
            >
              <Plus className="size-4" />
              إضافة مشروع
            </button>
          </div>

          <EditorCard title="اختيار 4 مشاريع الرئيسية">
            <div className="grid gap-4 xl:grid-cols-4">
              {featuredAssignments.map((assignment) => (
                <Field key={`slot-${assignment.slot}`} label={`الخانة ${assignment.slot}`}>
                  <Select
                    onChange={(event) =>
                      setFeaturedAssignments((current) =>
                        current.map((item) =>
                          item.slot === assignment.slot
                            ? { ...item, projectId: event.target.value || null }
                            : item,
                        ),
                      )
                    }
                    value={assignment.projectId ?? ""}
                  >
                    <option value="">بدون مشروع</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </Select>
                </Field>
              ))}
            </div>
            <SaveBar
              isPending={isPending}
              onSave={() =>
                startTransition(async () => {
                  try {
                    setStatus("جارٍ حفظ ترتيب مشاريع الرئيسية...");
                    await onSaveFeatured(featuredAssignments);
                    setStatus("تم حفظ ترتيب مشاريع الرئيسية.");
                  } catch (error) {
                    setStatus(getErrorMessage(error));
                  }
                })
              }
              status={status}
            />
          </EditorCard>

          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <div className="rounded-[1.75rem] border border-line bg-black/15 p-4" key={project.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-text">{project.title}</h3>
                    <p className="text-sm text-text-muted">{project.categoryLabel}</p>
                    <p className="text-sm text-text-muted">{project.location}</p>
                    <p className="text-xs text-primary">
                      {project.showOnHome ? `ظاهر في الرئيسية - الخانة ${project.homeOrder}` : "غير ظاهر في الرئيسية"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
                      onClick={() => {
                        setEditingProject(project);
                        setIsModalOpen(true);
                        setFeaturedAssignments([
                          { slot: 1, projectId: projects.find((item) => item.homeOrder === 1)?.id ?? null },
                          { slot: 2, projectId: projects.find((item) => item.homeOrder === 2)?.id ?? null },
                          { slot: 3, projectId: projects.find((item) => item.homeOrder === 3)?.id ?? null },
                          { slot: 4, projectId: projects.find((item) => item.homeOrder === 4)?.id ?? null },
                        ]);
                      }}
                      type="button"
                    >
                      تعديل
                    </button>
                    <button
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-semibold text-red-200 transition"
                      onClick={async () => {
                        await onDeleteProject(project.id);
                      }}
                      type="button"
                    >
                      <Trash2 className="size-4" />
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EditorCard>

      {isModalOpen ? (
        <ProjectModal
          initialProject={editingProject}
          key={editingProject?.id ?? "new-project"}
          media={media}
          onClose={() => setIsModalOpen(false)}
          onDeleteMedia={onDeleteMedia}
          onSave={onSaveProject}
          onUploadMedia={onUploadMedia}
        />
      ) : null}
    </>
  );
}

function MediaEditor({
  media,
  onUploadMedia,
  onDeleteMedia,
}: {
  media: MediaAsset[];
  onUploadMedia: (file: File, altText?: string) => Promise<MediaAsset | null>;
  onDeleteMedia: (id: string) => Promise<void>;
}) {
  const [isUploading, startTransition] = useTransition();
  const [copyState, setCopyState] = useState<string | null>(null);
  const [altText, setAltText] = useState("");

  async function handleUpload(file: File) {
    startTransition(async () => {
      await onUploadMedia(file, altText);
      setAltText("");
    });
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopyState(url);
    window.setTimeout(() => setCopyState(null), 1200);
  }

  return (
    <EditorCard title="مكتبة الوسائط">
      <div className="space-y-5">
        <div className="grid gap-3 rounded-[1.5rem] border border-line bg-black/15 p-4 md:grid-cols-[1fr_auto]">
          <Input
            onChange={(event) => setAltText(event.target.value)}
            placeholder="نص بديل اختياري"
            value={altText}
          />
          <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-primary bg-primary px-5 text-sm font-semibold text-[#53211c] transition hover:bg-primary-strong">
            <input
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];

                if (!file) {
                  return;
                }

                await handleUpload(file);
                event.target.value = "";
              }}
              type="file"
            />
            <Plus className="size-4" />
            {isUploading ? "جارٍ الرفع..." : "رفع صورة"}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {media.map((asset) => (
            <div className="rounded-[1.5rem] border border-line bg-black/15 p-3" key={asset.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-line/70 bg-black/25">
                <Image
                  alt={asset.altText || asset.originalName}
                  className="object-cover"
                  fill
                  sizes="33vw"
                  src={asset.url}
                />
              </div>
              <div className="mt-3 space-y-2">
                <p className="line-clamp-1 text-sm font-semibold text-text">{asset.originalName}</p>
                <p className="line-clamp-2 text-xs text-text-muted">{asset.url}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-line bg-white/5 px-3 text-sm font-semibold text-text transition hover:text-primary"
                    onClick={() => copyUrl(asset.url)}
                    type="button"
                  >
                    <Copy className="size-4" />
                    {copyState === asset.url ? "تم النسخ" : "نسخ الرابط"}
                  </button>
                  <button
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-3 text-sm font-semibold text-red-200"
                    onClick={() => onDeleteMedia(asset.id)}
                    type="button"
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorCard>
  );
}

function AdminsEditor({
  admins,
  currentAdmin,
  onCreateAdmin,
  onUpdateAdmin,
}: {
  admins: AdminAccount[];
  currentAdmin: AdminAccount;
  onCreateAdmin: (value: { email: string; name: string; password: string }) => Promise<void>;
  onUpdateAdmin: (
    id: string,
    value: { email: string; name: string; password?: string },
  ) => Promise<void>;
}) {
  const current = admins.find((admin) => admin.id === currentAdmin.id) ?? currentAdmin;
  const [currentDraft, setCurrentDraft] = useState({
    email: current.email,
    name: current.name,
    password: "",
  });
  const [newDraft, setNewDraft] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function saveCurrentAdmin() {
    startTransition(async () => {
      try {
        setStatus("جارٍ حفظ بيانات الأدمن...");
        await onUpdateAdmin(current.id, {
          email: currentDraft.email,
          name: currentDraft.name,
          password: currentDraft.password || undefined,
        });
        setCurrentDraft((draft) => ({ ...draft, password: "" }));
        setStatus("تم حفظ بيانات الأدمن.");
      } catch (error) {
        setStatus(getErrorMessage(error));
      }
    });
  }

  function createAdmin() {
    startTransition(async () => {
      try {
        setStatus("جارٍ إضافة الأدمن...");
        await onCreateAdmin(newDraft);
        setNewDraft({ email: "", name: "", password: "" });
        setStatus("تمت إضافة الأدمن.");
      } catch (error) {
        setStatus(getErrorMessage(error));
      }
    });
  }

  return (
    <EditorCard title="إدارة الأدمن">
      <div className="space-y-5">
        <div className="grid gap-4 xl:grid-cols-3">
          <Field label="البريد الحالي">
            <Input
              onChange={(event) => setCurrentDraft((draft) => ({ ...draft, email: event.target.value }))}
              type="email"
              value={currentDraft.email}
            />
          </Field>
          <Field label="الاسم">
            <Input
              onChange={(event) => setCurrentDraft((draft) => ({ ...draft, name: event.target.value }))}
              value={currentDraft.name}
            />
          </Field>
          <Field label="كلمة مرور جديدة">
            <Input
              onChange={(event) => setCurrentDraft((draft) => ({ ...draft, password: event.target.value }))}
              placeholder="اتركها فارغة بدون تغيير"
              type="password"
              value={currentDraft.password}
            />
          </Field>
        </div>
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-primary bg-primary px-5 text-sm font-semibold text-[#53211c] transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isPending}
          onClick={saveCurrentAdmin}
          type="button"
        >
          <Save className="size-4" />
          حفظ بيانات الأدمن الحالي
        </button>

        <EditorCard title="إضافة أدمن جديد">
          <div className="grid gap-4 xl:grid-cols-3">
            <Field label="البريد الإلكتروني">
              <Input
                onChange={(event) => setNewDraft((draft) => ({ ...draft, email: event.target.value }))}
                type="email"
                value={newDraft.email}
              />
            </Field>
            <Field label="الاسم">
              <Input
                onChange={(event) => setNewDraft((draft) => ({ ...draft, name: event.target.value }))}
                value={newDraft.name}
              />
            </Field>
            <Field label="كلمة المرور">
              <Input
                onChange={(event) => setNewDraft((draft) => ({ ...draft, password: event.target.value }))}
                type="password"
                value={newDraft.password}
              />
            </Field>
          </div>
          <button
            className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-primary bg-primary px-5 text-sm font-semibold text-[#53211c] transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isPending}
            onClick={createAdmin}
            type="button"
          >
            <Plus className="size-4" />
            إضافة أدمن
          </button>
        </EditorCard>

        <div className="rounded-[1.5rem] border border-line bg-black/15 p-4">
          <h3 className="mb-4 font-display text-xl font-bold text-text">الأدمن المسجلون</h3>
          <div className="space-y-3">
            {admins.map((admin) => (
              <div className="grid gap-2 rounded-2xl border border-line/70 p-4 md:grid-cols-[1fr_1fr_auto]" key={admin.id}>
                <p className="text-sm font-semibold text-text">{admin.name || "Admin"}</p>
                <p className="text-sm text-text-muted">{admin.email}</p>
                <p className="text-xs text-primary">{admin.id === currentAdmin.id ? "الحساب الحالي" : "أدمن"}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-text-muted">{status ?? "يمكنك تعديل بيانات حسابك أو إضافة أدمن جديد."}</p>
      </div>
    </EditorCard>
  );
}

export function DashboardShell({ activeTab, currentAdmin, initialSnapshot }: DashboardShellProps) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);

  const activeTabMeta = useMemo(
    () => dashboardTabs.find((tab) => tab.key === activeTab) ?? dashboardTabs[0],
    [activeTab],
  );

  function handleDashboardClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const button = target.closest("button");

    if (!button || !event.currentTarget.contains(button) || button.disabled) {
      return;
    }

    if (confirmedDeleteButtons.has(button)) {
      confirmedDeleteButtons.delete(button);
      return;
    }

    if (!button.textContent?.includes("حذف")) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    void confirmDelete().then((confirmed) => {
      if (!confirmed) {
        return;
      }

      confirmedDeleteButtons.add(button);
      button.click();
    });
  }

  async function saveSection<K extends DashboardSectionKey>(
    key: K,
    value: DashboardSections[K],
  ) {
    const data = await requestJson<DashboardSections[K]>(`/api/admin/sections/${key}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    setSnapshot((current) => ({
      ...current,
      sections: {
        ...current.sections,
        [key]: data,
      },
    }));

    showSaveToast();

    return data;
  }

  async function uploadMedia(file: File, altText = "") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", altText);

    const asset = await requestJson<MediaAsset | null>("/api/admin/media", {
      method: "POST",
      body: formData,
    });

    if (asset) {
      setSnapshot((current) => ({
        ...current,
        media: [asset, ...current.media],
      }));
    }

    return asset;
  }

  async function deleteMedia(id: string) {
    await requestJson("/api/admin/media/" + id, {
      method: "DELETE",
    });

    setSnapshot((current) => ({
      ...current,
      media: current.media.filter((item) => item.id !== id),
    }));
  }

  async function saveProject(project: Omit<DashboardProject, "showOnHome"> & { showOnHome: boolean }) {
    const url = project.id ? `/api/admin/projects/${project.id}` : "/api/admin/projects";
    const method = project.id ? "PUT" : "POST";
    const saved = await requestJson<DashboardProject | null>(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!saved) {
      return;
    }

    setSnapshot((current) => {
      const others = current.projects.filter((item) => item.id !== saved.id);
      return {
        ...current,
        projects: [saved, ...others].sort((left, right) => left.title.localeCompare(right.title)),
      };
    });

    showSaveToast();
  }

  async function deleteProjectById(id: string) {
    await requestJson(`/api/admin/projects/${id}`, {
      method: "DELETE",
    });

    setSnapshot((current) => ({
      ...current,
      projects: current.projects.filter((item) => item.id !== id),
    }));
  }

  async function saveFeaturedProjects(assignments: Array<{ slot: number; projectId: string | null }>) {
    const projects = await requestJson<DashboardProject[]>("/api/admin/projects/featured", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignments),
    });

    setSnapshot((current) => ({
      ...current,
      projects,
    }));

    showSaveToast();
  }

  async function createAdmin(value: { email: string; name: string; password: string }) {
    const admin = await requestJson<AdminAccount | null>("/api/admin/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    if (!admin) {
      return;
    }

    setSnapshot((current) => ({
      ...current,
      admins: [...current.admins, admin],
    }));

    showSaveToast();
  }

  async function updateAdmin(
    id: string,
    value: { email: string; name: string; password?: string },
  ) {
    const admin = await requestJson<AdminAccount | null>(`/api/admin/admins/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    if (!admin) {
      return;
    }

    setSnapshot((current) => ({
      ...current,
      admins: current.admins.map((item) => (item.id === admin.id ? admin : item)),
    }));

    showSaveToast();
  }

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });
    window.location.href = "/admin-rq";
  }

  return (
    <div className="app-container py-8" onClickCapture={handleDashboardClickCapture}>
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <aside className="panel h-fit px-4 py-4 lg:sticky lg:top-6">
          <div className="border-b border-line/70 pb-4">
            <p className="font-accent text-xs uppercase tracking-[0.35em] text-primary">Admin</p>
            <h1 className="mt-2 font-display text-2xl font-bold text-text">Rawnaq Dashboard</h1>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto lg:flex-col">
            {dashboardTabs.map((tab) => (
              <Link
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  tab.key === activeTab
                    ? "bg-primary text-[#53211c]"
                    : "bg-white/5 text-text-muted hover:text-text"
                }`}
                href={`/dashboard/${tab.key}`}
                key={tab.key}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="space-y-5">
          <div className="panel px-5 py-5 md:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-accent text-xs uppercase tracking-[0.35em] text-primary">Active tab</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-text">{activeTabMeta.label}</h2>
              </div>
              <button
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:text-primary"
                onClick={logout}
                type="button"
              >
                <LogOut className="size-4" />
                خروج
              </button>
            </div>
          </div>

          {activeTab === "hero" ? (
            <HeroEditor
              media={snapshot.media}
              onDeleteMedia={deleteMedia}
              onSave={(value) => saveSection("hero", value)}
              onUploadMedia={uploadMedia}
              projects={snapshot.projects}
              section={snapshot.sections.hero}
            />
          ) : null}

          {activeTab === "about" ? (
            <AboutEditor
              media={snapshot.media}
              onDeleteMedia={deleteMedia}
              onSave={(value) => saveSection("about", value)}
              onUploadMedia={uploadMedia}
              section={snapshot.sections.about}
            />
          ) : null}

          {activeTab === "services" ? (
            <ServicesEditor
              media={snapshot.media}
              onDeleteMedia={deleteMedia}
              onSave={(value) => saveSection("services", value)}
              onUploadMedia={uploadMedia}
              section={snapshot.sections.services}
            />
          ) : null}

          {activeTab === "workflow" ? (
            <WorkflowEditor
              onSave={(value) => saveSection("workflow", value)}
              section={snapshot.sections.workflow}
            />
          ) : null}

          {activeTab === "why-rawnaq" ? (
            <WhyEditor
              onSave={(value) => saveSection("whyRawnaq", value)}
              section={snapshot.sections.whyRawnaq}
            />
          ) : null}

          {activeTab === "values" ? (
            <ValuesEditor
              onSave={(value) => saveSection("values", value)}
              section={snapshot.sections.values}
            />
          ) : null}

          {activeTab === "faq" ? (
            <FaqEditor
              onSave={(value) => saveSection("faq", value)}
              section={snapshot.sections.faq}
            />
          ) : null}

          {activeTab === "contact" ? (
            <ContactEditor
              onSave={(value) => saveSection("contact", value)}
              section={snapshot.sections.contact}
            />
          ) : null}

          {activeTab === "footer" ? (
            <FooterEditor
              media={snapshot.media}
              onDeleteMedia={deleteMedia}
              onSave={(value) => saveSection("footer", value)}
              onUploadMedia={uploadMedia}
              section={snapshot.sections.footer}
            />
          ) : null}

          {activeTab === "general-settings" ? (
            <GeneralSettingsEditor
              media={snapshot.media}
              onDeleteMedia={deleteMedia}
              onSave={(value) => saveSection("generalSettings", value)}
              onUploadMedia={uploadMedia}
              section={snapshot.sections.generalSettings}
            />
          ) : null}

          {activeTab === "admins" ? (
            <AdminsEditor
              admins={snapshot.admins}
              currentAdmin={currentAdmin}
              onCreateAdmin={createAdmin}
              onUpdateAdmin={updateAdmin}
            />
          ) : null}

          {activeTab === "projects" ? (
            <ProjectsEditor
              key={snapshot.projects.map((project) => `${project.id}:${project.homeOrder ?? 0}`).join("|")}
              media={snapshot.media}
              onDeleteMedia={deleteMedia}
              onDeleteProject={deleteProjectById}
              onSaveFeatured={saveFeaturedProjects}
              onSaveProject={saveProject}
              onUploadMedia={uploadMedia}
              projects={snapshot.projects}
            />
          ) : null}

          {activeTab === "media" ? (
            <MediaEditor
              media={snapshot.media}
              onDeleteMedia={deleteMedia}
              onUploadMedia={uploadMedia}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
