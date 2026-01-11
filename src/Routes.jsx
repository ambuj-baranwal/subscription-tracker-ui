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
import SubscriptionDetail from "./pages/SubscriptionDetail.jsx";
import SignUp from "./pages/SignUp.jsx";



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
              path: 'sign-up',
                element: <SignUp />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />,
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
                        path: 'subscriptions/:subscriptionId',
                        element: <SubscriptionDetail />,
                    },
                    {
                         path: 'subscriptions/:subscriptionId/edit',
                         element: <SubscriptionForm />,
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