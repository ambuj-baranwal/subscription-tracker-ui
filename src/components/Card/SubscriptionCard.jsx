import {
    Dumbbell,
    Newspaper,
    Film,
    Heart,
    Cpu,
    Landmark,
    Vote,
    Package,
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import SubscriptionActions from "../SubscriptionActions.jsx";

const categoryIconMap = {
    sports: Dumbbell,
    news: Newspaper,
    entertainment: Film,
    lifestyle: Heart,
    technology: Cpu,
    finance: Landmark,
    politics: Vote,
    other: Package
};

const SubscriptionCard = (
    {subscription, onEdit, onCancel, onDelete}
) => {
    const Icon = categoryIconMap[subscription.category] || Package;
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/subscriptions/${subscription.id}`)}
            className='bg-white cursor-pointer rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:scale-[1.01]'
        >
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center space-x-3'>
                    <div className='p-2 rounded-lg bg-purple-100 text-purple-700'>
                        <Icon size={24} />
                    </div>
                </div>
                <div>
                    <h3 className='font-semibold text-gray-900'>{subscription.name}</h3>
                    <span className='inline-block px-2 py-1.5 bg-purple-100 text-purple-700 text-xs rounded-full mt-1'>{subscription.category}</span>
                </div>

                <SubscriptionActions
                    onEdit={() => onEdit(subscription)}
                    onCancel={() => onCancel(subscription.id)}
                    onDelete={() => onDelete(subscription.id)}
                />
            </div>
            <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>Cost</span>
                    <span className='text-lg font-semibold text-gray-900'>
                       {subscription.currency} {subscription.price}
                        <span className="text-xs text-gray-500 uppercase">
                            {' ' + subscription.frequency}
                        </span>

                    </span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>Next Payment</span>
                    <span className='text-lg font-semibold text-gray-900'>
                        {new Date(subscription.renewalDate).toLocaleDateString()}
                    </span>
                </div>
                <div className='flex items-center space-x-2 mt-4'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    {/*for subscriptions with no reminders*/}
                    {/*<div className='w-2 h-2 bg-yellow-500 rounded-full'></div>*/}
                    <span className='text-sm text-gray-600'>
                        Status: {subscription.status}
                    </span>
                    <span className='text-xs text-gray-600'>Reminder set for x days before</span>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionCard;