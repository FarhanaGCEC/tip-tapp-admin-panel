import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux'
import Notification from './components/common/notification'
import SharedData from './containers/sharedData'
import Router from './router'
import { store } from './stores/store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ScrollToTop from './utils/scrolltop'
import { ScrollRestoration } from 'react-router-dom'

function Loader() {
  return (
    <div className="App">
      <div>loading...</div>
    </div>
  )
}

function App() {
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
