"use client";

import dynamic from "next/dynamic";

import { Section } from "@/components/section";
import { site } from "@/content/site";

// react-pdf/pdfjs-dist rely on browser APIs (DOMMatrix, canvas), so the viewer
// must only run on the client — never during SSR/static prerender.
const ResumeDocument = dynamic(
  () => import("@/components/resume-document").then((m) => m.ResumeDocument),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-md border border-border bg-surface p-6 text-center text-sm text-muted">
        Loading resume…
      </div>
    ),
  },
);

export function ResumeViewer() {
  return (
    <Section title="Resume" className="py-8">
      <ResumeDocument />
      <p className="mt-4 text-center text-sm text-muted">
        <a
          href={site.resumePdf}
          download
          className="underline underline-offset-4 transition-colors hover:text-text"
        >
          Download PDF
        </a>
      </p>
    </Section>
  );
}
