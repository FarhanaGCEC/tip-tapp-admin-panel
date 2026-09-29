import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import clsx from 'clsx'
import Lucide from '../../../components/common/lucide'
import Button from '../../../components/common/button'
import {
  InputElement,
  TextareaElement,
  DateElement,
} from '../../../components/common/form-elements'
import { AlignmentTypes } from '../../../constants/common-enums'
import {
  MOCK_VEHICLES,
  TripDetailsForm,
} from '../types/trip'

const schema = yup.object({
  vehicleId: yup.string().required('Please select a vehicle'),
  tripTitle: yup.string().required('Trip title is required').min(2),
  aboutMe: yup.string(),
  startLocation: yup.string().required('Start location is required'),
  endLocation: yup.string().required('End location is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  departureTime: yup.string().required('Departure time is required'),
})

interface StepTripDetailsProps {
  defaultValues: TripDetailsForm
  onSaveNext: (data: TripDetailsForm) => void
}

function StepTripDetails({ defaultValues, onSaveNext }: StepTripDetailsProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TripDetailsForm>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onChange',
  })

  const selectedVehicleId = watch('vehicleId')
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  return (
    <form onSubmit={handleSubmit(onSaveNext)} className="space-y-8">
      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-base font-semibold text-brand-navy">Vehicle</h3>
          <p className="mt-1 text-sm text-slate-500">
            Choose a saved vehicle from My Vehicles
          </p>
        </div>

        <div className="space-y-3">
          {MOCK_VEHICLES.map((vehicle) => {
            const selected = selectedVehicleId === String(vehicle.id)
            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() =>
                  setValue('vehicleId', String(vehicle.id), { shouldValidate: true })
                }
                className={clsx(
                  'flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition',
                  selected
                    ? 'border-primary/40 bg-primary/[0.04] ring-1 ring-primary/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-brand-navy">
                  <Lucide icon="Car" className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-brand-navy">{vehicle.label}</p>
                  <p className="text-sm text-slate-500">{vehicle.meta}</p>
                </div>
                <Lucide icon="ChevronRight" className="h-4 w-4 text-slate-400" />
              </button>
            )
          })}
        </div>
        {errors.vehicleId ? (
          <p className="mt-2 text-sm text-primary">{errors.vehicleId.message}</p>
        ) : null}
        <input type="hidden" {...register('vehicleId')} />
      </section>

      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-base font-semibold text-primary">Trip Overview</h3>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <InputElement
            id="tripTitle"
            label="Trip Title"
            name="tripTitle"
            placeholder="Enter trip title"
            register={register}
            required
            error={errors.tripTitle}
            labelAlignment={AlignmentTypes.BLOCK}
          />
          <TextareaElement
            id="aboutMe"
            label="About Me (Optional)"
            name="aboutMe"
            placeholder="Tell passengers a little about yourself..."
            register={register}
            error={errors.aboutMe}
            labelAlignment={AlignmentTypes.BLOCK}
          />
        </div>
      </section>

      <section>
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="text-base font-semibold text-brand-navy">
            Date and Location
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Set when and where your trip will take place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputElement
            id="startLocation"
            label="Start Location"
            name="startLocation"
            placeholder="Enter pickup location"
            register={register}
            required
            iconLeft="MapPin"
            error={errors.startLocation}
            labelAlignment={AlignmentTypes.BLOCK}
          />
          <InputElement
            id="endLocation"
            label="End Location"
            name="endLocation"
            placeholder="Enter drop-off location"
            register={register}
            required
            iconLeft="MapPin"
            error={errors.endLocation}
            labelAlignment={AlignmentTypes.BLOCK}
          />
          <DateElement
            id="startDate"
            label="Start Date"
            name="startDate"
            value={startDate}
            onChange={(date) => setValue('startDate', date, { shouldValidate: true })}
            required
            error={errors.startDate}
            labelAlignment={AlignmentTypes.BLOCK}
            options={{
              autoApply: true,
              dropdowns: { minYear: 2024, maxYear: 2030, months: true, years: true },
            }}
          />
          <DateElement
            id="endDate"
            label="End Date"
            name="endDate"
            value={endDate}
            onChange={(date) => setValue('endDate', date, { shouldValidate: true })}
            required
            error={errors.endDate}
            labelAlignment={AlignmentTypes.BLOCK}
            options={{
              autoApply: true,
              dropdowns: { minYear: 2024, maxYear: 2030, months: true, years: true },
            }}
          />
          <div className="md:col-span-2">
            <InputElement
              id="departureTime"
              label="Departure Time"
              name="departureTime"
              type="text"
              placeholder="e.g. 09:00 PM"
              register={register}
              required
              iconLeft="Clock"
              error={errors.departureTime}
              labelAlignment={AlignmentTypes.BLOCK}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end border-t border-slate-200 pt-6">
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

export default StepTripDetails
