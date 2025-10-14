import React, { useState, useRef, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import Lucide from '../lucide'

interface DropdownOption {
  id: number
  name: string
  value: string
}

interface CustomDropdownProps {
  id?: string
  label?: string
  name?: string
  placeholder?: string
  options: DropdownOption[]
  value?: string
  onChange: (value: number | null) => void
  required?: boolean
  disabled?: boolean
  error?: string
  labelAlignment?: 'inline' | 'block'
  className?: string
}

function CustomDropdown({
  id,
  label,
  name,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  labelAlignment = 'block',
  className,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Find selected option based on value
  useEffect(() => {
    const option = options.find((opt) => opt.value === value)
    setSelectedOption(option || null)
  }, [value, options])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionSelect = (option: DropdownOption) => {
    setSelectedOption(option)
    onChange(option.id)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const getDisplayValue = () => {
    return selectedOption?.name || placeholder
  }

  return (
    <div className={twMerge(['relative', className])} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <div
          className={twMerge([
            'mb-2',
            labelAlignment === 'inline' ? 'mr-4 inline-block' : 'block',
          ])}
        >
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <div className="flex items-center">
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </div>
          </label>
        </div>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={twMerge([
          // Base styles - matching input fields exactly
          'relative w-full rounded-[7px] border border-[#C7C7C7] bg-white px-3 py-2.5 text-left text-sm shadow-sm transition duration-200 ease-in-out',
          'focus:border-primary focus:border-opacity-40 focus:ring-4 focus:ring-primary focus:ring-opacity-20',
          'focus:outline-none',

          // Hover and disabled states
          'hover:border-gray-400',
          'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-70',

          // Dark mode
          'dark:border-transparent dark:bg-darkmode-800 dark:text-white',
          'dark:focus:ring-slate-700 dark:focus:ring-opacity-50',

          // Error state
          error &&
            'border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20',

          // Open state
          isOpen && 'border-primary ring-4 ring-primary ring-opacity-20',
        ])}
      >
        <span
          className={twMerge([
            'block truncate',
            !selectedOption && 'text-[#B2BEB5] dark:text-slate-500/80',
          ])}
        >
          {getDisplayValue()}
        </span>

        {/* Chevron Icon */}
        <span
          className={twMerge([
            'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2',
            isOpen && 'rotate-180 transition-transform duration-200',
          ])}
        >
          <Lucide
            icon="ChevronDown"
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-darkmode-800 dark:ring-white dark:ring-opacity-10">
          <div className="max-h-60 overflow-auto rounded-md">
            {options.length === 0 ? (
              <div className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  className={twMerge([
                    'relative w-full cursor-pointer select-none py-2 pl-3 pr-9 text-left text-sm transition-colors duration-150',
                    'hover:bg-primary hover:text-white',
                    'dark:text-white dark:hover:bg-darkmode-700',
                    selectedOption?.id === option.id &&
                      'bg-primary text-white dark:bg-primary',
                  ])}
                >
                  <span className="block truncate">{option.name}</span>

                  {/* Selected indicator */}
                  {selectedOption?.id === option.id && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  )
}

export default CustomDropdown
