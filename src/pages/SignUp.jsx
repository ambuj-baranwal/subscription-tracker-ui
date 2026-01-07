import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";

const SignUp = () => {
    const { signup, isSigningUp } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        defaultValues: {
            fullName: "",
            username: "",
            email: "",
            password: ""
        },
        onSubmit: async ({ value }) => {
            setError(null);
            signup(value, {
                onSuccess: () => navigate("/login"),
                onError: (err) => {
                    setError(err.response?.data?.error || "Registration failed");
                }
            });
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-500">Start tracking your subscriptions today</p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    {/* Full Name */}
                    <form.Field name="fullName">
                        {(field) => (
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <input
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Username */}
                    <form.Field name="username">
                        {(field) => (
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Username</label>
                                <input
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="johndoe123"
                                    required
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Email */}
                    <form.Field name="email">
                        {(field) => (
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Email</label>
                                <input
                                    type="email"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Password */}
                    <form.Field name="password">
                        {(field) => (
                            <div className="space-y-1 relative">
                                <label className="text-sm font-medium text-gray-600">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-8 text-sm text-gray-500 hover:text-gray-800"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        )}
                    </form.Field>

                    {/* Submit Button */}
                    <form.Subscribe selector={(state) => [state.canSubmit]}>
                        {([canSubmit]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSigningUp}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 mt-4"
                            >
                                {isSigningUp ? "Creating Account..." : "Sign Up"}
                            </button>
                        )}
                    </form.Subscribe>

                    {/* Error Message */}
                    {error && (
                        <p className="text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg py-2">
                            {error}
                        </p>
                    )}

                    <div className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;