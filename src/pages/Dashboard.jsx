import SubscriptionCard from "../components/Card/SubscriptionCard.jsx";
import StatCard from "../components/Card/StatCard.jsx";

const Dashboard = () => {
    return (
        <>
           {/*Stats overview */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
                {/*Stats*/}
                <StatCard
                    label='Active Subscriptions'
                    value='12'
                />
            </div>
            {/*filter tabs*/}
            <div className='flex items-center space-x-6 mb-6 overflow-x-auto'>
                filter
            </div>
            {/*Subscriptions*/}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                Subscriptions Cards
                <SubscriptionCard />
            </div>
        </>
    )
}

export default Dashboard;