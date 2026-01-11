import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, CreditCard, Bell, Trash2, Pencil } from "lucide-react";
import { useSubscription } from "../hooks/useSubscription";

const SubscriptionDetail = () => {
    const { subscriptionId } = useParams();
    const navigate = useNavigate();
    const { subscriptions, deleteSubscription, updateSubscription, isLoading } = useSubscription();

    const subscription = subscriptions?.find(s => s.id === subscriptionId);
    // console.log('Logging at Subscription Detail Page',subscription);

    if (isLoading) return <div>Loading...</div>;
    if (!subscription) return <div>Subscription not found</div>;

    const handleDelete = async () => {
        if(window.confirm("Are you sure you want to delete this subscription?")) {
            await deleteSubscription(subscription.id);
            navigate("/dashboard");
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">

            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-black">
                <ArrowLeft size={18}/> Back
            </button>

            <div className="bg-white rounded-xl p-6 shadow space-y-6">


                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{subscription.name}</h1>

                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(`/subscriptions/${subscription.id}/edit`, { state:{subscription} })}
                            className="flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-blue-600"
                        >
                            <Pencil size={16}/> Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-3 py-1 rounded bg-red-50 text-red-600"
                        >
                            <Trash2 size={16}/> Delete
                        </button>
                    </div>
                </div>

                {/* META */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <Info label="Category" value={subscription.category}/>
                    <Info label="Status" value={subscription.status}/>
                    <Info label="Price" value={`${subscription.currency} ${subscription.price} / ${subscription.frequency}`}/>
                    <Info label="Payment Method" value={subscription.paymentMethod}/>
                    <Info label="Start Date" value={new Date(subscription.startDate).toLocaleDateString()}/>
                    <Info label="Renewal Date" value={new Date(subscription.renewalDate).toLocaleDateString()}/>
                </div>

                {/* REMINDERS */}
                <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Bell size={18}/> Reminders
                    </h3>

                    {subscription.reminders?.length ? (
                        <div className="space-y-2">
                            {subscription.reminders.map((r,i)=>(
                                <div key={i} className="border rounded p-2 text-sm flex justify-between">
                                    <span>{r.type}</span>
                                    <span className="uppercase">{r.scheduleType}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-400 text-sm">No reminders set</div>
                    )}
                </div>

                {/* CANCEL */}
                {subscription.status === "active" && (
                    <button
                        onClick={() => updateSubscription.mutate({ id: subscription.id, payload:{ status:"cancelled" } })}
                        className="w-full bg-yellow-50 text-yellow-700 py-2 rounded"
                    >
                        Cancel Subscription
                    </button>
                )}
            </div>
        </div>
    );
};

const Info = ({label,value}) => (
    <div>
        <p className="text-gray-400">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
);

export default SubscriptionDetail;
