/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prettier/prettier */
import { ReactNode } from 'react'

import { useTranslation } from 'react-i18next'
import { Slideover } from '../common/headless'
import SharedDataContainer from '../../containers/sharedData'
import Lucide from '../common/lucide'
import { Icons } from '../../constants'

interface SlideoverPanelProps {
  close?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | string
  children: ReactNode
  heading?: string
  footer?: ReactNode | null
  /** Extra classes for Description (e.g. chat: no padding, full height) */
  contentClassName?: string
}

function SlideoverPanel({
  close,
  size,
  children,
  heading,
  footer,
  contentClassName,
}: SlideoverPanelProps) {
  const { handleSlider, slideOverPreview } = SharedDataContainer.useContainer()
  const { t } = useTranslation('pos')
  const showFooter = footer !== null && footer !== undefined

  return (
    <div className="mt-5 grid grid-cols-12 gap-6">
      <div className="intro-y col-span-12 lg:col-span-6">
        <Slideover open={slideOverPreview} onClose={handleSlider} size={size}>
          <Slideover.Panel>
            {close ? (
              <button
                type="button"
                onClick={handleSlider}
                className="absolute left-0 right-auto top-0 -ml-12 mt-4 outline-none"
              >
                <Lucide icon={Icons.CLOSE} className="h-8 w-8 text-[#B0B0B0]" />
              </button>
            ) : (
              ''
            )}
            {heading ? (
              <Slideover.Title>
                <h2 className="mr-auto text-base font-medium">{t(heading)}</h2>
              </Slideover.Title>
            ) : (
              ''
            )}
            <Slideover.Description
              className={contentClassName}
            >
              <div className={contentClassName?.includes('h-full') ? 'h-full' : undefined}>
                {children}
              </div>
            </Slideover.Description>
            {showFooter ? <Slideover.Footer>{footer}</Slideover.Footer> : null}
          </Slideover.Panel>
        </Slideover>
      </div>
    </div>
  )
}

export default SlideoverPanel

SlideoverPanel.defaultProps = {
  close: false,
  size: 'md',
  heading: '',
  footer: <div />,
  contentClassName: '',
}
