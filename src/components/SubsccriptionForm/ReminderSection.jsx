import { Plus, X } from "lucide-react";
import {INPUT_STYLES} from "./constants.js";


const ReminderSection = ({ reminders, setReminders }) => {
    const addReminder = () => {
        setReminders([...reminders, { type: "email", scheduleType: "monthly", payload: {} }]);
    };

    const removeReminder = (index) => {
        setReminders(reminders.filter((_, i) => i !== index));
    };

    const updateReminder = (index, key, value) => {
        const updated = [...reminders];
        updated[index][key] = value;
        setReminders(updated);
    };

    return (
        <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Reminders</h3>
                <button
                    type="button"
                    onClick={addReminder}
                    className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
                >
                    <Plus className="w-4 h-4" /> Add Reminder
                </button>
            </div>

            <div className="space-y-3">
                {reminders.map((r, i) => (
                    <div key={i} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-sm text-gray-500 font-medium px-2">Notify me</span>
                        <select
                            className={`${INPUT_STYLES} py-1.5 text-sm flex-1`}
                            value={r.scheduleType}
                            onChange={(e) => updateReminder(i, "scheduleType", e.target.value)}
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        <span className="text-sm text-gray-500 font-medium">before renewal</span>
                        <button
                            type="button"
                            onClick={() => removeReminder(i)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                {reminders.length === 0 && (
                    <p className="text-sm text-gray-400 text-center italic py-2">No active reminders</p>
                )}
            </div>
        </div>
    );
};

export default ReminderSection;