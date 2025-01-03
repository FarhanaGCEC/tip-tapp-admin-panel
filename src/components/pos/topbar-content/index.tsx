/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import PreviewImage from '../../../assets/images/fakers/preview-1.jpg'
import DarkModeSwitch from '../../common/dark-mode-switch'
import { SelectElement } from '../../common/form-elements'
import Button from '../../common/button'
import ShortcutKeyCode from '../../common/shortcut-key/shortcut-key-code'
import { Menu, Popover } from '../../common/headless'
import Lucide from '../../common/lucide'
import Tippy from '../../common/tippy'
// import SlideoverRegistry from './slideover-registry'
// import SharedDataContainer from '../../../containers/sharedData'
// import SlideoverPanel from "../../slideover-panel"
// import ShortcutKey from '../../common/shortcut-key'

// interface FormContent {
//   title: string
//   component: JSX.Element
// }

// interface Props {
//   setSliderContent: React.Dispatch<React.SetStateAction<any>>
// }

function getCurrentDate() {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  return `${day}/${month}/${year}`
}
function TopbarContent() {
  const { register } = useForm()
  const [tooltipContent1] = useState('View Suspend Sales')
  const [tooltipContent2] = useState('Stock Report')
  const [tooltipContent3] = useState('Press F11 to Full Screen')
  const [tooltipContent4] = useState('Open Cash Drawer')
  const [tooltipContent5] = useState('Calculator')
  const [tooltipContent6] = useState('Register Details')
  const [tooltipContent7] = useState('Close Register')
  const [tooltipContent8] = useState('Go Back')

  // const { handleSlider } = SharedDataContainer.useContainer()
  // const handleChange = () => {}

  // const [sliderSize, setSliderSize] = useState('xl')

  // const [sliderContent, setSliderContent] = useState({
  //   header: '',
  //   children: <div />,
  //   footer: <div />,
  // })
  // const handleClick = ({ title, component }: FormContent) => {
  //   handleSlider()
  //   setSliderContent({
  //     header: title,
  //     children: component,
  //     footer: <div />,
  //   })
  //   setSliderSize('xl')
  // }

  // const handleKeyUp = (keyName: string) => {
  //   if (keyName === 'alt+s') {
  //     handleClick(SlideoverRegistry.customer)
  //   }
  // }
  /* TODO - Responsive */ 
  return (
    <>
      <div className="flex items-center space-x-2">
        <DarkModeSwitch />
        <SelectElement register={register} name="location" id="location" />
        <p className="font-small whitespace-nowrap border-b-0">
          {getCurrentDate()}
        </p>
        <p className="font-small whitespace-nowrap border-b-0">|</p>
        <p className="font-small whitespace-nowrap border-b-0">
          {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
        </p>
        <ShortcutKeyCode />
      </div>
      <div className="flex items-center space-x-2">
        <p className="whitespace-nowrap border-b-0 text-3xl font-black">
          TIPAPP
        </p>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Popover className="intro-x mr-4 sm:mr-2">
          <Popover.Button
            className=" 
              relative block
              before:absolute before:right-0 before:top-[-2px] before:h-[8px] before:w-[8px] before:rounded-full before:bg-danger before:content-['']
              zoom-in  items-center   "
          >
            <Lucide icon="Bell" className=" h-5 w-5 dark:text-slate-500 " />
          </Popover.Button>
          <Popover.Panel className="mt-2 w-[280px] p-5 sm:w-[350px]">
            <div className="mb-5 font-medium">Notifications</div>
            <div className="ml-2 overflow-hidden">
            <div className="mt-0.5 w-full truncate text-slate-500"></div>
            </div>
          </Popover.Panel>
        </Popover>

        <Menu>
          <Menu.Button
            as={Button}
            variant="primary"
            size="sm"
            className="mr-2 w-24 "
          >
            Actions <Lucide icon="ChevronDown" className="ml-1 h-4 w-4" />
          </Menu.Button>
          <Menu.Items className="w-48 ">
            <Menu.Item>
              <Lucide icon="AlertCircle" className="mr-2 h-4 w-4" /> Due Sales
            </Menu.Item>

            <Menu.Item
          >
              <Lucide icon="MinusCircle" className="mr-2 h-4 w-4" /> Expense
            </Menu.Item>
            <Menu.Item>
              <Lucide icon="RotateCcw" className="mr-2 h-4 w-4" /> Return Sales
            </Menu.Item>
            <Menu.Item>
              <Lucide icon="Coffee" className="mr-2 h-4 w-4" /> Kitchen
            </Menu.Item>
            <Menu.Item>
              <Lucide icon="Repeat" className="mr-2 h-4 w-4" /> Non-Receipt
              Return
            </Menu.Item>
            <Menu.Item>
              <Lucide icon="Settings" className="mr-2 h-4 w-4" /> Repair
            </Menu.Item>
            <Menu.Item>
              <Lucide icon="Clock" className="mr-2 h-4 w-4" /> Recent
              Transaction
            </Menu.Item>
          </Menu.Items>
        </Menu>
        {/* onClick={() => handleClick(SlideoverRegistry.suspendSales)} */}
        <Button
          variant="linkedin"
          className="zoom-in flex h-8 w-8 items-center justify-center overflow-hidden rounded-full shadow-lg"
        >
          <Tippy content={tooltipContent1}>
            {' '}
            <a>
              {' '}
              <Lucide icon="Pause" className="h-5 w-5" />{' '}
            </a>{' '}
          </Tippy>
        </Button>
        <Button
         
          variant="linkedin"
          className=" zoom-in hadow-lg flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
        >
          <Tippy content={tooltipContent2}>
            {' '}
            <a>
              {' '}
              <Lucide icon="Layers" className="h-5 w-5" />{' '}
            </a>{' '}
          </Tippy>
        </Button>
        <Button
          variant="linkedin"
          className=" zoom-in hadow-lg flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
        >
          <Tippy content={tooltipContent3}>
            {' '}
            <a>
              {' '}
              <Lucide icon="Maximize" className="h-5 w-5" />{' '}
            </a>{' '}
          </Tippy>
        </Button>
        <Button
          variant="linkedin"
          className=" zoom-in hadow-lg flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
        >
          <Tippy content={tooltipContent4}>
            {' '}
            <a>
              {' '}
              <Lucide icon="Server" className="h-5 w-5" />{' '}
            </a>{' '}
          </Tippy>
        </Button>
        <Button
          variant="linkedin"
          className=" zoom-in hadow-lg flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
        >
          <Tippy content={tooltipContent5}>
            {' '}
            <a>
              {' '}
              <Lucide icon="Calculator" className="h-5 w-5" />{' '}
            </a>{' '}
          </Tippy>
        </Button>
        <Button
          variant="linkedin"
          className=" zoom-in hadow-lg flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
        >
          <Tippy content={tooltipContent6}>
            {' '}
            <a>
              {' '}
              <Lucide icon="Briefcase" className="h-5 w-5" />{' '}
            </a>{' '}
          </Tippy>
        </Button>
        <Button
          variant="linkedin"
          className=" zoom-in hadow-lg flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
        >
          <Tippy content={tooltipContent7}>
            {' '}
            <a>
              {' '}
              <Lucide icon="X" className="h-5 w-5" />{' '}
            </a>{' '}
          </Tippy>
        </Button>
        <Button
          as='a'
          href='/dashboard'
          variant="linkedin"
          className=" zoom-in hadow-lg flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
        >
          <Tippy content={tooltipContent8}>
            {' '}
            <a>
              {' '}
              <Lucide icon="ArrowLeftCircle" className="h-5 w-5" />{' '}
            </a>{' '}
          </Tippy>
        </Button>

        {/* <Button className="image-fit zoom-in intro-x block h-8 w-8 overflow-hidden rounded-full shadow-lg">
          <img alt="Profile" className="left-0" src={PreviewImage} />
        </Button> */}
        <p className="whitespace-nowrap border-b-0 font-medium">
          J.K.L Attanayaka
        </p>
        <Menu>
            <Menu.Button className="block w-8 h-8 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x">
              <img
                alt="Midone Tailwind HTML Admin Template"
                src={PreviewImage}
              />
              
            </Menu.Button>
            <Menu.Items className="w-56 mt-px relative  before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] ">
              <Menu.Header className="font-normal">
                <div className="font-medium">J.K.L Attanayake</div>
                <div className="text-xs /70 mt-0.5 dark:text-slate-500">
                 Parallax (PVT) LTD
                </div>
              </Menu.Header>
              <Menu.Devider  />
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
              </Menu.Item>
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
              </Menu.Item>
              <Menu.Devider />
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
              </Menu.Item>
            </Menu.Items>
          </Menu>
        {/* <Button className="image-fit zoom-in intro-x block h-8 w-8 overflow-hidden rounded-full shadow-lg">
          <img alt="Profile" className="left-0" src={PreviewImage} />
        </Button> */}
        {/* <ShortcutKey onKeyUp={handleKeyUp} />
      <SlideoverPanel
        close
        size={sliderSize}
        heading={sliderContent.header}
        footer={sliderContent.footer}
      >
        {sliderContent.children}
      </SlideoverPanel> */}
      </div>
    </>
  )
}

export default TopbarContent
