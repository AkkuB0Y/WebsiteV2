"use client";

import { useEffect, useRef } from "react";

import { Section } from "@/components/section";
import { site } from "@/content/site";

const RESUME_SRC = `${site.resumePdf}#view=FitH`;

export function ResumeViewer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // True means the next `load` event is the resume PDF we (re)loaded on purpose.
  const expectingPdf = useRef(true);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }

    const onLoad = () => {
      if (expectingPdf.current) {
        // This load is the PDF we intentionally (re)loaded — leave it alone.
        expectingPdf.current = false;
        return;
      }

      // A link inside the PDF tried to take over the frame, which would replace
      // the resume with a blank/blocked external page. Restore the PDF instead.
      expectingPdf.current = true;
      iframe.src = RESUME_SRC;
    };

    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, []);

  return (
    <Section title="Resume" className="py-8">
      <div className="overflow-hidden rounded-md border border-border bg-surface">
        <iframe
          ref={iframeRef}
          src={RESUME_SRC}
          title="Resume"
          className="h-[calc(100vh-14rem)] w-full"
        />
      </div>
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
