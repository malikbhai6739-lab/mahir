import type { Schedule } from "@/components/booking/types";

type ScheduleStepProps = {
  schedule: Schedule;
  dates: Schedule[];
  slots: string[];
  onDateChange: (date: Schedule) => void;
  onSlotChange: (slot: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function ScheduleStep({ schedule, dates, slots, onDateChange, onSlotChange, onBack, onContinue }: ScheduleStepProps) {
  return (
    <section aria-labelledby="schedule-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">Step 2</p>
      <h1 id="schedule-heading" className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">When should we visit?</h1>
      <p className="mt-3 text-base leading-7 text-muted">Select a convenient date and available time slot.</p>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Available dates</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {dates.map((date) => (
            <button key={date.dateValue} type="button" onClick={() => onDateChange(date)} aria-pressed={schedule.dateValue === date.dateValue} className={`min-h-20 rounded-2xl border p-3 text-left transition-colors ${schedule.dateValue === date.dateValue ? "border-brand bg-brand-soft" : "border-line bg-white hover:border-brand/50"}`}>
              <span className="block text-sm font-semibold text-foreground">{date.dateLabel}</span>
              <span className="mt-1 block text-xs text-muted">{date.dateValue}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Time slots</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {slots.map((slot) => (
            <button key={slot} type="button" onClick={() => onSlotChange(slot)} aria-pressed={schedule.slot === slot} className={`min-h-14 rounded-xl border px-4 text-left text-sm font-semibold transition-colors ${schedule.slot === slot ? "border-brand bg-brand-soft text-brand" : "border-line bg-white text-foreground hover:border-brand/50"}`}>{slot}</button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onBack} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-6 text-base font-semibold text-foreground transition-colors hover:border-brand hover:text-brand">Back</button>
        <button type="button" onClick={onContinue} disabled={!schedule.dateValue || !schedule.slot} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40">Continue</button>
      </div>
    </section>
  );
}
