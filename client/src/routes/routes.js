import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../components/pages/Home'
import Error from '../components/errors/Error'
import UserCard from '../components/user/UserCard'
import Registration from '../components/auth/registration'
import ReviewCard from '../components/review/ReviewCard'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                index: true,
                element: <Home />
            },
            {
                path: "registration",
                element: <Registration />
            },
            {
                path: "users/:userId",
                element: <UserCard />
            },
            {
                path: "reviews/:reviewId",
                element: <ReviewCard />
            }
        ]
    }
])