/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import _ from 'lodash'
import clsx from 'clsx'
import { useState } from 'react'
import Button from '../../components/common/button'
import {
  FormInput,
  FormTextarea,
} from '../../components/common/form-elements/components'
import Lucide from '../../components/common/lucide'
import { Tab } from '../../components/common/headless'
import PreviewImage from '../../assets/images/fakers/image-6.jpg'
import PreviewImageUser from '../../assets/images/fakers/image-4.jpg'
import { ChatApi } from '../../api'

function Main() {
  const [chatBox, setChatBox] = useState(false)
  const [selectedTab, setSelectedTab] = useState(-1)
  const [defaultChatBox, setDefaultChatBox] = useState(true)
  const [chatBoxCRM, setChatBoxCRM] = useState(false)
  const [selectedTabCRM, setSelectedTabCRM] = useState(-1)
  const [defaultChatBoxCRM, setDefaultChatBoxCRM] = useState(true)
  const chatApi = ChatApi.useAPI()
  const [messages, setMessages] = useState([])

  const fetchMessages = async (id: any) => {
    try {
      const response = await chatApi.getMessages(id)
      if (response && response.data) {
        // Assuming your response data contains messages in an array format
        setMessages(response.data) // Update state with received messages
      }
    } catch (error) {
      // console.error('Error fetching messages:', error);
      // Handle error
    }
  }
  const sendMessage = async (messageData: any) => {
    try {
      const response = await chatApi.sendMessage(messageData)
      // Handle success response
    } catch (error) {
      // Handle error
    }
  }

  const showChatBox = () => {
    setChatBox(!chatBox)
  }
  const showChatBoxCRM = () => {
    setChatBoxCRM(!chatBox)
  }

  const startNewChat = () => {
    setChatBox(false)
    setDefaultChatBox(true)
    setSelectedTab(-1)
  }
  const startNewChatCRM = () => {
    setChatBoxCRM(false)
    setDefaultChatBoxCRM(true)
    setSelectedTabCRM(-1)
  }

  return (
    <Tab.Group>
      <div className="intro-y mt-6 flex justify-center">
        <Tab.List
          variant="pills"
          className="box mx-auto w-auto overflow-hidden rounded-full"
        >
          <Tab>
            <Tab.Button
              className="w-54 rounded-none py-2 lg:w-64 lg:py-3"
              as="button"
            >
              CRM
            </Tab.Button>
          </Tab>
          <Tab>
            <Tab.Button
              className="w-54 rounded-none py-2 lg:w-64 lg:py-3"
              as="button"
            >
              Data Analysis
            </Tab.Button>
          </Tab>
        </Tab.List>
      </div>
      <Tab.Panels className="pb-5">
        {/* CRM */}
        <Tab.Panel className="mt-5">
          <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="ml-2 mr-auto text-lg font-medium">
              <h2 className="mr-auto text-lg font-medium">CRM Chat Bot</h2>
            </h2>
            <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
              <Button
                variant="primary"
                className="mr-2 shadow-md"
                onClick={startNewChatCRM}
              >
                Start New Chat
              </Button>
              <Button
                variant="primary"
                className=" px-2 "
                onClick={startNewChatCRM}
              >
                <span className="flex h-5 w-5 items-center justify-center">
                  <Lucide icon="Plus" className="h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>
          <div className="intro-y mt-5 grid grid-cols-12 gap-5">
            <Tab.Group className="col-span-12 lg:col-span-4 2xl:col-span-3">
              <Tab.Panel>
                <div className="pr-1">
                  <div className="box px-5 pb-5 pt-5 lg:pb-0">
                    <div className="relative text-slate-500">
                      <FormInput
                        type="text"
                        className="border-transparent bg-slate-100 px-4 py-3 pr-10"
                        placeholder="Search for Chats..."
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-3 h-5 w-5"
                      />
                    </div>
                    <div className="scrollbar-hidden overflow-x-auto">
                      <div className="mt-5 flex" />
                    </div>
                  </div>
                </div>
                <div className=" h-[440px] overflow-y-auto pr-1">
                  <div
                    className={clsx({
                      'intro-x box relative mt-3 flex cursor-pointer items-center p-5':
                        true,
                      'bg-primary text-white': selectedTabCRM === 0,
                    })}
                    onClick={() => {
                      showChatBoxCRM()
                      setSelectedTabCRM(selectedTabCRM === 0 ? -1 : 0)
                    }}
                  >
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="#" className="font-medium">
                          Chat History will Display Here ....
                        </a>
                      </div>
                      <div className="ml-auto mt-1 text-xs text-slate-400">
                        2023.09.17
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Group>
            <div className="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
              <div className="box h-[530px]">
                {selectedTabCRM !== -1 && (
                  <div className="flex h-full flex-col">
                    <div className="flex flex-col border-b border-slate-200/60 px-5 py-4 dark:border-darkmode-400 sm:flex-row">
                      <div className="flex items-center">
                        <div className="image-fit relative h-10 w-10 flex-none sm:h-12 sm:w-12">
                          <img
                            alt="Img"
                            className="rounded-full"
                            src={PreviewImage}
                          />
                        </div>
                        <div className="ml-3 mr-auto">
                          <div className="text-base font-medium">
                            Storemate AI
                          </div>
                        </div>
                      </div>
                      <div className="-mx-5 mt-5 flex items-center border-t border-slate-200/60 px-5 pt-3 sm:mx-0 sm:ml-auto sm:mt-0 sm:border-0 sm:px-0 sm:pt-0">
                        <a href="#" className="h-5 w-5 text-slate-500">
                          <Lucide icon="Search" className="h-5 w-5" />
                        </a>
                        <a href="#" className="ml-5 h-5 w-5 text-slate-500">
                          <Lucide icon="Trash2" className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                    <div className="scrollbar-hidden flex-1 overflow-y-scroll px-5 pt-5">
                      <div className="float-right mb-4 flex max-w-[90%] items-end sm:max-w-[49%]">
                        <div className="rounded-l-md rounded-t-md bg-primary px-4 py-3 text-white">
                          How To find Register Report Section
                          <div className="mt-1 text-xs text-white text-opacity-80">
                            59 secs ago
                          </div>
                        </div>
                        <div className="image-fit relative ml-5 hidden h-10 w-10 flex-none sm:block">
                          <img
                            alt="Img"
                            className="rounded-full"
                            src={PreviewImageUser}
                          />
                        </div>
                      </div>
                      <div className="clear-both" />
                      <div className="clear-both" />
                      <div className="float-left mb-4 flex max-w-[90%] items-end sm:max-w-[49%]">
                        <div className="image-fit relative mr-5 hidden h-10 w-10 flex-none sm:block">
                          <img
                            alt="Img"
                            className="rounded-full"
                            src={PreviewImage}
                          />
                        </div>
                        <div className="rounded-r-md rounded-t-md bg-slate-100 px-4 py-3 text-slate-500 dark:bg-darkmode-400">
                          Select Report Section from Side bar. Then Select
                          Perminary. Now You can find Register Report
                          <div className="mt-1 text-xs text-slate-500">
                            2 mins ago
                          </div>
                        </div>
                      </div>
                      <div className="clear-both" />
                      <div className="clear-both" />
                    </div>
                    <div className="flex items-center border-t border-slate-200/60 pb-10 pt-4 dark:border-darkmode-400 sm:py-4">
                      <FormTextarea
                        className="mt-1 h-[64px] resize-none border-transparent px-5 py-3 text-base shadow-none focus:border-transparent focus:ring-0 dark:bg-darkmode-600" // Change text-lg to text-base
                        rows={1}
                        placeholder="Type your message..."
                      />
                      <a
                        href="#"
                        className="mr-5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-white sm:h-8 sm:w-8"
                      >
                        <Lucide icon="Send" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
                {selectedTabCRM === -1 && defaultChatBoxCRM && (
                  <div className="flex h-full flex-col">
                    <div className="flex h-full items-center">
                      <div className="mx-auto text-center">
                        <div className="image-fit mx-auto h-16 w-16 flex-none overflow-hidden rounded-full">
                          <img alt="SM" src={PreviewImageUser} />
                        </div>
                        <div className="mt-3">
                          <div className="font-medium">Hey, @UserName!</div>
                          <div className="mt-1 text-slate-500">
                            How Can I Help You ?
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="mb-10 ml-4 mr-4 grid items-center gap-4 sm:grid-cols-1 md:grid-cols-2">
                        <a href="">
                          <div
                            className="intro-y box border-2 border-primary py-5 dark:border-primary"
                            style={{ maxWidth: '400px' }}
                          >
                            <div className="ml-4 mt-1 overflow-hidden text-base font-medium">
                              <div className="truncate">
                                How to Generate Invoice layout
                              </div>
                            </div>
                            <div className="ml-4 mt-1 overflow-hidden text-base text-slate-500">
                              <div className="truncate">
                                To Generate Invoice Layout, you need to Go to
                                Invoice Layout
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href="">
                          <div
                            className="intro-y box border-2 border-primary py-5 dark:border-primary"
                            style={{ maxWidth: '400px' }}
                          >
                            <div className="ml-4 mt-1 overflow-hidden text-base font-medium">
                              <div className="truncate">
                                I need To Subscribe Basic package from your
                                System. how to
                              </div>
                            </div>
                            <div className="ml-4 mt-1 overflow-hidden text-base text-slate-500">
                              <div className="truncate">
                                To Subscribe Invoice layout, You need to Go to
                                Subscription Packages
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="ml-2 mr-2 flex items-center border-t border-slate-200/60 pb-10 pt-4 dark:border-darkmode-400 sm:py-4">
                      <FormTextarea
                        className="mt-1 h-[64px] resize-none border-transparent px-5 py-3 text-base shadow-none focus:border-transparent focus:ring-0 dark:bg-darkmode-600" // Change text-lg to text-base
                        rows={1}
                        placeholder="Type your message..."
                      />
                      <a
                        href="#"
                        className="mr-5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-white sm:h-8 sm:w-8"
                      >
                        <Lucide icon="Send" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Tab.Panel>
        {/* Data Analysis */}
        <Tab.Panel className="mt-5">
          <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="ml-2 mr-auto text-lg font-medium">
              <h2 className="mr-auto text-lg font-medium">
                Data Analysis Chat Bot
              </h2>
            </h2>
            <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
              <Button
                variant="primary"
                className="mr-2 shadow-md"
                onClick={startNewChat}
              >
                Start New Chat
              </Button>
              <Button
                variant="primary"
                className=" px-2 "
                onClick={startNewChat}
              >
                <span className="flex h-5 w-5 items-center justify-center">
                  <Lucide icon="Plus" className="h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>
          <div className="intro-y mt-5 grid grid-cols-12 gap-5">
            <Tab.Group className="col-span-12 lg:col-span-4 2xl:col-span-3">
              <Tab.Panel>
                <div className="pr-1">
                  <div className="box px-5 pb-5 pt-5 lg:pb-0">
                    <div className="relative text-slate-500">
                      <FormInput
                        type="text"
                        className="border-transparent bg-slate-100 px-4 py-3 pr-10"
                        placeholder="Search for Chats..."
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-3 h-5 w-5"
                      />
                    </div>
                    <div className="scrollbar-hidden overflow-x-auto">
                      <div className="mt-5 flex" />
                    </div>
                  </div>
                </div>
                <div className=" h-[440px] overflow-y-auto pr-1">
                  <div
                    className={clsx({
                      'intro-x box relative mt-3 flex cursor-pointer items-center p-5':
                        true,
                      'bg-primary text-white': selectedTab === 0,
                    })}
                    onClick={() => {
                      showChatBox()
                      setSelectedTab(selectedTab === 0 ? -1 : 0)
                    }}
                  >
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="#" className="font-medium">
                          Chat History will Display Here ....
                        </a>
                      </div>
                      <div className="ml-auto mt-1 text-xs text-slate-400">
                        2023.09.17
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Group>
            <div className="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
              <div className="box h-[530px]">
                {selectedTab !== -1 && (
                  <div className="flex h-full flex-col">
                    <div className="flex flex-col border-b border-slate-200/60 px-5 py-4 dark:border-darkmode-400 sm:flex-row">
                      <div className="flex items-center">
                        <div className="image-fit relative h-10 w-10 flex-none sm:h-12 sm:w-12">
                          <img
                            alt="Img"
                            className="rounded-full"
                            src={PreviewImage}
                          />
                        </div>
                        <div className="ml-3 mr-auto">
                          <div className="text-base font-medium">
                            Tipapp AI
                          </div>
                        </div>
                      </div>
                      <div className="-mx-5 mt-5 flex items-center border-t border-slate-200/60 px-5 pt-3 sm:mx-0 sm:ml-auto sm:mt-0 sm:border-0 sm:px-0 sm:pt-0">
                        <a href="#" className="h-5 w-5 text-slate-500">
                          <Lucide icon="Search" className="h-5 w-5" />
                        </a>
                        <a href="#" className="ml-5 h-5 w-5 text-slate-500">
                          <Lucide icon="Trash2" className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                    <div className="scrollbar-hidden flex-1 overflow-y-scroll px-5 pt-5">
                      <div className="float-right mb-4 flex max-w-[90%] items-end sm:max-w-[49%]">
                        <div className="rounded-l-md rounded-t-md bg-primary px-4 py-3 text-white">
                          How To find Register Report Section
                          <div className="mt-1 text-xs text-white text-opacity-80">
                            59 secs ago
                          </div>
                        </div>
                        <div className="image-fit relative ml-5 hidden h-10 w-10 flex-none sm:block">
                          <img
                            alt="Img"
                            className="rounded-full"
                            src={PreviewImageUser}
                          />
                        </div>
                      </div>
                      <div className="clear-both" />
                      <div className="clear-both" />
                      <div className="float-left mb-4 flex max-w-[90%] items-end sm:max-w-[49%]">
                        <div className="image-fit relative mr-5 hidden h-10 w-10 flex-none sm:block">
                          <img
                            alt="Img"
                            className="rounded-full"
                            src={PreviewImage}
                          />
                        </div>
                        <div className="rounded-r-md rounded-t-md bg-slate-100 px-4 py-3 text-slate-500 dark:bg-darkmode-400">
                          Select Report Section from Side bar. Then Select
                          Perminary. Now You can find Register Report
                          <div className="mt-1 text-xs text-slate-500">
                            2 mins ago
                          </div>
                        </div>
                      </div>
                      <div className="clear-both" />
                      <div className="clear-both" />
                    </div>
                    <div className="flex items-center border-t border-slate-200/60 pb-10 pt-4 dark:border-darkmode-400 sm:py-4">
                      <FormTextarea
                        className="mt-1 h-[64px] resize-none border-transparent px-5 py-3 text-base shadow-none focus:border-transparent focus:ring-0 dark:bg-darkmode-600" // Change text-lg to text-base
                        rows={1}
                        placeholder="Type your message..."
                      />
                      <a
                        href="#"
                        className="mr-5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-white sm:h-8 sm:w-8"
                      >
                        <Lucide icon="Send" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
                {selectedTab === -1 && defaultChatBox && (
                  <div className="flex h-full flex-col">
                    <div className="flex h-full items-center">
                      <div className="mx-auto text-center">
                        <div className="image-fit mx-auto h-16 w-16 flex-none overflow-hidden rounded-full">
                          <img alt="SM" src={PreviewImageUser} />
                        </div>
                        <div className="mt-3">
                          <div className="font-medium">Hey, @UserName!</div>
                          <div className="mt-1 text-slate-500">
                            How Can I Help You ?
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="mb-10 ml-4 mr-4 grid items-center gap-4 sm:grid-cols-1 md:grid-cols-2">
                        <a href="">
                          <div
                            className="intro-y box border-2 border-primary py-5 dark:border-primary"
                            style={{ maxWidth: '400px' }}
                          >
                            <div className="ml-4 mt-1 overflow-hidden text-base font-medium">
                              <div className="truncate">
                                How to Generate Invoice layout
                              </div>
                            </div>
                            <div className="ml-4 mt-1 overflow-hidden text-base text-slate-500">
                              <div className="truncate">
                                To Generate Invoice Layout, you need to Go to
                                Invoice Layout
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href="">
                          <div
                            className="intro-y box border-2 border-primary py-5 dark:border-primary"
                            style={{ maxWidth: '400px' }}
                          >
                            <div className="ml-4 mt-1 overflow-hidden text-base font-medium">
                              <div className="truncate">
                                I need To Subscribe Basic package from your
                                System. how to
                              </div>
                            </div>
                            <div className="ml-4 mt-1 overflow-hidden text-base text-slate-500">
                              <div className="truncate">
                                To Subscribe Invoice layout, You need to Go to
                                Subscription Packages
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="ml-2 mr-2 flex items-center border-t border-slate-200/60 pb-10 pt-4 dark:border-darkmode-400 sm:py-4">
                      <FormTextarea
                        className="mt-1 h-[64px] resize-none border-transparent px-5 py-3 text-base shadow-none focus:border-transparent focus:ring-0 dark:bg-darkmode-600" // Change text-lg to text-base
                        rows={1}
                        placeholder="Type your message..."
                      />
                      <a
                        href="#"
                        className="mr-5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-white sm:h-8 sm:w-8"
                      >
                        <Lucide icon="Send" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Main
