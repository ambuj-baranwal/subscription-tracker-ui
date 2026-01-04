import {createBrowserRouter} from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './components/Login.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import Analytics from './pages/Analytics.jsx';
import Settings from "./pages/Settings.jsx";
import SubscriptionForm from "./components/SubscriptionForm.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";



const isUserAuthenticated = true;

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'about',
                element: <>About</>,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                element: <ProtectedRoute isAuthenticated={isUserAuthenticated} />,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />,
                    },
                    {
                        path: 'profile',
                        element: (<h2>Profile Page</h2>)
                    },
                    {
                      path: 'add-subscription',
                      element: <SubscriptionForm />,
                    },
                    {
                        path: 'analytics',
                        element: <Analytics />,
                    },
                    {
                        path: 'subscriptions',
                        element: <Subscriptions />,
                    },
                    {
                        path: 'settings',
                        element: <Settings />,
                    },
                ]
            }
        ]
    }
])

export default router;