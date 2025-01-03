/* eslint-disable no-param-reassign */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import VariationTableElement from './variationTable-Elements'
import LoadingIcon from '../../common/loading-icon'
import Pagination from '../../common/pagination'
import Lucide from '../../common/lucide'
import { FormInput, FormSelect } from '../../common/form-elements/components'

function DueSale() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleChange = () => {
    setShowMoreInfo(!showMoreInfo)
  }

  const schema = yup
    .object({
      shipping_details: yup.string().required(),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sucessHandlerCreateCustomer = (customer: any, message: string) => {
    setNotification({
      title: '',
      message,
      icon: Icons.CHECKCIRCLE,
      type: NotificationTypes.SUCCESS,
    })
    Toast()
    setIsLoading(false)
    handleSlider()
  }
  const createCustomer = async (customer: any) => {
    setIsLoading(true)
    customer.type = 'both'
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCustomer(data)
  }

  const [filter, setFilter] = useState({
    field: 'name',
    type: 'like',
    value: '',
  })

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
        <div className="mt- intro-y flex flex-col items-center sm:flex-row">
          <div className="mt-2 items-center sm:mr-4 sm:flex xl:mt-0">
            Page Size
            <FormSelect className="w-15 !box mt-3 sm:mt-0">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </FormSelect>
          </div>

          <div className="mr-auto  font-medium"></div>
          <div className="relative flex sm:mt-0  sm:w-auto">
            <FormInput
              type="text"
              className="box custom-input"
              placeholder="Search here"
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
            />
          </div>
        </div>
        <VariationTableElement register={register} />
        <div className="intro-y col-span-10 mt-5 flex flex-wrap items-center sm:flex-row sm:flex-nowrap ">
          <div className="mr-auto  font-medium">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="font-medium">
            <Pagination className="w-full sm:mr-auto sm:w-auto">
              <Pagination.Link>
                <Lucide icon="ChevronsLeft" className="h-4 w-4" />
              </Pagination.Link>
              <Pagination.Link>
                <Lucide icon="ChevronLeft" className="h-4 w-4" />
              </Pagination.Link>

              <Pagination.Link>1</Pagination.Link>
              <Pagination.Link active>2</Pagination.Link>
              <Pagination.Link>3</Pagination.Link>

              <Pagination.Link>
                <Lucide icon="ChevronRight" className="h-4 w-4" />
              </Pagination.Link>
              <Pagination.Link>
                <Lucide icon="ChevronsRight" className="h-4 w-4" />
              </Pagination.Link>
            </Pagination>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          variant="secondary"
          className="mb-2 mr-1 w-24"
          onClick={handleSlider}
        >
          {`${t('common.button.close')}`}
        </Button>
      </div>
    </form>
  )
}

export default DueSale
