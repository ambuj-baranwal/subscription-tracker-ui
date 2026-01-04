import {EllipsisVertical} from "lucide-react";

const SubscriptionCard = () => {
    return (
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center space-x-3'>
                    <span className='text-2xl'>Icon</span>
                </div>
                <div>
                    <h3 className='font-semibold text-gray-900'>Name</h3>
                    <span className='inline-block px-2 py-1.5 bg-purple-100 text-purple-700 text-xs rounded-full mt-1'>Category</span>
                </div>
                <div className='relative'>
                    <button className='text-gray-400 hover:text-gray-600'>
                        <EllipsisVertical />
                    </button>
                </div>
            </div>
            <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>Cost</span>
                    <span className='text-lg font-semibold text-gray-900'>subscription cost</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>Next Payment</span>
                    <span className='text-lg font-semibold text-gray-900'>Date</span>
                </div>
                <div className='flex items-center space-x-2 mt-4'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    {/*for subscriptions with no reminders*/}
                    {/*<div className='w-2 h-2 bg-yellow-500 rounded-full'></div>*/}
                    <span className='text-xs text-gray-600'>Reminder set for x days before</span>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionCard;