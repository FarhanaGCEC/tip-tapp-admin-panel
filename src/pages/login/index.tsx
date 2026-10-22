/* eslint-disable no-else-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import brandLogo from '../../assets/images/gcec-cloud-logo.png'
import Button from '../../components/common/button'
import {
  FormCheck,
  FormInput,
} from '../../components/common/form-elements/components'
import Lucide from '../../components/common/lucide'
import Toast from '../../utils/notification'
import SharedDataContainer from '../../containers/sharedData'
import { Icons, NotificationTypes } from '../../constants'
import { useAppDispatch } from '../../stores/hooks'
import { rebuildSideMenu } from '../../stores/sideMenuSlice'
import {
  DEMO_EMAIL,
  DEMO_PASSWORD,
  matchesDemoLogin,
  saveOfflineSession,
} from '../../utils/offlineSession'

const inputClassName = clsx(
  'login__input block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] text-brand-navy shadow-none',
  'placeholder:text-slate-400',
  'transition-colors duration-150',
  'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
)

function Main() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sucessHandlerLogin = (_username: any, message: string) => {
    setNotification({
      title: 'Successfully Login',
      message,
      icon: Icons.CHECKCIRCLE,
      type: NotificationTypes.SUCCESS,
    })
    Toast()
    setIsLoading(false)
    handleSlider()
    setTimeout(() => {
      handleSlider()
      navigate('/')
    }, 800)
  }

  const errorHandler = (error: any) => {
    Toast()
    setNotification({
      title: '',
      message: error || 'Please Check Your Login Credentials.',
      icon: Icons.XCIRCLE,
      type: NotificationTypes.ERROR,
    })
    setIsLoading(false)
  }

  function login() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError('')

    if (!matchesDemoLogin(email, password)) {
      errorHandler('Please Check Your Login Credentials.')
      return
    }

    setIsLoading(true)
    saveOfflineSession()
    dispatch(rebuildSideMenu())
    sucessHandlerLogin(email, 'Successfully Login')
  }

  const UserLogin = async () => {
    setIsLoading(true)
  }
  const onSubmit: SubmitHandler<FieldValues> = () => {
    UserLogin()
  }
  const {
    handleSubmit,
    formState: { errors: _errors },
  } = useForm({
    mode: 'onChange',
  })

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F8FA]">
      <style>{`
        .login__input:-webkit-autofill,
        .login__input:-webkit-autofill:hover,
        .login__input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
          -webkit-text-fill-color: #0A0A0A !important;
          caret-color: #0A0A0A;
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>

      
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_20%,rgba(240,192,20,0.14),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(0,0,0,0.06),transparent_40%)]"
      />

      {/* Brand curved panel — navy dominant */}
      <div
        className={clsx([
          'pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] xl:block',
          "before:absolute before:inset-y-0 before:left-0 before:-mb-[16%] before:-ml-[13%] before:-mt-[28%] before:w-full before:rotate-[-4.5deg] before:rounded-[100%] before:bg-brand-navy/40 before:content-['']",
          "after:absolute after:inset-y-0 after:left-0 after:-mb-[13%] after:-ml-[13%] after:-mt-[20%] after:w-full after:rotate-[-4.5deg] after:rounded-[100%] after:bg-brand-navy after:content-['']",
        ])}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid min-h-screen grid-cols-1 xl:grid-cols-2 xl:gap-8">
          {/* Desktop branding */}
          <div className="hidden min-h-screen flex-col items-center justify-center xl:flex">
            <div className="-translate-x-8 -translate-y-4 transform">
              <img
                alt="GCEC Cloud"
                className="h-auto w-[220px] drop-shadow-2xl xl:w-[260px]"
                src={brandLogo}
              />
            </div>
          </div>

          {/* Login form */}
          <div className="flex min-h-screen items-center justify-center py-10 sm:py-12">
            <div className="w-full max-w-[420px]">
              <div className="mb-8 flex justify-center xl:hidden">
                <img
                  alt="GCEC Cloud"
                  className="h-auto w-28 rounded-2xl shadow-lg sm:w-32"
                  src={brandLogo}
                />
              </div>

              <form
                className="rounded-2xl border border-slate-200/80 bg-white px-6 py-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:px-8 sm:py-9"
                onSubmit={handleSubmit(onSubmit)}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  GCEC Cloud
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy sm:text-[28px]">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Sign in to track cars, drivers, and rentals on Uber, Yango, and Bolt.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Local sign-in: {DEMO_EMAIL} / {DEMO_PASSWORD}
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label
                      htmlFor="login-email"
                      className="mb-1.5 block text-sm font-medium text-brand-navy"
                    >
                      Email
                    </label>
                    <FormInput
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      className={inputClassName}
                      placeholder="you@company.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError ? (
                      <div className="mt-2 text-xs text-primary sm:text-sm">
                        {emailError}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="login-password"
                      className="mb-1.5 block text-sm font-medium text-brand-navy"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <FormInput
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        className={`${inputClassName} pr-12`}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        className="absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400 transition-colors hover:text-brand-navy"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <Lucide
                          icon={showPassword ? 'EyeOff' : 'Eye'}
                          className="h-4 w-4"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center">
                  <FormCheck.Input
                    id="remember-me"
                    type="checkbox"
                    className="mr-2.5 border-slate-300 text-primary focus:ring-primary"
                  />
                  <label
                    className="cursor-pointer select-none text-sm text-slate-600"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>

                <div className="mt-7">
                  <Button
                    variant="primary"
                    type="button"
                    className="w-full rounded-xl bg-primary px-4 py-3.5 text-[15px] font-semibold shadow-md shadow-primary/25 transition hover:bg-brand-red-dark hover:shadow-lg hover:shadow-primary/30"
                    onClick={login}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in…' : 'Login'}
                  </Button>
                </div>
              </form>

              <p className="mt-6 text-center text-xs text-slate-400 sm:text-sm">
                GCEC Cloud © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
