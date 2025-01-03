/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  SearchSelectElement,
  SelectElement,
} from '../../components/common/form-elements'
import SlideoverPanel from '../../components/slideover-panel'
import { Icons, NotificationTypes } from '../../constants'
import SharedDataContainer from '../../containers/sharedData'
import SlideoverRegistry from './slideover-registry'
import {
  ProductTable,
  ActionsBar,
  ProductList,
  ProductSearch,
} from './components'
import { IProductListRes } from '../../interfaces/pos.interface'
import { SelectApi } from '../../api'
import Toast from '../../utils/notification'
import LoadingIcon from '../../components/common/loading-icon'
import ShortcutKey from '../../components/common/shortcut-key'
import PreviewImage2 from '../../assets/images/fakers/image-4.jpg'
import PreviewImage3 from '../../assets/images/fakers/image-6.jpg'

interface FormContent {
  title: string
  component: JSX.Element
}

function Pos() {
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [sliderSize, setSliderSize] = useState('xl')
  const [sliderContent, setSliderContent] = useState({
    header: '',
    children: <div />,
    footer: <div />,
  })
  const [productsList, setProductList] = useState<IProductListRes[]>([])
  const [invoiceItems, setInvoiceItems] = useState<IProductListRes[]>([])
  const [productParams] = useState(1)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [pageNo] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sucessHandlerCreateCustomer = (products: any) => {
    setProductList(products.data)
    setIsLoadingProducts(false)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorHandler = (error: any) => {
    Toast()
    setNotification({
      title: '',
      message: error || 'Something went wrong.',
      icon: Icons.XCIRCLE,
      type: NotificationTypes.ERROR,
    })
    setIsLoadingProducts(false)
  }

  const selectApi = SelectApi.useAPI()

  const fetchProduct = async (location: number, page: number) => {
    setIsLoadingProducts(true)

    try {
      const res = await selectApi.getFilteredProducts({
        location_id: location,
        page,
      })

      if (res) {
        const { data } = res
        const { data: products } = data
        sucessHandlerCreateCustomer(products)
      } else {
        errorHandler(null)
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    fetchProduct(productParams, pageNo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = ({ title, component }: FormContent) => {
    handleSlider()
    setSliderContent({
      header: title,
      children: component,
      footer: <div />,
    })
    setSliderSize('xl')
  }
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const handleChange = () => {}

  const handleProductSelect = (product: IProductListRes) => {
    setInvoiceItems((prevInvoiceItems) => [...prevInvoiceItems, product])
  }

  const handleRemoveItems = (id: number) => {
    const updatedItems = invoiceItems.filter((item) => item.id !== id)
    setInvoiceItems(updatedItems)
  }

  const handleKeyUp = (keyName: string) => {
    if (keyName === 'alt+s') {
      handleClick(SlideoverRegistry.customer)
    }
  }

  return (
    <>
      <div className="grid">
        <div className="grid gap-2 lg:grid-flow-col lg:grid-cols-5">
          <div className="mt-5 grid grid-flow-row lg:col-span-3">
            {/* TODO: This area for POS form and table */}
            <div className="intro-y box">
              <div className="grid grid-cols-1 gap-3 px-5 pt-5 sm:grid-cols-2">
                <SearchSelectElement
                  register={register}
                  name="customer"
                  id="customer"
                  onChange={handleChange}
                  error={errors.customer}
                  iconLeft={Icons.USER}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.customer)}
                />
                {/* <SearchSelectElement
                  register={register}
                  name="products"
                  id="products"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.QRCODE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.expenses)}
                /> */}
                <SearchSelectElement
                  register={register}
                  name="products"
                  id="products"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.QRCODE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.product)}
                />
                {/* <SearchSelectElement
                  register={register}
                  name="products"
                  id="products"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.QRCODE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() =>
                    handleClick(SlideoverRegistry.stockReport)
                  }
                />
                <SearchSelectElement
                  register={register}
                  name="expenses"
                  id="expenses"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.QRCODE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.expenses)}

                />
                <SearchSelectElement
                  register={register}
                  name="expenses"
                  id="expenses"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.CHECKCIRCLE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.nonReceipt)}
                />

                <SearchSelectElement
                  register={register}
                  name="expenses"
                  id="expenses"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.CHECKCIRCLE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.registerDetails)}
                />

                <SearchSelectElement
                  register={register}
                  name="expenses"
                  id="expenses"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.CHECKCIRCLE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.payment)}
                />
                <SearchSelectElement
                  register={register}
                  name="expenses"
                  id="expenses"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.CHECKCIRCLE}
                  iconRight={Icons.PLUSCIRCLE}

                  onClickRight={() => handleClick(SlideoverRegistry.dueSales)}
                />
                <SearchSelectElement
                  register={register}
                  name="expenses"
                  id="expenses"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.CHECKCIRCLE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.shipping)}

                />
                <SearchSelectElement
                  register={register}
                  name="expenses"
                  id="expenses"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.CHECKCIRCLE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.card)}

                />
                <SearchSelectElement
                  register={register}
                  name="expenses"
                  id="expenses"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.CHECKCIRCLE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.recentTransaction)}
                />
                <SearchSelectElement
                  register={register}
                  name="expenses"
                  id="expenses"
                  onChange={handleChange}
                  error={errors.products}
                  iconLeft={Icons.CHECKCIRCLE}
                  iconRight={Icons.PLUSCIRCLE}
                  onClickRight={() => handleClick(SlideoverRegistry.suspendSales)}
                  /> */}
              </div>
              <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3">
                <SelectElement register={register} name="" id="" />
                <SelectElement register={register} name="" id="" />
                <SelectElement register={register} name="" id="" />
              </div>
            </div>
            <ProductTable
              invoiceItems={invoiceItems}
              onClick={(id: number) => handleRemoveItems(id)}
            />
          </div>
          <div className="mt-5 grid-flow-row lg:col-span-2">
            {/* TODO: This area for product List */}
            <div className="grid grid-cols-1 gap-3 pb-3 sm:grid-cols-3">
              <ProductSearch />
            </div>
            {isLoadingProducts ? (
              <div className="grid grid-cols-1 justify-items-center">
                <LoadingIcon icon="puff" color="blue" className="h-8 w-8" />
              </div>
            ) : (
              <div className="scrollbar-hidden grid max-h-[calc(100vh-272px)] grid-cols-12 gap-3 overflow-x-hidden overflow-y-scroll">
                {productsList.length > 1 ? (
                  productsList.map((product: IProductListRes) => {
                    return (
                      <ProductList
                        key={product.id}
                        product={product}
                        onClick={() => handleProductSelect(product)}
                      />
                    )
                  })
                ) : (
                  <div className="col-span-12">
                    {/* <div className="w-full mb-2 border-b-0 bg-white p-2 shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                    <div className="text-center">No Any Product</div>
                    </div> */}
                    <div className="grid grid-cols-12 gap-3">
                      <div className="box zoom-in col-span-12 flex cursor-pointer flex-col items-center p-1 sm:col-span-4 2xl:col-span-3">
                        <div className="aspect-w-1 aspect-h-1 relative mt-2 h-[80px] max-w-[80px]">
                          <img
                            alt="sm"
                            className="h-full w-full rounded-md object-cover"
                            src={PreviewImage2}
                          />
                        </div>
                        <div className="mt-2 max-w-[120px] truncate text-center text-[13px] font-medium">
                          120 Page Book
                        </div>
                        <div className="max-w-[110px] truncate text-center text-[11px] text-slate-500">
                          Rs 420.00 | 47.43 No(s)
                        </div>
                        <div className="max-w-[100px] truncate text-[11px]">
                          76890087
                        </div>
                      </div>
                      <div className="box zoom-in col-span-12 flex cursor-pointer flex-col items-center p-1 sm:col-span-4 2xl:col-span-3">
                        <div className="aspect-w-1 aspect-h-1 relative mt-2 h-[80px] max-w-[80px]">
                          <img
                            alt="sm"
                            className="h-full w-full rounded-md object-cover"
                            src={PreviewImage2}
                          />
                        </div>
                        <div className="mt-2 max-w-[120px] truncate text-center text-[13px] font-medium">
                          120 Page Book
                        </div>
                        <div className="max-w-[110px] truncate text-center text-[11px] text-slate-500">
                          Rs 420.00 | 47.43 No(s)
                        </div>
                        <div className="max-w-[100px] truncate text-[11px]">
                          76890087
                        </div>
                      </div>
                      <div className="box zoom-in col-span-12 flex cursor-pointer flex-col items-center p-1 sm:col-span-4 2xl:col-span-3">
                        <div className="aspect-w-1 aspect-h-1 relative mt-2 h-[80px] max-w-[80px]">
                          <img
                            alt="sm"
                            className="h-full w-full rounded-md object-cover"
                            src={PreviewImage3}
                          />
                        </div>
                        <div className="mt-2 max-w-[120px] truncate text-center text-[13px] font-medium">
                          120 Page Book
                        </div>
                        <div className="max-w-[110px] truncate text-center text-[11px] text-slate-500">
                          Rs 420.00 | 47.43 No(s)
                        </div>
                        <div className="max-w-[100px] truncate text-[11px]">
                          76890087
                        </div>
                      </div>
                      <div className="box zoom-in col-span-12 flex cursor-pointer flex-col items-center p-1 sm:col-span-4 2xl:col-span-3">
                        <div className="aspect-w-1 aspect-h-1 relative mt-2 h-[80px] max-w-[80px]">
                          <img
                            alt="sm"
                            className="h-full w-full rounded-md object-cover"
                            src={PreviewImage2}
                          />
                        </div>
                        <div className="mt-2 max-w-[120px] truncate text-center text-[13px] font-medium">
                          120 Page Book
                        </div>
                        <div className="max-w-[110px] truncate text-center text-[11px] text-slate-500">
                          Rs 420.00 | 47.43 No(s)
                        </div>
                        <div className="max-w-[100px] truncate text-[11px]">
                          76890087
                        </div>
                      </div>
                      <div className="box zoom-in col-span-12 flex cursor-pointer flex-col items-center p-1 sm:col-span-4 2xl:col-span-3">
                        <div className="aspect-w-1 aspect-h-1 relative mt-2 h-[80px] max-w-[80px]">
                          <img
                            alt="sm"
                            className="h-full w-full rounded-md object-cover"
                            src={PreviewImage2}
                          />
                        </div>
                        <div className="mt-2 max-w-[120px] truncate text-center text-[13px] font-medium">
                          120 Page Book
                        </div>
                        <div className="max-w-[110px] truncate text-center text-[11px] text-slate-500">
                          Rs 420.00 | 47.43 No(s)
                        </div>
                        <div className="max-w-[100px] truncate text-[11px]">
                          76890087
                        </div>
                      </div>
                      <div className="box zoom-in col-span-12 flex cursor-pointer flex-col items-center p-1 sm:col-span-4 2xl:col-span-3">
                        <div className="aspect-w-1 aspect-h-1 relative mt-2 h-[80px] max-w-[80px]">
                          <img
                            alt="sm"
                            className="h-full w-full rounded-md object-cover"
                            src={PreviewImage2}
                          />
                        </div>
                        <div className="mt-2 max-w-[120px] truncate text-center text-[13px] font-medium">
                          120 Page Book
                        </div>
                        <div className="max-w-[110px] truncate text-center text-[11px] text-slate-500">
                          Rs 420.00 | 47.43 No(s)
                        </div>
                        <div className="max-w-[100px] truncate text-[11px]">
                          76890087
                        </div>
                      </div>
                      <div className="box zoom-in col-span-12 flex cursor-pointer flex-col items-center p-1 sm:col-span-4 2xl:col-span-3">
                        <div className="aspect-w-1 aspect-h-1 relative mt-2 h-[80px] max-w-[80px]">
                          <img
                            alt="sm"
                            className="h-full w-full rounded-md object-cover"
                            src={PreviewImage2}
                          />
                        </div>
                        <div className="mt-2 max-w-[120px] truncate text-center text-[13px] font-medium">
                          120 Page Book
                        </div>
                        <div className="max-w-[110px] truncate text-center text-[11px] text-slate-500">
                          Rs 420.00 | 47.43 No(s)
                        </div>
                        <div className="max-w-[100px] truncate text-[11px]">
                          76890087
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="relative bottom-0 z-10 grid grid-cols-5 gap-2 lg:bottom-8  lg:grid-flow-col lg:grid-cols-5">
          <ActionsBar
            setSliderContent={setSliderContent}
            // setSliderSize={setSliderSize}
          />
        </div>
      </div>
      <ShortcutKey onKeyUp={handleKeyUp} />
      <SlideoverPanel
        close
        size={sliderSize}
        heading={sliderContent.header}
        footer={sliderContent.footer}
      >
        {sliderContent.children}
      </SlideoverPanel>
    </>
  )
}

export default Pos
