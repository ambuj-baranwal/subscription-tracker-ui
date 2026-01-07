import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "../lib/api.js";
import {useNavigate} from "react-router-dom";

const signupUser = async (userData) => {
    const { data } = await api.post("/auth/sign-up", userData);
}

const loginUser = async (credentials) => {
    const { data } = await api.post('/auth/sign-in', credentials);
    return data;
};

const logoutUser = async () => {
    await api.post('/auth/sign-out');
};

const getUser = async () => {
    const response = await api.get('/auth/user');
    return response.data.data;
};

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userQuery = useQuery({
        queryKey: ['authUser'],
        queryFn: getUser,
        retry: false, // don't need to try as user will be unauthorized due to invalid cookie
        staleTime: 1000 * 60 * 5,
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (user) => {
            queryClient.setQueryData(['authUser'], user);
        }
    });

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(['authUser'], null);
            queryClient.invalidateQueries();
        }
    });

    const signupMutation = useMutation({
        mutationFn: signupUser,
        onSuccess: (newUser) => {
            // queryClient.setQueryData(['authUser'], newUser);
            navigate('/login');
        },
        onError: (error) => {
            // update it later
            console.log('Sign up failed', error.response?.data?.error);
        }
    })

    return {
        user: userQuery.data,
        isLoading: userQuery.isLoading,
        login: loginMutation.mutate,
        isLoggingIn: userQuery.isPending,
        logout: logoutMutation.mutate,
        isAuthenticated: !!userQuery.data,
        signup: signupMutation.mutate,
        isSigningUp: signupMutation.isPending,
        signUpError: signupMutation.error,
    }
}