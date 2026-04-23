"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Copy, ImagePlus, Trash2, Upload, X } from "lucide-react";

import type { MediaAsset } from "@/lib/content/types";

type MediaPickerFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  media: MediaAsset[];
  onUpload: (file: File, altText?: string) => Promise<MediaAsset | null>;
  onDeleteMedia: (id: string) => Promise<void>;
  description?: string;
};

export function MediaPickerField({
  label,
  value,
  onChange,
  media,
  onUpload,
  onDeleteMedia,
  description,
}: MediaPickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const uploadRef = useRef<HTMLInputElement | null>(null);

  async function handleUpload(file: File) {
    setIsUploading(true);
    try {
      const asset = await onUpload(file, altText);

      if (asset) {
        onChange(asset.url);
        setAltText("");
      }
    } finally {
      setIsUploading(false);
    }
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    window.setTimeout(() => setCopiedUrl(null), 1200);
  }

  return (
    <>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-text">{label}</span>
        {description ? <p className="text-xs leading-6 text-text-muted">{description}</p> : null}
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            className="w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60"
            onChange={(event) => onChange(event.target.value)}
            placeholder="/uploads/example.jpg أو رابط خارجي"
            value={value}
          />
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-white/5 px-4 text-sm font-semibold text-text transition hover:border-primary/40 hover:text-primary"
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <ImagePlus className="size-4" />
            المعرض
          </button>
        </div>
      </label>

      {isOpen ? (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10">
          <div className="panel w-full max-w-5xl px-5 py-5 md:px-6">
            <div className="flex items-center justify-between gap-4 border-b border-line/70 pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-text">اختيار وسائط</h3>
                <p className="mt-1 text-sm text-text-muted">يمكنك اختيار ملف مرفوع أو رفع ملف جديد أو نسخ الرابط.</p>
              </div>
              <button
                className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white/5 text-text-muted transition hover:text-text"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 grid gap-3 rounded-[1.5rem] border border-line/60 bg-black/15 p-4 md:grid-cols-[1fr_auto]">
              <input
                className="rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60"
                onChange={(event) => setAltText(event.target.value)}
                placeholder="نص بديل اختياري للملف الجديد"
                value={altText}
              />
              <div className="flex flex-col gap-2 sm:flex-row">
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
                  ref={uploadRef}
                  type="file"
                />
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-primary bg-primary px-4 text-sm font-semibold text-[#53211c] transition hover:bg-primary-strong"
                  disabled={isUploading}
                  onClick={() => uploadRef.current?.click()}
                  type="button"
                >
                  {isUploading ? <Upload className="size-4 animate-pulse" /> : <Upload className="size-4" />}
                  {isUploading ? "جارٍ الرفع..." : "رفع ملف جديد"}
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {media.map((asset) => (
                <div className="rounded-[1.5rem] border border-line bg-black/15 p-3" key={asset.id}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-line/60 bg-black/25">
                    {asset.mimeType.startsWith("image/") ? (
                      <Image alt={asset.altText || asset.originalName} className="object-cover" fill sizes="33vw" src={asset.url} />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-text-muted">
                        {asset.originalName}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="line-clamp-1 text-sm font-semibold text-text">{asset.originalName}</p>
                    <p className="line-clamp-1 text-xs text-text-muted">{asset.url}</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <button
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-primary/12 px-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/18"
                        onClick={() => {
                          onChange(asset.url);
                          setIsOpen(false);
                        }}
                        type="button"
                      >
                        اختيار
                      </button>
                      <button
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-line bg-white/5 px-3 text-sm font-semibold text-text transition hover:text-primary"
                        onClick={() => copyUrl(asset.url)}
                        type="button"
                      >
                        <Copy className="size-4" />
                        {copiedUrl === asset.url ? "تم" : "نسخ"}
                      </button>
                      <button
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-3 text-sm font-semibold text-red-200 transition hover:border-red-300/60"
                        onClick={async () => {
                          await onDeleteMedia(asset.id);
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
        </div>
      ) : null}
    </>
  );
}

