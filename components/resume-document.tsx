"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { site } from "@/content/site";

// Served from public/ so the same static path works under Turbopack (dev) and
// the Webpack static export (build). Keep this file in sync with the installed
// pdfjs-dist version (it's a copy of node_modules/pdfjs-dist/build/pdf.worker.min.mjs).
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export function ResumeDocument() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState<number>();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    const update = () => setPageWidth(el.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex max-h-[calc(100vh-14rem)] flex-col items-center gap-4 overflow-auto rounded-md border border-border bg-surface p-4"
    >
      <Document
        file={site.resumePdf}
        externalLinkTarget="_blank"
        externalLinkRel="noopener noreferrer"
        onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
        loading={
          <div className="p-6 text-center text-sm text-muted">Loading resume…</div>
        }
        error={
          <div className="p-6 text-center text-sm text-muted">
            Couldn&apos;t load the resume.
          </div>
        }
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={index}
            pageNumber={index + 1}
            width={pageWidth ? pageWidth - 32 : undefined}
            renderAnnotationLayer
            renderTextLayer
            className="shadow-sm"
          />
        ))}
      </Document>
    </div>
  );
}
