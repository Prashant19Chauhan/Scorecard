import { Outlet } from 'react-router-dom';
import './layout.scss'
import Sidebar from '../sidebar/sidebar'

function layout(userid) {
  return (
    <div className='layout'>
        <div className='sidebarLayout'>
            <Sidebar userid={userid}/>
        </div>
        <div className='screenLayout'>
            <Outlet/>
        </div>
    </div>
  )
}

export default layout
