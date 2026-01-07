import { ShoppingCart } from 'lucide-react';
const StatCard = ({label, value, Icon, colorClass = 'bg-purple-100'}) => {

  return (
      <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-transform duration-150 hover:scale-[1.02]'>
          <div className='flex items-center justify-between'>
              <div>
                  {/*<p className='text-sm text-gray-600'>Active Subscriptions ( Name )</p>*/}
                  <p className='text-sm text-gray-600'>{label}</p>
                  {/*<p className='text-2xl font-bold text-gray-900 mt-1'>Active Subscriptions ( Value )</p>*/}
                  <p className='text-2xl font-bold text-gray-900 mt-1'>{value}</p>
              </div>
              <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center p-1`}>
              {/*<div className={`w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center p-1 dark:bg-purple-800`}>*/}
                  {Icon ? <Icon className='w-6 h-6' /> : <ShoppingCart />}
              </div>
          </div>
      </div>
  )
}

export default StatCard;