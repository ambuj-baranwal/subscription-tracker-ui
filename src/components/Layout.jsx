import { Link, Outlet } from 'react-router-dom';
import Header from "./Header.jsx";
import {BarChart,CreditCard, Home, Settings} from "lucide-react";
import {useState} from "react";
import Sidebar from "./Sidebar.jsx";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
        { name: "Subscriptions", icon: <CreditCard size={20} />, path: "/subscriptions" },
        { name: "Analytics", icon: <BarChart size={20} />, path: "/analytics" },
        { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    ];
  return (
      <div className='flex flex-col h-screen overflow-hidden'>
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <div className='flex flex-1 overflow-hidden'>
              <Sidebar
                  isOpen={isSidebarOpen}
                  setIsOpen={setIsSidebarOpen}
                  menuItems={menuItems}
              />
          {/*<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>*/}
          <main className='flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-8'>
              <div className='max-w-7xl mx-auto'>
              <Outlet />
              </div>
          </main>
          </div>
      </div>
  )
}

export default Layout;