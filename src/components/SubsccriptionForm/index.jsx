import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Save } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useSubscription } from "../../hooks/useSubscription"; // Adjust import path

// Import our new decomposed parts
import { FormInput, FormSelect } from "./FormFields";
import ReminderSection from "./ReminderSection";
import { CURRENCIES, FREQUENCIES, CATEGORIES } from "./constants";

const SubscriptionForm = ({ subscription }) => {
    const navigate = useNavigate();
    const { createSubscription, updateSubscription } = useSubscription();
    const isEdit = Boolean(subscription?.id);

    // Ideally, reminders should be part of the useForm state, but for this refactor
    // we will keep it consistent with your current logic.
    const [reminders, setReminders] = useState(subscription?.reminders || []);

    const form = useForm({
        defaultValues: {
            name: subscription?.name || "",
            price: subscription?.price || 0,
            currency: subscription?.currency || "INR",
            frequency: subscription?.frequency || "monthly",
            category: subscription?.category || "other",
            paymentMethod: subscription?.paymentMethod || "",
            status: subscription?.status || "active",
            startDate: subscription?.startDate || new Date().toISOString(),
            renewalDate: subscription?.renewalDate || "",
        },
        onSubmit: async ({ value }) => {
            const payload = { ...value, renewalDate: value.renewalDate || undefined, reminders };
            if (isEdit) {
                await updateSubscription({ id: subscription.id, payload });
            } else {
                await createSubscription(payload);
            }
            navigate("/dashboard");
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <form
                onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}
                className="bg-white w-full max-w-2xl rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="font-bold text-xl text-gray-800">{isEdit ? "Edit" : "New"} Subscription</h2>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
                        <Save className="w-4 h-4" /> Save
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 space-y-6">
                    <form.Field name="name" children={(field) => (
                        <FormInput field={field} label="Subscription Name" placeholder="e.g. Netflix, Gym" />
                    )} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <form.Field name="price" children={(field) => (
                                <FormInput field={field} label="Price" type="number" placeholder="0.00" />
                            )} />
                        </div>
                        <form.Field name="currency" children={(field) => (
                            <FormSelect field={field} label="Currency" options={CURRENCIES} />
                        )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <form.Field name="frequency" children={(field) => (
                            <FormSelect field={field} label="Billing Cycle" options={FREQUENCIES} />
                        )} />
                        <form.Field name="category" children={(field) => (
                            <FormSelect field={field} label="Category" options={CATEGORIES} />
                        )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <form.Field name="paymentMethod" children={(field) => (
                            <FormInput field={field} label="Payment Method" placeholder="e.g. Credit Card ****" />
                        )} />
                        <form.Field name="status" children={(field) => (
                            <FormSelect field={field} label="Status" options={["active", "cancelled", "expired"]} />
                        )} />
                    </div>

                    {/* Dates - You might want to create a specific DatePicker component later */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <form.Field name="startDate" children={(field) => (
                            <FormInput field={field} label="Start Date" type="datetime-local" />
                        )} />
                        <form.Field name="renewalDate" children={(field) => (
                            <FormInput field={field} label="Next Renewal" type="datetime-local" />
                        )} />
                    </div>

                    {/* Reminder Section */}
                    <ReminderSection reminders={reminders} setReminders={setReminders} />
                </div>
            </form>
        </div>
    );
};

export default SubscriptionForm;