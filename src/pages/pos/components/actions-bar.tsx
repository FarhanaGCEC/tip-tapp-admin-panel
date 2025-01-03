/* eslint-disable prettier/prettier */
import Button from '../../../components/common/button'
import Lucide from '../../../components/common/lucide'
import SharedDataContainer from '../../../containers/sharedData'
import SlideoverRegistry from '../slideover-registry'

interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}

function ActionsBar({ setSliderContent }: Props) {
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const handleChange = () => {}

  const handleClick = ({ title, component }: FormContent) => {
    handleSlider()
    setSliderContent({
      header: title,
      children: component,
      footer: <div />,
    })
   
  }
  return (
    <>
      <div className="col-span-12 grid grid-flow-row lg:col-span-3">
        <div className="flex w-full flex-wrap justify-between rounded-l-md rounded-r-md border-b-0 bg-white p-2 shadow-[20px_3px_20px_#0000000b] dark:bg-darkmode-600">
          <div className="flex w-full flex-wrap justify-between md:w-2/3">
            <Button
              variant="linkedin"
              className="mb-1 w-[49%] flex-col items-start p-2 px-2 text-[11px] leading-3 sm:w-[32%]"
              onChange={handleChange}
              onClick={() => handleClick(SlideoverRegistry.discount)}
            >
              <p>Discount</p>
              <p>Rs.0.00</p>
            </Button>

            <Button
              variant="linkedin"
              className="mb-1 w-[49%] flex-col items-start p-2 px-2 text-[11px] leading-3 sm:w-[32%]"
              onChange={handleChange}
              onClick={() => handleClick(SlideoverRegistry.tax)}
            >
              <p>Tax</p>
              <p>Rs.99.00</p>
            </Button>

            <Button
              variant="linkedin"
              className="mb-1 w-[49%] flex-col items-start p-2 px-2 text-[11px] leading-3 sm:w-[32%]"
              onChange={handleChange}
              onClick={() => handleClick(SlideoverRegistry.shipping)}
            >
              <p>Shipping</p>
              <p>Rs.1000.00</p>
            </Button>
            <Button
              variant="linkedin"
              className="mb-1 w-[49%] flex-col items-start p-2 px-2 text-[11px] leading-3 sm:w-[32%]"
              onChange={handleChange}
              onClick={() => handleClick(SlideoverRegistry.paymentForm)}
            >
              <p>Payment</p>
              <p>Rs.1000.00</p>
            </Button>

            <Button
              variant="linkedin"
              className="mb-1 w-[49%] flex-col items-start p-2 px-2 text-[11px] leading-3 sm:w-[32%]"
              onChange={handleChange}
              onClick={() => handleClick(SlideoverRegistry.packaging)}
            >
              <p>Packaging</p>
              <p>Rs.1000.00</p>
            </Button>
            <Button
              variant="linkedin"
              className="mb-1 w-[49%] flex-col items-start p-2 px-2 text-[11px] leading-3 sm:w-[32%]"
              onClick={() => handleClick(SlideoverRegistry.roundOff)}
            >
              <p>Round Off</p>
              <p>Rs.1000.00</p>
            </Button>
          </div>
          <div className="flex w-full flex-col flex-wrap justify-between md:w-1/3">
            <p
            style={{
              fontSize: '15px',
            }} className="pl-3 font-bold "> Item Count: 400</p>
<Button
  style={{
    backgroundColor: '#39418c',
    color: 'white',
    overflow: 'hidden', // Prevents text from overflowing
    whiteSpace: 'normal', // Allows text to wrap onto multiple lines
  }}
  variant="primary"
  className="mx-1 mb-1 flex w-full flex-col items-start p-2 text-xs"
  onChange={handleChange}
>
  <p style={{ fontSize: '15px' }} className="font-medium mb-3">
    Total
  </p>
  <p
    style={{
      fontSize: '22px',
      backgroundColor: '#39418c',
      color: 'white',
    }}
    className="font-bold mb-2"
  >
    Rs.56,199,999.00
  </p>
</Button>


          </div>
        </div>
      </div>
      <div className="col-span-12 grid grid-flow-row lg:col-span-2">
        <div className="flex w-full flex-wrap justify-between rounded-l-md rounded-r-md border-b-0 bg-white p-2 shadow-[20px_3px_20px_#0000000b] dark:bg-darkmode-600">
          <Button
            className="mb-1 w-[49%] p-4 sm:w-[24%] md:w-[12%] lg:w-[24%]"
            style={{
              fontSize: '20px',
              backgroundColor: '#3a8e40',
              color: 'white',
            }}
          >
            <Lucide icon="DollarSign" className="h-4 w-4 mr-1" />
            <strong style={{ fontSize: '16px' }}> CASH</strong>
          </Button>

          <Button
            onClick={() => handleClick(SlideoverRegistry.payment)}
            variant="linkedin"
            className="mb-1 w-[49%] p-4 sm:w-[24%] md:w-[12%] lg:w-[24%]"
            style={{ fontSize: '20px' }}
          >
            <Lucide icon="Send" className="h-4 w-4 mr-1" />
            <strong style={{ fontSize: '16px' }}> PAY</strong>
          </Button>

          <Button
          variant="linkedin"
            onClick={() => handleClick(SlideoverRegistry.card)}
            className="mb-1 w-[49%] p-2 sm:w-[24%] md:w-[12%] lg:w-[24%]"
            style={{ fontSize: '20px' }}
          >
            <Lucide icon="CreditCard" className="h-4 w-4 mr-1" />
            <strong style={{ fontSize: '16px' }}> CARD</strong>
          </Button>

          <Button
            variant="linkedin"
            className="mb-1 w-[49%] p-2 sm:w-[24%] md:w-[12%] lg:w-[24%]"
            style={{ fontSize: '20px' }}
          >
            <Lucide icon="Activity" className="h-4 w-4 mr-1" />
            <strong style={{ fontSize: '16px' }}> CREDIT</strong>
          </Button>
          <Button
          onClick={() => handleClick(SlideoverRegistry.suspendButton)}
            className="mb-1 w-[49%] p-2 sm:w-[24%] md:w-[12%] lg:w-[24%]"
            style={{
              backgroundColor: '#49a0e4',
              color: 'white',
            }}
          >
            Suspend
          </Button>
          <Button
            className="mb-1 w-[49%] p-2 sm:w-[24%] md:w-[12%] lg:w-[24%]"
            style={{
              backgroundColor: '#49a0e4',
              color: 'white',
            }}
          >
            Quotation
          </Button>
          <Button
            className="mb-1 w-[49%] p-2 sm:w-[24%] md:w-[12%] lg:w-[24%]"
            style={{
              backgroundColor: '#49a0e4',
              color: 'white',
            }}
          >
            KOT
          </Button>
          <Button
            className="mb-1 w-[49%] p-2 sm:w-[24%] md:w-[12%] lg:w-[24%]"
            style={{
              backgroundColor: '#49a0e4',
              color: 'white',
            }}
          >
            Draft
          </Button>
        </div>
      </div>
    </>
  )
}

export default ActionsBar
