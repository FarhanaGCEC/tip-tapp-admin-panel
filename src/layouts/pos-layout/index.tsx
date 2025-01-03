import { Outlet } from 'react-router-dom'
import TopBar from '../../components/top-bar-pos'
import { TopbarContent } from '../../components/pos'

function PosLayout() {
  return (
    <div className="py-2">
      <div className="mt-[4.7rem] flex md:mt-0">
        <div className="md:max-w-auto min-h-[calc(100vh-40px)] min-w-0 max-w-full flex-1 rounded-[30px] bg-slate-100 px-4 pb-10 before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px] lg:h-[calc(100vh-40px)]">
          <TopBar>
            <TopbarContent />
          </TopBar>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PosLayout
