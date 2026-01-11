import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, X, Save } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useSubscription } from "../hooks/useSubscription";

const SubscriptionForm = ({ subscription }) => {
  const navigate = useNavigate();
  const { createSubscription, updateSubscription } = useSubscription();
  const isEdit = Boolean(subscription?.id);

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
      reminders: subscription?.reminders || [],
    },

    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        renewalDate: value.renewalDate || undefined,
      };

      if (isEdit) {
        await updateSubscription({ id: subscription.id, payload });
      } else {
        await createSubscription(payload);
      }
      navigate("/dashboard");
    },
  });

  const inputStyles =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="bg-white w-full max-w-2xl rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-xl text-gray-800">
              {isEdit ? "Edit" : "New"} Subscription
            </h2>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* NAME */}
          <form.Field name="name">
            {(f) => (
              <div>
                <label className={labelStyles}>Subscription Name</label>
                <input
                  className={inputStyles}
                  placeholder="e.g. Netflix, Gym"
                  value={f.state.value}
                  onChange={(e) => f.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          {/* ROW 1: PRICE & CURRENCY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <form.Field name="price">
              {(f) => (
                <div className="md:col-span-2">
                  <label className={labelStyles}>Price</label>
                  <input
                    type="number"
                    className={inputStyles}
                    placeholder="0.00"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(+e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="currency">
              {(f) => (
                <div>
                  <label className={labelStyles}>Currency</label>
                  <select
                    className={inputStyles}
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                  >
                    <option>INR</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>JPY</option>
                  </select>
                </div>
              )}
            </form.Field>
          </div>

          {/* ROW 2: FREQUENCY & CATEGORY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field name="frequency">
              {(f) => (
                <div>
                  <label className={labelStyles}>Billing Cycle</label>
                  <select
                    className={inputStyles}
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="halfYearly">Half Yearly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}
            </form.Field>

            <form.Field name="category">
              {(f) => (
                <div>
                  <label className={labelStyles}>Category</label>
                  <select
                    className={inputStyles}
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                  >
                    <option value="entertainment">Entertainment</option>
                    <option value="finance">Finance</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="news">News</option>
                    <option value="politics">Politics</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}
            </form.Field>
          </div>

          {/* ROW 3: PAYMENT METHOD & STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field name="paymentMethod">
              {(f) => (
                <div>
                  <label className={labelStyles}>Payment Method</label>
                  <input
                    className={inputStyles}
                    placeholder="e.g. Credit Card ****"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="status">
              {(f) => (
                <div>
                  <label className={labelStyles}>Status</label>
                  <select
                    className={inputStyles}
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              )}
            </form.Field>
          </div>

          {/* ROW 4: DATES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field name="startDate">
              {(f) => (
                <div>
                  <label className={labelStyles}>Start Date</label>
                  <input
                    type="datetime-local"
                    className={inputStyles}
                    value={f.state.value ? f.state.value.slice(0, 16) : ""}
                    onChange={(e) =>
                      f.handleChange(new Date(e.target.value).toISOString())
                    }
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="renewalDate">
              {(f) => (
                <div>
                  <label className={labelStyles}>Next Renewal</label>
                  <input
                    type="datetime-local"
                    className={inputStyles}
                    value={f.state.value ? f.state.value.slice(0, 16) : ""}
                    onChange={(e) =>
                      f.handleChange(new Date(e.target.value).toISOString())
                    }
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* REMINDERS */}

          <div className="pt-4 border-t border-gray-100">
            <form.Field name="reminders" mode="array">
              {(field) => (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Reminders</h3>
                    <button
                      type="button"
                      className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
                      onClick={() =>
                        field.pushValue({
                          type: "email",
                          scheduleType: "monthly",
                          payload: {},
                        })
                      }
                    >
                      <Plus className="w-4 h-4" /> Add Reminder
                    </button>
                  </div>

                  <div className="space-y-3">
                    {field.state.value.map((reminder, i) => (
                      <div
                        key={i}
                        className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                      >
                        <span className="text-sm text-gray-500 font-medium px-2">
                          Notify me
                        </span>

                        <select
                          className={`${inputStyles} py-1.5 text-sm flex-1`}
                          value={reminder.scheduleType}
                          onChange={(e) => {
                            const newReminders = [...field.state.value];
                            newReminders[i] = {
                              ...newReminders[i],
                              scheduleType: e.target.value,
                            };
                            field.handleChange(newReminders);
                          }}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>

                        <span className="text-sm text-gray-500 font-medium">
                          before renewal
                        </span>

                        <button
                          type="button"
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          onClick={() => field.removeValue(i)}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {field.state.value.length === 0 && (
                      <p className="text-sm text-gray-400 text-center italic py-2">
                        No active reminders
                      </p>
                    )}
                  </div>
                </>
              )}
            </form.Field>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;
