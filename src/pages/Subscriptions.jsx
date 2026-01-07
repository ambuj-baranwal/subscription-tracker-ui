import { useSubscription } from "../hooks/useSubscription";
import SubscriptionCard from "../components/Card/SubscriptionCard.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const Subscriptions = () => {
    const { subscriptions, deleteSubscription, updateSubscription, isLoading, isError } = useSubscription();
    const [editingSubscription, setEditingSubscription] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (subscription) => {
        console.log("Edit clicked", subscription);
        navigate(`/subscriptions/${subscription.id}/edit`, {
            state: { subscription },
        });
    };

    const handleCancel = (id) => {
        updateSubscription({
            id,
            payload: { status: "cancelled" }
        });
    };
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading subscriptions</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptions?.map(sub => (
                <SubscriptionCard
                    key={sub.id}
                    subscription={sub}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                    onDelete={deleteSubscription}
                />
            ))}

            {editingSubscription && (
                <EditSubscriptionModal
                    subscription={editingSubscription}
                    onClose={() => setEditingSubscription(null)}
                />
            )}
        </div>
    );
};

export default Subscriptions;
