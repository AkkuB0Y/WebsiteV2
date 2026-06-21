import { PageTitle } from "@/components/page-title";
import { cn } from "@/lib/utils";

type SectionProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ title, children, className }: SectionProps) {
  return (
    <main
      className={cn("min-h-[calc(100vh-3.5rem)] bg-bg px-6 py-12", className)}
    >
      <div className="mx-auto max-w-5xl">
        {title ? <PageTitle>{title}</PageTitle> : null}
        {children}
      </div>
    </main>
  );
}
