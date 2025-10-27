import { Suspense, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Notification from './components/common/notification'
import SharedData from './containers/sharedData'
import Router from './router'
import { store } from './stores/store'
import ScrollToTop from './utils/scrolltop'

function Loader() {
  return (
    <div className="App">
      <div>loading...</div>
    </div>
  )
}

function App() {
  useEffect(() => {
    // Only clear localStorage if user is on login page and there's no valid token
    const currentPath = window.location.pathname
    const token = localStorage.getItem('jwtToken')

    // Only clear localStorage if we're on login page AND there's no valid token
    if (currentPath === '/login' && !token) {
      // Clear only specific auth-related items instead of entire localStorage
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('validationToken')
      localStorage.removeItem('user')
      localStorage.removeItem('userType')
      localStorage.removeItem('userId')
      localStorage.removeItem('email')
      localStorage.removeItem('notification_token')
      localStorage.removeItem('userEmail')
    }
  }, [])

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Provider store={store}>
          <SharedData.Provider>
            <QueryClientProvider client={new QueryClient()}>
              <ScrollToTop />
              <Router />
              <ReactQueryDevtools initialIsOpen={false} />
              <Notification options={{}} getRef={() => {}} />
            </QueryClientProvider>
          </SharedData.Provider>
        </Provider>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
