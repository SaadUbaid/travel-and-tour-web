import { Check } from "lucide-react";
export default function BookingProgress({
  step,
  onStep,
}: {
  step: number;
  onStep?: (step: number) => void;
}) {
  return (
    <>
      <span className="eyebrow booking-step-count">Step {step + 1} of 4</span>
      <ol className="planner-progress" aria-label="Booking enquiry progress">
        {["Choose", "Your details", "Review & send", "Confirmation"].map(
          (label, i) => (
            <li
              key={label}
              className={i === step ? "current" : i < step ? "complete" : ""}
              aria-current={i === step ? "step" : undefined}
            >
              <button
                type="button"
                disabled={!onStep || i > step}
                onClick={() => onStep?.(i)}
                aria-label={`${i + 1}. ${label}${i < step ? ", completed" : ""}`}
              >
                <span>
                  {i < step ? (
                    <Check size={14} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <small>{label}</small>
              </button>
            </li>
          ),
        )}
      </ol>
    </>
  );
}
