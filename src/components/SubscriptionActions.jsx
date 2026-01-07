import { useState } from "react";
import { EllipsisVertical } from "lucide-react";

const SubscriptionActions = ({ onEdit, onCancel, onDelete }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(prev => !prev);
                }}
                className="text-gray-400 hover:text-gray-600"
            >
                <EllipsisVertical />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                            onEdit();
                        }}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                    >
                        Edit
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                            onCancel();
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                            onDelete();
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default SubscriptionActions;
