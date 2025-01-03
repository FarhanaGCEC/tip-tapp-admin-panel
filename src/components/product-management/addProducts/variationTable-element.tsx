import clsx from 'clsx'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import Button from '../../common/button'
import {
  FormInfo,
  FormInline,
  FormInput,
  FormLabel,
  FormRequiredIcon,
  FormRequiredLabel,
} from '../../common/form-elements/components'
import Lucide from '../../common/lucide'
import VariationTable from './components/VariationTable'

interface InputProps {
  id?: string
  label?: string
  name?: string
  register: UseFormRegister<FieldValues>
  disabled?: boolean
  rounded?: boolean
  required?: boolean
  info?: string
}

function VariationTableElement({
  id,
  label,
  name,
  register,
  disabled,
  rounded,
  required,
  info,
}: InputProps) {
  return (
    <FormInline className="mt-3 flex-col items-start pt-1 first:mt-0 first:pt-0 xl:flex-row">
      <div className="col-span-2 grid">
        {label ? (
          <FormLabel
            htmlFor={id}
            className="m-0 mb-2 flex h-full max-h-[38px] items-center sm:mb-0"
          />
        ) : (
          ''
        )}
        {/* <div className="mb-0 mt-3 w-full sm:ml-auto sm:mt-0 sm:w-auto md:ml-0">
          <div className="relative mb-3 mr-4 mt-2 w-40 text-slate-500">
            <FormInput
              type="text"
              className="!box w-40 pr-10"
              placeholder="Search..."
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 my-auto mr-3 h-4 w-4"
            />
          </div>
        </div> */}
      </div>
      <div className="mt-0 w-full flex-1 xl:mt-0">
        <VariationTable />
      </div>
    </FormInline>
  )
}

export default VariationTableElement

VariationTableElement.defaultProps = {
  id: '',
  label: '',
  name: '',
  disabled: false,
  rounded: false,
  required: false,
  info: '',
}
