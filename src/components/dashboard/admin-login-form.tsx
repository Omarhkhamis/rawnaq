"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, LogIn } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    startTransition(async () => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus(data?.error ?? "تعذر تسجيل الدخول.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    });
  }

  return (
    <main className="app-container flex min-h-screen items-center justify-center py-10">
      <form className="panel w-full max-w-md px-6 py-6 md:px-8" onSubmit={submit}>
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
            <LockKeyhole className="size-5" />
          </span>
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-primary">Admin</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-text">تسجيل الدخول</h1>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-text">البريد الإلكتروني</span>
            <input
              autoComplete="email"
              className="w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-text">كلمة المرور</span>
            <input
              autoComplete="current-password"
              className="w-full rounded-2xl border border-line bg-black/20 px-4 py-3 text-sm text-text outline-none transition focus:border-primary/60"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </label>
        </div>

        {status ? <p className="mt-4 text-sm text-red-200">{status}</p> : null}

        <button
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-primary bg-primary px-5 text-sm font-semibold text-[#53211c] transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isPending}
          type="submit"
        >
          <LogIn className="size-4" />
          {isPending ? "جارٍ التحقق..." : "دخول"}
        </button>
      </form>
    </main>
  );
}
