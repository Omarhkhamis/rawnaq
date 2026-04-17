import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-space pt-40">
      <div className="app-container">
        <div className="architect-frame panel mx-auto max-w-3xl px-8 py-12 text-center">
          <p className="font-accent text-sm uppercase tracking-[0.35em] text-primary">404</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-text md:text-6xl">
            الصفحة المطلوبة غير موجودة
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-text-muted">
            قد يكون الرابط غير صحيح أو تم نقل الصفحة. يمكنك العودة إلى الرئيسية أو استعراض صفحة المشاريع.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/">العودة للرئيسية</Button>
            <Button href="/projects" variant="outline">
              استعراض المشاريع
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
