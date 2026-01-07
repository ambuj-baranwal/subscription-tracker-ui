import { useAuth } from "../hooks/useAuth.js"
import { useForm } from "@tanstack/react-form"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Login = () => {
    const { login, isLoggingIn, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard")
    }, [isAuthenticated, navigate])

    const form = useForm({
        defaultValues: { email: "", password: "" },
        onSubmit: async ({ value }) => {
            setError(null)
            login(value, {
                onSuccess: () => navigate("/dashboard"),
                onError: (err) => {
                    setError(err.response?.data?.message || "Invalid email or password")
                }
            })
        }
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-5"
                >

                    
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
                                />
                            </div>
                        )}
                    </form.Field>

                    
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

                    {/* SUBMIT */}
                    <form.Subscribe selector={(state) => [state.canSubmit]}>
                        {([canSubmit]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isLoggingIn}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {isLoggingIn ? "Authenticating..." : "Login"}
                            </button>
                        )}
                    </form.Subscribe>

                    {/* ERROR MESSAGE */}
                    {error && (
                        <p className="text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg py-2">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login
