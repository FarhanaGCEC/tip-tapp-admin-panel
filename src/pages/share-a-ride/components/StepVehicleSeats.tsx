import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../../../components/common/button'
import Lucide from '../../../components/common/lucide'
import {
  InputElement,
  SelectElement,
  TextareaElement,
} from '../../../components/common/form-elements'
import { FormSwitch } from '../../../components/common/form-elements/components'
import { AlignmentTypes } from '../../../constants/common-enums'
import NumberStepper from './NumberStepper'
import {
  CURRENCY_OPTIONS,
  EMPTY_VEHICLE_SEATS,
  VehicleSeatsForm,
} from '../types/trip'

const schema = yup.object({
  stops: yup.array().of(yup.string()),
  currency: yup.string().required('Currency is required'),
  travellingWith: yup.number().min(0).required(),
  frontSeats: yup.number().min(0).required(),
  frontSeatCharge: yup.string(),
  backSeats: yup.number().min(0).required(),
  backSeatCharge: yup.string(),
  luggageLimit: yup.number().min(0).required(),
  addDiscount: yup.boolean(),
  petsAllowed: yup.boolean(),
  termsAndConditions: yup.string(),
  policyNotes: yup.string(),
})

interface StepVehicleSeatsProps {
  defaultValues: VehicleSeatsForm
  onBack: () => void
  onSaveNext: (data: VehicleSeatsForm) => void
}

function StepFieldLabel({
  label,
  hint,
}: {
  label: string
  hint?: string
}) {
  return (
    <div className="mb-2">
      <p className="text-sm font-medium text-brand-navy">{label}</p>
      {hint ? <p className="mt-0.5 text-xs text-slate-500">{hint}</p> : null}
    </div>
  )
}

function StepVehicleSeats({
  defaultValues,
  onBack,
  onSaveNext,
}: StepVehicleSeatsProps) {
  const [newStop, setNewStop] = useState('')

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VehicleSeatsForm>({
    resolver: yupResolver(schema),
    defaultValues: { ...EMPTY_VEHICLE_SEATS, ...defaultValues },
    mode: 'onChange',
  })

  const stops = watch('stops') || []

  const addStop = () => {
    const trimmed = newStop.trim()
    if (!trimmed) return
    setValue('stops', [...stops, trimmed])
    setNewStop('')
  }

  const removeStop = (index: number) => {
    setValue(
      'stops',
      stops.filter((_, i) => i !== index)
    )
  }

  return (
    <form onSubmit={handleSubmit(onSaveNext)} className="space-y-8">
      {/* Add Stops */}
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-base font-semibold text-brand-navy">Add Stops</h3>
          <p className="mt-1 text-sm text-slate-500">
            Add optional stop locations along your route.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={newStop}
            placeholder="Enter stop location"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            onChange={(e) => setNewStop(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addStop()
              }
            }}
          />
          <Button
            type="button"
            variant="secondary"
            className="shrink-0 rounded-xl px-5 py-3"
            onClick={addStop}
          >
            <Lucide icon="Plus" className="mr-2 inline h-4 w-4" />
            Add Stop
          </Button>
        </div>

        {stops.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {stops.map((stop, index) => (
              <li
                key={`${stop}-${index}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Lucide icon="MapPin" className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate text-sm text-brand-navy">{stop}</span>
                </div>
                <button
                  type="button"
                  className="ml-3 shrink-0 text-slate-400 transition hover:text-primary"
                  aria-label="Remove stop"
                  onClick={() => removeStop(index)}
                >
                  <Lucide icon="X" className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* Seats & Charges */}
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-base font-semibold text-primary">Seats & Charges</h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <SelectElement
              id="currency"
              label="Currency"
              name="currency"
              register={register}
              options={CURRENCY_OPTIONS}
              required
              error={errors.currency}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>

          <div>
            <StepFieldLabel label="How many people are you travelling with?" />
            <Controller
              name="travellingWith"
              control={control}
              render={({ field }) => (
                <NumberStepper value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <div>
            <StepFieldLabel label="Luggage limit per passenger" />
            <Controller
              name="luggageLimit"
              control={control}
              render={({ field }) => (
                <NumberStepper value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <div>
            <StepFieldLabel label="Available front seats" />
            <Controller
              name="frontSeats"
              control={control}
              render={({ field }) => (
                <NumberStepper value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <div>
            <InputElement
              id="frontSeatCharge"
              label="Charges for front seat"
              name="frontSeatCharge"
              type="number"
              placeholder="Enter price"
              register={register}
              error={errors.frontSeatCharge}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>

          <div>
            <StepFieldLabel label="Available back seats" />
            <Controller
              name="backSeats"
              control={control}
              render={({ field }) => (
                <NumberStepper value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <div>
            <InputElement
              id="backSeatCharge"
              label="Charges for back seat"
              name="backSeatCharge"
              type="number"
              placeholder="Enter price"
              register={register}
              error={errors.backSeatCharge}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
        </div>
      </section>

      {/* Discount */}
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-base font-semibold text-brand-navy">Discount</h3>
          <p className="mt-1 text-sm text-slate-500">
            Add an optional discount for a limited period.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4">
          <span className="text-sm font-medium text-brand-navy">Add discount</span>
          <Controller
            name="addDiscount"
            control={control}
            render={({ field }) => (
              <FormSwitch>
                <FormSwitch.Input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormSwitch>
            )}
          />
        </div>
      </section>

      {/* Trip Preferences */}
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-base font-semibold text-brand-navy">
            Trip Preferences & Add-ons
          </h3>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4">
          <span className="text-sm font-medium text-brand-navy">
            Are pets allowed?
          </span>
          <Controller
            name="petsAllowed"
            control={control}
            render={({ field }) => (
              <FormSwitch>
                <FormSwitch.Input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormSwitch>
            )}
          />
        </div>
      </section>

      {/* Terms & Policy */}
      <section>
        <div className="grid grid-cols-1 gap-6">
          <TextareaElement
            id="termsAndConditions"
            label="Terms & Conditions (Optional)"
            name="termsAndConditions"
            placeholder="Enter terms and conditions..."
            register={register}
            error={errors.termsAndConditions}
            labelAlignment={AlignmentTypes.BLOCK}
          />
          <TextareaElement
            id="policyNotes"
            label="Policy Notes (Optional)"
            name="policyNotes"
            placeholder="Enter policy notes..."
            register={register}
            error={errors.policyNotes}
            labelAlignment={AlignmentTypes.BLOCK}
          />
        </div>
      </section>

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
          type="submit"
          variant="primary"
          className="min-w-[160px] rounded-xl bg-primary px-6 py-3 font-semibold shadow-md hover:bg-brand-red-dark"
        >
          Save & Next
        </Button>
      </div>
    </form>
  )
}

export default StepVehicleSeats
