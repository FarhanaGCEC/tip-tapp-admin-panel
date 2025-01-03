/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { ReactElement, useState, useEffect } from 'react'
import Lucide from '../../components/common/lucide'
import Button from '../../components/common/button'
import FilterIcon from '../../assets/images/icons/filter-icon.svg'
import DownloadFile from '../../assets/images/svg/download-table.svg'
import { FormInput } from '../../components/common/form-elements/components'
import FooterManagementTable from '../../components/table/footer-management-table'
import SlideoverPanel from '../../components/slideover-panel'
import SharedDataContainer from '../../containers/sharedData'
import { FooterManagementHeadings } from '../../constants/table-data'
import { GetFooterManagementDetails } from '../../api/footer-management/footer-management'
import NoDataFound from '../../assets/images/NoDataFound.png'

interface FormContent {
  title: string

  component: (props: {
    userId: string
    content: any
    mainTopic: string
  }) => ReactElement
}

const FooterManagement = () => {
  const { handleSlider } = SharedDataContainer.useContainer()
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [searchName, setSearchName] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [sliderSize, setSliderSize] = useState<string>('xl')

  let typingTimeout: NodeJS.Timeout

  const searchUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setQuery(value)
    }, 750)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const [sliderContent, setSliderContent] = useState<{
    header: string
    children: ReactElement
    footer: ReactElement
  }>({
    header: '',
    children: <div />,
    footer: <div />,
  })

  const handleClick = (formContent: FormContent, item: any) => {
    handleSlider() // Not a hook, so this is fine
 const size = getSize()
    setSliderContent({
      header: formContent.title,
      children: formContent.component({
        mainTopic: item.name,
        userId: item.id.toString(),
        content: item.children as any,
      }),
      footer: <div />,
    })

    setSliderSize(size)
  }
  function getSize() {
    const screenSize = window.innerWidth
    return screenSize > 1200 ? 'xl' : screenSize > 768 ? 'lg' : 'sm'
  }
  useEffect(() => {
    function handleResize() {
      const newSize = getSize()
      setSliderSize(newSize)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const { data, isSuccess, isLoading } = GetFooterManagementDetails()

  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y mb-2 block h-10 items-center sm:flex">
        <h2 className="mr-5 truncate text-[19px] text-lg font-medium text-[#2D3748]">
          Footer List
        </h2>
      </div>
      <div className="mb-8 mt-3 flex items-center justify-between sm:ml-auto sm:mt-0">
        <div className="relative">{showFilters && <div></div>}</div>
      </div>
      <div className="intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible ">
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess && data?.length ? (
          <FooterManagementTable
            footerItems={data}
            handleClick={handleClick}
            headers={FooterManagementHeadings}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {' '}
            <div className="mb-3 flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border-b-0 bg-white shadow-lg">
              {' '}
              <img src={NoDataFound} alt="No Data" className="w-1/5" />{' '}
              <span className="text-[#2D3748]">No Data found ......</span>{' '}
            </div>{' '}
          </div>
        )}
      </div>

      <SlideoverPanel
        close
        size={sliderSize}
        footer={sliderContent.footer}
        heading={sliderContent.header}
      >
        {sliderContent.children}
      </SlideoverPanel>
    </div>
  )
}

export default FooterManagement
