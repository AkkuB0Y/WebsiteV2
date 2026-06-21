type StackRowProps = {
  stack: string[];
};

export function StackRow({ stack }: StackRowProps) {
  return (
    <p className="font-mono text-xs text-muted">
      <span className="text-muted/60">stack: </span>
      {stack.join(" · ")}
    </p>
  );
}
