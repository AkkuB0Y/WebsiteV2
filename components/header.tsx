"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Home, Linkedin, Mail, Menu } from "lucide-react";

import { site } from "@/content/site";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Fun", href: "/fun" },
] as const;

function NavLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-normal tracking-wide text-muted transition-colors hover:text-text",
        isActive && "font-medium text-text underline decoration-text underline-offset-[6px]",
        className
      )}
    >
      {label}
    </Link>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      <a
        href={site.socials.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-muted transition-colors hover:text-text"
      >
        <Github className="h-4 w-4" />
      </a>
      <a
        href={site.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-muted transition-colors hover:text-text"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={site.socials.email}
        aria-label="Email"
        className="text-muted transition-colors hover:text-text"
      >
        <Mail className="h-4 w-4" />
      </a>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 font-mono backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Home"
            className="text-muted transition-colors hover:text-text"
          >
            <Home className="h-4 w-4" strokeWidth={1.75} />
          </Link>
          <SocialLinks />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <Sheet>
          <SheetTrigger
            className="inline-flex items-center justify-center rounded-md p-2 text-muted transition-colors hover:text-text md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent className="border-border bg-surface text-text">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="mt-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <NavLink href={item.href} label={item.label} className="text-base" />
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
