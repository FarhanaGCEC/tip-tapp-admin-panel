import clsx from 'clsx'
import Lucide from '../../../components/common/lucide'

export type TripWizardStep = 1 | 2 | 3

const STEPS: { step: TripWizardStep; title: string; subtitle: string }[] = [
  {
    step: 1,
    title: 'Trip Details',
    subtitle: 'Vehicle, overview & schedule',
  },
  {
    step: 2,
    title: 'Trip Options',
    subtitle: 'Stops, seats, charges & preferences',
  },
  {
    step: 3,
    title: 'Review & Publish',
    subtitle: 'Confirm and publish trip',
  },
]

interface TripStepSidebarProps {
  currentStep: TripWizardStep
  maxReachedStep: TripWizardStep
  onStepClick: (step: TripWizardStep) => void
}

function TripStepSidebar({
  currentStep,
  maxReachedStep,
  onStepClick,
}: TripStepSidebarProps) {
  return (
    <div className="space-y-3">
      {STEPS.map(({ step, title, subtitle }) => {
        const isActive = currentStep === step
        const isCompleted = step < currentStep
        const isLocked = step > maxReachedStep
        const isClickable = !isLocked

        return (
          <button
            key={step}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onStepClick(step)}
            className={clsx(
              'flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition',
              isActive &&
                'border-primary/40 bg-primary/[0.04] shadow-sm ring-1 ring-primary/20',
              !isActive && !isLocked && 'border-slate-200 bg-white hover:border-slate-300',
              isLocked && 'cursor-not-allowed border-slate-100 bg-slate-50 opacity-70'
            )}
          >
            <div
              className={clsx(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                isCompleted && 'bg-[#2F9E44] text-white',
                isActive && !isCompleted && 'border-2 border-primary text-primary',
                isLocked && 'border border-slate-200 bg-white text-slate-400'
              )}
            >
              {isCompleted ? (
                <Lucide icon="Check" className="h-5 w-5" />
              ) : (
                step
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={clsx(
                  'text-sm font-semibold',
                  isActive ? 'text-brand-navy' : 'text-slate-700',
                  isLocked && 'text-slate-400'
                )}
              >
                {title}
              </p>
              <p className="mt-0.5 truncate text-xs text-slate-500">{subtitle}</p>
            </div>

            <div className="shrink-0 text-slate-400">
              {isLocked ? (
                <Lucide icon="Lock" className="h-4 w-4" />
              ) : (
                <Lucide icon="ChevronRight" className="h-4 w-4" />
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default TripStepSidebar
