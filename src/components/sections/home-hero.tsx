import Image from "next/image";
import { ArrowUpLeft, BadgeCheck, MapPin } from "lucide-react";

import { heroHighlights, homeProjectHero, homeStats } from "@/data/site";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/counter";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { Reveal } from "@/components/ui/reveal";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
      <div className="absolute inset-0 -z-20">
        <Image
          alt="برج معماري حديث بواجهة زجاجية في أجواء مسائية"
          className="object-cover object-center opacity-18"
          fill
          priority
          sizes="100vw"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA73YROwfkoBCB_nF4pNnHldL_wyQxh_ba8zx60aRCQAR-u8D-fRtsqIMnObd_mMkSxiys9YtIqii7jV5-QtXnlx8M3SBkR9Ee8o5OvZaXjjVWvRprdrS09ivqXuf5BsuFCOQ34yOtW0b8y8VCN74il8d9ZOusDWgpe9lLcn0hlncboEw1-eBkr9vEIt01yKqWQAPJtQa4FlFts-THMnf-DdUZybKPo_Cz3aecYIiD5i97bP6ZTDBlrfZSazk2aMpROomzQFlHEW9A"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,19,0.38),rgba(20,19,19,0.84)_55%,rgba(20,19,19,1))]" />
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(255,180,171,0.16),transparent_58%)]" />
      <div className="absolute left-0 top-24 -z-10 hidden h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(176,203,209,0.14),transparent_70%)] blur-3xl md:block" />

      <div className="app-container">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-6">
              <Reveal>
                <h1 className="text-balance font-display text-5xl font-bold leading-[1.15] tracking-tight text-text md:text-7xl xl:text-[5.4rem]">
                  رونق.. تجسيد للذوق الرفيع في كل ما حولك
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="max-w-2xl text-lg leading-8 text-text-muted md:text-xl">
                  شركة مقاولات متخصصة في بناء تجارب معمارية متكاملة تبدأ من الفكرة، وتعبر بالتصميم والتنفيذ، وتنتهي بتسليم يليق بطموح العميل.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
              <div className="flex flex-wrap gap-3">
                {heroHighlights.map((item) => (
                  <span
                    className="rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm text-text-muted"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="/#contact" size="lg">
                  ابدأ مشروعك الآن
                  <ArrowUpLeft className="size-4" />
                </Button>
                <Button href="/projects" size="lg" variant="outline">
                  استكشف أعمالنا
                </Button>
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {homeStats.map((stat, index) => (
                <Reveal className="h-full" delay={0.3 + index * 0.07} key={stat.label}>
                  <div className="panel h-full px-5 py-6">
                    <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">
                      <AnimatedCounter suffix={stat.suffix} value={stat.value} />
                    </div>
                    <p className="font-display text-lg font-bold text-text">{stat.label}</p>
                    <p className="mt-2 text-sm leading-7 text-text-muted">{stat.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="relative" delay={0.18}>
            <ParallaxMedia
              className="architect-frame panel min-h-[34rem] md:min-h-[42rem]"
              innerClassName="relative min-h-[34rem] md:min-h-[42rem]"
            >
              <Image
                alt={homeProjectHero.heroAlt}
                className="object-cover object-center"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                src={homeProjectHero.cardImage}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,12,11,0.18),rgba(13,12,11,0.08)_28%,rgba(13,12,11,0.42)_72%,rgba(13,12,11,0.64))]" />
            </ParallaxMedia>

            <div className="absolute inset-x-6 bottom-6 space-y-4">
              <div className="panel max-w-sm px-5 py-4 backdrop-blur-xl">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <BadgeCheck className="size-4" />
                  <span className="text-sm font-semibold">مشروع مميز</span>
                </div>
                <p className="font-display text-2xl font-bold text-text">{homeProjectHero.title}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-text-muted">
                  <MapPin className="size-4 text-primary" />
                  <span>{homeProjectHero.location}</span>
                </div>
              </div>
            </div>

            <div className="animate-float absolute -left-2 top-10 hidden rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-4 shadow-2xl backdrop-blur-xl md:block">
              <p className="text-sm text-text-muted">من الفكرة إلى التسليم</p>
              <p className="mt-2 font-display text-2xl font-bold text-text">حل متكامل تحت سقف واحد</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
