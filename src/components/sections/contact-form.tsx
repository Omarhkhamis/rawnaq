"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const initialState: ContactFormState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

function ContactInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60"
    />
  );
}

function ContactTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="min-h-36 w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60"
    />
  );
}

export function ContactForm({ framed = true }: { framed?: boolean }) {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField(field: keyof ContactFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    startTransition(async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const issue = data?.issues?.[0]?.message;
        setStatus({ type: "error", text: issue ?? data?.error ?? "تعذر إرسال الرسالة." });
        return;
      }

      setForm(initialState);
      setStatus({ type: "success", text: "تم إرسال رسالتك بنجاح." });
    });
  }

  const formClassName = framed
    ? "panel px-5 py-5 md:px-6"
    : "rounded-[1.5rem] border border-line/70 bg-black/15 px-5 py-5 md:px-6";

  return (
    <form className={formClassName} onSubmit={submit}>
      <div className="mb-5">
        <h3 className="font-display text-2xl font-bold text-text">اتصل بنا</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-text">الاسم</span>
          <ContactInput
            autoComplete="name"
            onChange={(event) => updateField("name", event.target.value)}
            required
            value={form.name}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-text">رقم الهاتف</span>
          <ContactInput
            autoComplete="tel"
            onChange={(event) => updateField("phone", event.target.value)}
            required
            type="tel"
            value={form.phone}
          />
        </label>
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-text">البريد الإلكتروني</span>
          <ContactInput
            autoComplete="email"
            onChange={(event) => updateField("email", event.target.value)}
            type="email"
            value={form.email}
          />
        </label>
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-text">نص الرسالة</span>
          <ContactTextarea
            onChange={(event) => updateField("message", event.target.value)}
            required
            value={form.message}
          />
        </label>
      </div>

      {status ? (
        <p className={`mt-4 text-sm ${status.type === "success" ? "text-success" : "text-red-200"}`}>
          {status.text}
        </p>
      ) : null}

      <button
        className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-primary bg-primary px-5 text-sm font-semibold text-[#53211c] transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isPending}
        type="submit"
      >
        <Send className="size-4" />
        {isPending ? "جارٍ الإرسال..." : "إرسال الرسالة"}
      </button>
    </form>
  );
}
