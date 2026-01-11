import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "../lib/api.js";
import {useAuth} from "./useAuth.js";
import {subscriptionService} from "../services/subscription.service.js";




const getSubscriptionById = async (id) => {
    const response = await api.get(`/subscriptions/${id}`);
    return response.data.data;
};

const deleteSubscriptionById = async (id) => {
    await api.delete(`/subscriptions/${id}`);
};


const updateSubscriptionById = async ({ id, payload }) => {
    const response = await api.put(`/subscriptions/${id}`, payload);
    return response.data.data;
};


export const useSubscription = () => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();

    const subscriptionQuery = useQuery({
        queryKey: ['subscription'],
        queryFn: subscriptionService.getAll,
        enabled: isAuthenticated
    });

    const createSubscriptionMutation = useMutation({
        mutationFn: subscriptionService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription'] });
        }
    });

    const deleteSubscriptionMutation = useMutation({
        mutationFn: subscriptionService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription'] });
        }
    });

    const updateSubscriptionMutation = useMutation({
        mutationFn: subscriptionService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription'] });
        }
    });

    return {
        subscriptions: subscriptionQuery.data,
        isLoading: subscriptionQuery.isLoading,
        isError: subscriptionQuery.isError,

        createSubscription: createSubscriptionMutation.mutate,
        updateSubscription: updateSubscriptionMutation.mutate,
        deleteSubscription: deleteSubscriptionMutation.mutateAsync,

        isCreating: createSubscriptionMutation.isPending,
        isUpdating: updateSubscriptionMutation.isPending,
        isDeleting: deleteSubscriptionMutation.isPending,

        error: subscriptionQuery.error,
        // added later
        getSubscriptionById,
        updateSubscriptionById,
        deleteSubscriptionById,
    };
};
