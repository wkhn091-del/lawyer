import { home } from "@/content/home";

/** Short 3-step reassurance next to the lead form — answers “what happens after I submit?” */
export function ContactProcess() {
  const { process } = home;

  return (
    <ol className="mt-8 space-y-4 border-t border-border pt-8">
      <li className="text-small font-medium text-navy">{process.title}</li>
      {process.steps.map((step, index) => (
        <li key={step.title} className="flex gap-3 text-small text-muted">
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-navy font-display text-[0.75rem] text-cream">
            {index + 1}
          </span>
          <span>
            <span className="font-medium text-navy">{step.title}:</span> {step.body}
          </span>
        </li>
      ))}
    </ol>
  );
}
