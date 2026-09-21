import { useState } from 'react'
import { Link } from 'react-router-dom'
import Lucide from '../../../components/common/lucide'
import TripStepSidebar, { TripWizardStep } from '../components/TripStepSidebar'
import StepTripDetails from '../components/StepTripDetails'
import StepVehicleSeats from '../components/StepVehicleSeats'
import StepReviewPublish from '../components/StepReviewPublish'
import {
  EMPTY_TRIP_DETAILS,
  EMPTY_VEHICLE_SEATS,
  TripDetailsForm,
  TripFormData,
  VehicleSeatsForm,
} from '../types/trip'

const STEP_TITLES: Record<TripWizardStep, string> = {
  1: 'Trip Details',
  2: 'Trip Options',
  3: 'Review & Publish',
}

function AddTripPage() {
  const [currentStep, setCurrentStep] = useState<TripWizardStep>(1)
  const [maxReachedStep, setMaxReachedStep] = useState<TripWizardStep>(1)
  const [formData, setFormData] = useState<TripFormData>({
    tripDetails: EMPTY_TRIP_DETAILS,
    vehicleSeats: EMPTY_VEHICLE_SEATS,
  })

  const goToStep = (step: TripWizardStep) => {
    if (step <= maxReachedStep) setCurrentStep(step)
  }

  const handleTripDetailsSave = (data: TripDetailsForm) => {
    setFormData((prev) => ({ ...prev, tripDetails: data }))
    setMaxReachedStep(2)
    setCurrentStep(2)
  }

  const handleVehicleSeatsSave = (data: VehicleSeatsForm) => {
    setFormData((prev) => ({ ...prev, vehicleSeats: data }))
    setMaxReachedStep(3)
    setCurrentStep(3)
  }

  return (
    <div className="intro-y">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-brand-navy transition hover:border-slate-300"
            aria-label="Go back"
          >
            <Lucide icon="ArrowLeft" className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-brand-navy">Create Hitch Ride</h1>
            <p className="text-sm text-slate-500">
              Step {currentStep} of 3 — {STEP_TITLES[currentStep]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                step === currentStep
                  ? 'w-8 bg-primary'
                  : step < currentStep
                  ? 'w-2 bg-[#2F9E44]'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <TripStepSidebar
            currentStep={currentStep}
            maxReachedStep={maxReachedStep}
            onStepClick={goToStep}
          />
        </aside>

        <main className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 border-b border-slate-200 pb-4">
            <h2 className="text-lg font-semibold text-brand-navy">
              {STEP_TITLES[currentStep]}
            </h2>
          </div>

          {currentStep === 1 ? (
            <StepTripDetails
              defaultValues={formData.tripDetails}
              onSaveNext={handleTripDetailsSave}
            />
          ) : null}

          {currentStep === 2 ? (
            <StepVehicleSeats
              defaultValues={formData.vehicleSeats}
              onBack={() => setCurrentStep(1)}
              onSaveNext={handleVehicleSeatsSave}
            />
          ) : null}

          {currentStep === 3 ? (
            <StepReviewPublish
              formData={formData}
              onBack={() => setCurrentStep(2)}
              onPublish={() => {
                // API hookup later
                console.info('Publish trip', formData)
              }}
            />
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default AddTripPage
