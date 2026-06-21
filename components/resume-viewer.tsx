import { Section } from "@/components/section";
import { site } from "@/content/site";

export function ResumeViewer() {
  return (
    <Section title="Resume" className="py-8">
      <div className="overflow-hidden rounded-md border border-border bg-surface">
        <iframe
          src={`${site.resumePdf}#view=FitH`}
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
