import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell,
    BarChart, Bar, CartesianGrid, Legend
} from "recharts";
import { useSubscription } from "../hooks/useSubscription.js";
import dayjs from "dayjs";
import {useReminder} from "../hooks/useReminder.js";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed"];

const Analytics = () => {
    const { subscriptions, isLoading } = useSubscription();
    const { reminders, isLoading: remindersLoading } = useReminder()

    if (isLoading || remindersLoading) {
        return <div className="p-6">Loading analytics...</div>;
    }

    /* ---------------------------
       1️⃣ Monthly Spend
    ---------------------------- */
    const monthlySpendMap = {};
    subscriptions.forEach(sub => {
        const month = dayjs(sub.startDate).format("MMM YYYY");
        monthlySpendMap[month] =
            (monthlySpendMap[month] || 0) + Number(sub.price || 0);
    });

    const monthlySpendData = Object.entries(monthlySpendMap).map(
        ([month, total]) => ({ month, total })
    );

    /* ---------------------------
       2️⃣ Category Distribution
    ---------------------------- */
    const categoryMap = {};
    subscriptions.forEach(sub => {
        categoryMap[sub.category] =
            (categoryMap[sub.category] || 0) + 1;
    });

    const categoryData = Object.entries(categoryMap).map(
        ([name, value]) => ({ name, value })
    );

    /* ---------------------------
       3️⃣ Status Distribution
    ---------------------------- */
    const statusMap = {};
    subscriptions.forEach(sub => {
        statusMap[sub.status] =
            (statusMap[sub.status] || 0) + 1;
    });

    const statusData = Object.entries(statusMap).map(
        ([status, count]) => ({ status, count })
    );

    /* ---------------------------
       4️⃣ Upcoming Renewals (30 days)
    ---------------------------- */
    const upcomingRenewals = (reminders || [])
        .filter(reminder => {
            if (!reminder.enabled || !reminder.sendAt) return false;

            const daysLeft = dayjs(reminder.sendAt).diff(dayjs(), "day");
            return daysLeft >= 0 && daysLeft <= 30;
        })
        .sort((a, b) =>
            dayjs(a.sendAt).diff(dayjs(b.sendAt))
        );

    return (
        <div className="p-6 space-y-10">
            <h1 className="text-2xl font-bold">Analytics</h1>

            {/* Monthly Spend */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-4">Monthly Spend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlySpendData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#2563eb"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Category + Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Pie */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="font-semibold mb-4">
                        Subscriptions by Category
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                                label
                            >
                                {categoryData.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Status Bar */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="font-semibold mb-4">
                        Subscriptions by Status
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={statusData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#2563eb" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Upcoming Renewals */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-semibold mb-4">
                    Upcoming Renewals (Next 30 Days)
                </h2>

                {upcomingRenewals.length === 0 ? (
                    <p className="text-gray-500">No upcoming renewals</p>
                ) : (
                    <ul className="space-y-2">
                        {upcomingRenewals.map(reminder => (
                            <li
                                key={reminder.id}
                                className="flex justify-between border-b pb-2"
                            >
        <span className="text-sm">
            Subscription ID:{" "}
            <span className="font-medium">
                {reminder.subscriptionId.slice(0, 8)}…
            </span>
        </span>

                                <span className="text-sm text-gray-600">
            {dayjs(reminder.sendAt).format("DD MMM YYYY")}
        </span>
                            </li>
                        ))}

                    </ul>
                )}
            </div>
        </div>
    );
};

export default Analytics;
