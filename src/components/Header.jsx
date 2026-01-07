import {Link, useNavigate} from "react-router-dom";
import {Bell, CalendarCheck, Menu, Plus} from "lucide-react";
import {useState} from "react";
import {useAuth} from "../hooks/useAuth.js";

const Header = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
  return (
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
             {/*remove max-w-7xl later*/}
         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
             <div className='flex items-center justify-between h-16'>
                 <div className='flex items-center space-x-4'>
                     <button
                         onClick={onMenuClick}
                         className='p-2 rounded-md text-gray-600 lg:hidden hover:bg-green-100'
                     >
                         <Menu />
                     </button>
                 </div>
             <h1 className='text-xl font-semibold text-gray-900 flex items-center space-x-3'>
                 <CalendarCheck className='text-indigo-600' />
                 <Link to='/dashboard'>Sub Track</Link>
             </h1>
             <div className='flex items-center space-x-4'>
                     <Bell className='text-gray-500 cursor-pointer hover:text-indigo-600 transition-colors' />
                 {/*<button className='relative p-2 text-gray-600 hover:text-gray-900 transition-colors'>*/}
                 {/*</button>*/}
                 <Link to='/add-subscription' className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2'>
                     <Plus size={18} />
                     <span className='hidden sm:inline'>Add Subscription</span>
                 </Link>
             </div>
             </div>
         </div>
      </header>

  )
}

export default Header;