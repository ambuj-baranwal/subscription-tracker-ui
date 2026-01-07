const ReminderField = ({ reminder, index, onChange, onRemove }) => {
    return (
        <div className="border rounded-lg p-3 space-y-2">
            <select
                value={reminder.scheduleType}
                onChange={(e) =>
                    onChange(index, { ...reminder, scheduleType: e.target.value })
                }
                className="border p-2 w-full rounded"
            >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
            </select>

            <input
                value={reminder.payload}
                onChange={(e) =>
                    onChange(index, { ...reminder, payload: e.target.value })
                }
                placeholder="Reminder message"
                className="border p-2 w-full rounded"
            />

            <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-sm text-red-600"
            >
                Remove Reminder
            </button>
        </div>
    );
};

export default ReminderField;
