import { useLocation } from "react-router-dom";
import SubscriptionForm from "../components/SubscriptionForm.jsx";

const EditSubscriptionPage = () => {
    const { state } = useLocation();
    return <SubscriptionForm subscription={state.subscription} />;
};

export default EditSubscriptionPage;
