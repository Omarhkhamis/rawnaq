import { MessageCircle } from "lucide-react";

type WhatsappFloatingButtonProps = {
  href?: string;
};

export function WhatsappFloatingButton({ href }: WhatsappFloatingButtonProps) {
  if (!href) {
    return null;
  }

  return (
    <a
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-5 left-5 z-[120] inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#25d366]/40 bg-[#25d366] px-5 text-sm font-bold text-[#062d16] shadow-[0_18px_45px_rgba(37,211,102,0.32)] transition hover:translate-y-[-2px] hover:bg-[#38e27a] focus:outline-none focus:ring-2 focus:ring-[#25d366]/70 md:bottom-7 md:left-7"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageCircle className="size-5" />
      واتساب
    </a>
  );
}
