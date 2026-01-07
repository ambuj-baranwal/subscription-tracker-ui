import SubscriptionCard from "../components/Card/SubscriptionCard.jsx";
import StatCard from "../components/Card/StatCard.jsx";
import { useSubscription } from "../hooks/useSubscription";
import {
    CreditCard,
    CalendarClock,
    Layers
} from "lucide-react";

const Dashboard = () => {
    const { subscriptions = [], isLoading } = useSubscription();

    const activeCount = subscriptions.filter(
        s => s.status === "active"
    ).length;

    const totalCount = subscriptions.length;

    const upcomingRenewals = subscriptions.filter(s => {
        if (!s.renewalDate) return false;
        const daysLeft =
            (new Date(s.renewalDate) - Date.now()) / (1000 * 60 * 60 * 24);
        return daysLeft <= 7;
    }).length;

    const frequencyMultiplier = {
        daily: 30,
        weekly: 4,
        monthly: 1,
        quarterly: 1 / 3,
        halfYearly: 1 / 6,
        yearly: 1 / 12
    };

    const monthlySpend = subscriptions
        .filter(s => s.status === "active")
        .reduce((sum, s) => {
            const multiplier = frequencyMultiplier[s.frequency] ?? 1;
            return sum + s.price * multiplier;
        }, 0);

    return (
        <>
           {/*Stats overview */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
                {/*Stats*/}
                <StatCard
                    label="Active Subscriptions"
                    value={activeCount}
                    Icon={Layers}
                    colorClass="bg-green-100"
                />

                <StatCard
                    label="Monthly Spend (Est.)"
                    value={`₹ ${monthlySpend.toFixed(0)}`}
                    Icon={CreditCard}
                    colorClass="bg-purple-100"
                />

                <StatCard
                    label="Upcoming Renewals"
                    value={upcomingRenewals}
                    Icon={CalendarClock}
                    colorClass="bg-yellow-100"
                />

                <StatCard
                    label="Total Subscriptions"
                    value={totalCount}
                />
            </div>
            {/*filter tabs*/}
            <div className='flex items-center space-x-6 mb-6 overflow-x-auto'>
                filter
            </div>
            {/*Subscriptions*/}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                Subscriptions Cards
                {/*<SubscriptionCard />*/}
            </div>
        </>
    )
}

export default Dashboard;