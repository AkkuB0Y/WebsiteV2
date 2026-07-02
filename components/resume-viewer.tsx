"use client";

import { useEffect, useRef } from "react";

import { Section } from "@/components/section";
import { site } from "@/content/site";

const RESUME_SRC = `${site.resumePdf}#view=FitH`;

function isResumePdfUrl(url: string): boolean {
  try {
    const { pathname } = new URL(url, window.location.origin);
    return pathname === site.resumePdf;
  } catch {
    return false;
  }
}

export function ResumeViewer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // True means the next `load` event is the resume PDF we (re)loaded on purpose.
  const expectingPdf = useRef(true);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      return;
    }

    // #region agent log
    fetch('http://127.0.0.1:7351/ingest/7a7a59c5-0494-4734-85a3-3193c5a732a3',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'d68aab'},body:JSON.stringify({sessionId:'d68aab',runId:'pre-fix',hypothesisId:'E',location:'resume-viewer.tsx:33',message:'ResumeViewer effect mounted (full page load / re-run)',data:{topHref:window.location.href,ua:navigator.userAgent},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    const onLoad = () => {
      // In Safari the same-origin PDF's location is readable, but a link click
      // navigates the frame cross-origin, which makes reading `location` throw.
      // That thrown read is our reliable signal of an unwanted navigation.
      let readThrew = false;
      let href: string | null = null;
      try {
        href = iframe.contentWindow?.location.href ?? null;
      } catch {
        readThrew = true;
      }

      // #region agent log
      fetch('http://127.0.0.1:7351/ingest/7a7a59c5-0494-4734-85a3-3193c5a732a3',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'d68aab'},body:JSON.stringify({sessionId:'d68aab',runId:'post-fix',hypothesisId:'A',location:'resume-viewer.tsx:44',message:'iframe onLoad fired',data:{href,readThrew,expectingPdf:expectingPdf.current,isPdf:!readThrew&&href?isResumePdfUrl(href):null},timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      // A reload we triggered ourselves — consume it and wait for the PDF.
      if (expectingPdf.current) {
        expectingPdf.current = false;
        return;
      }

      // Still showing the resume PDF (same-origin & readable), including
      // in-document hash navigation. Nothing to do.
      if (!readThrew && href && isResumePdfUrl(href)) {
        return;
      }

      // Otherwise the frame navigated away — cross-origin (the location read
      // threw) via a link inside the PDF, or to another same-origin page.
      // External targets send X-Frame-Options / CSP frame-ancestors and render
      // as a blank/dark frame, so restore the PDF. When the destination is a
      // readable http(s) URL, open it in a new tab to honor the click.
      // #region agent log
      fetch('http://127.0.0.1:7351/ingest/7a7a59c5-0494-4734-85a3-3193c5a732a3',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'d68aab'},body:JSON.stringify({sessionId:'d68aab',runId:'post-fix',hypothesisId:'A',location:'resume-viewer.tsx:70',message:'restoring PDF after navigation away',data:{href,readThrew},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
        window.open(href, "_blank", "noopener,noreferrer");
      }

      expectingPdf.current = true;
      iframe.src = RESUME_SRC;
    };

    iframe.addEventListener("load", onLoad);
    return () => {
      iframe.removeEventListener("load", onLoad);
    };
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
