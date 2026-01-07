import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api.js";
import { useAuth } from "./useAuth.js";


const fetchAllReminders = async () => {
    const { data } = await api.get("/reminders");
    // console.log(data.data);
    return data.data;
};

const fetchReminderById = async (id) => {
    const { data } = await api.get(`/reminders/${id}`);
    return data.data;
};

const createReminder = async (payload) => {
    const { data } = await api.post("/reminders", payload);
    return data.data;
};

const updateReminderById = async ({ id, payload }) => {
    const { data } = await api.put(`/reminders/${id}`, payload);
    return data.data;
};

const deleteReminderById = async (id) => {
    await api.delete(`/reminders/${id}`);
};


export const useReminder = (reminderId = null) => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

    const remindersQuery = useQuery({
        queryKey: ["reminders"],
        queryFn: fetchAllReminders,
        enabled: isAuthenticated,
    });

    const reminderByIdQuery = useQuery({
        queryKey: ["reminder", reminderId],
        queryFn: () => fetchReminderById(reminderId),
        enabled: !!reminderId && isAuthenticated,
    });


    const createReminderMutation = useMutation({
        mutationFn: createReminder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reminders"] });
        },
    });

    const updateReminderMutation = useMutation({
        mutationFn: updateReminderById,
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["reminders"] });
            queryClient.invalidateQueries({ queryKey: ["reminder", id] });
        },
    });

    const deleteReminderMutation = useMutation({
        mutationFn: deleteReminderById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reminders"] });
        },
    });



    return {

        reminders: remindersQuery.data,
        reminder: reminderByIdQuery.data,

        isLoading: remindersQuery.isLoading,
        isReminderLoading: reminderByIdQuery.isLoading,

        isError: remindersQuery.isError,
        error: remindersQuery.error,

        createReminder: createReminderMutation.mutate,
        updateReminder: updateReminderMutation.mutate,
        deleteReminder: deleteReminderMutation.mutate,

        isCreating: createReminderMutation.isPending,
        isUpdating: updateReminderMutation.isPending,
        isDeleting: deleteReminderMutation.isPending,
    };
};
