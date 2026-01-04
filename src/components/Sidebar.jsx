import {Link, useLocation} from "react-router-dom";
import {LogOut, User, X} from "lucide-react";

const Sidebar = ({isOpen, setIsOpen, menuItems}) => {
  const location = useLocation();
  return (
      <>
          {isOpen && (
              <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden'
                   onClick={() => setIsOpen(false)}
                   />
          )}

          <aside className={`fixed top-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out h-screen flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-[calc(100vh - 64px)]`}>
                  <div className='p-6 flex items-center justify-between lg:hidden'>
                      <span className='font-bold text-gray-800 text-lg'>Menu</span>
                      <button onClick={() => setIsOpen(false)} className='p-2 hover:bg-green-100 rounded-full'>
                          <X size={20} />
                      </button>
                  </div>
          <nav className='flex-1 px-4 py-6 space-y-2'>
              {menuItems.map((item) => {
                  console.log(location.pathname, item.path)
                  const isActive = location.pathname === item.path;
                  return (
                      <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 p-3 rounded-xl transition-all group ${
                              isActive ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                          }`}
                      >
                          <span className={`${isActive ? 'text-indigo-600' : 'group-hover:text-indigo-600'} group-hover:scale-110 transition-transform`}>
                              {item.icon}
                          </span>
                          <span className='font-medium'>{item.name}</span>
                      </Link>
                  )
              })}
          </nav>
{/*
*/}
          <div className='p-4 border-t border-gray-100'>
              <div className='space-y-1'>
                  <Link to='/profile' className='flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all'>
                      <User size={20} />
                      <span className='font-medium text-sm'>My Profile</span>
                  </Link>
                  <button className='w-full flex items-center space-x-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all'>
                      <LogOut size={20} />
                      <span className='font-medium text-sm'>Logout</span>
                  </button>
              </div>
          </div>
          </aside>
      </>
  )
}

export default Sidebar;