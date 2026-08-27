type BookingProgressProps = {
  currentStep: number;
};

const steps = ["Address", "Schedule", "Review", "Done"];

export function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="grid grid-cols-4 gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const active = stepNumber === currentStep;
          const complete = stepNumber < currentStep;

          return (
            <li key={step} className="flex min-w-0 flex-col items-center gap-2 text-center">
              <span
                className={`grid size-9 place-items-center rounded-full text-sm font-bold ${
                  active || complete ? "bg-brand text-white" : "border border-line bg-white text-muted"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {complete ? "✓" : stepNumber}
              </span>
              <span className={`text-xs font-semibold sm:text-sm ${active ? "text-brand" : "text-muted"}`}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
