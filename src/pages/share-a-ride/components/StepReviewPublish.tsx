import Button from '../../../components/common/button'
import Lucide from '../../../components/common/lucide'
import { TripFormData } from '../types/trip'

interface StepReviewPublishProps {
  formData: TripFormData
  onBack: () => void
  onPublish: () => void
}

function StepReviewPublish({ formData, onBack, onPublish }: StepReviewPublishProps) {
  const { tripDetails, vehicleSeats } = formData

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-4 text-base font-semibold text-brand-navy">
          Trip summary
        </h3>
        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="text-slate-500">Trip title</dt>
            <dd className="font-medium text-brand-navy">{tripDetails.tripTitle || '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Route</dt>
            <dd className="font-medium text-brand-navy">
              {tripDetails.startLocation || '—'} → {tripDetails.endLocation || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Schedule</dt>
            <dd className="font-medium text-brand-navy">
              {tripDetails.startDate || '—'} – {tripDetails.endDate || '—'},{' '}
              {tripDetails.departureTime || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Seats</dt>
            <dd className="font-medium text-brand-navy">
              Front: {vehicleSeats.frontSeats} · Back: {vehicleSeats.backSeats}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Lucide icon="Send" className="h-7 w-7 text-primary" />
        </div>
        <p className="text-sm text-slate-500">
          Review your trip details and publish when ready. API integration can be
          wired here later.
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-6">
        <Button
          type="button"
          variant="secondary"
          className="rounded-xl px-6 py-3"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          className="min-w-[160px] rounded-xl bg-primary px-6 py-3 font-semibold shadow-md hover:bg-brand-red-dark"
          onClick={onPublish}
        >
          Publish Trip
        </Button>
      </div>
    </div>
  )
}

export default StepReviewPublish
