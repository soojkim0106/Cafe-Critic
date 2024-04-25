import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../components/pages/Home'
import Error from '../components/errors/Error'
import UserCard from '../components/user/UserCard'
import Registration from '../components/auth/registration'
import ReviewCard from '../components/review/ReviewCard'
import CafeCard from '../components/cafe/CafeCard'
import CafeContainer from '../components/cafe/CafeContainer'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                index: true,
                element: <Registration />
            },
            {
                path: "registration",
                element: <Registration />
            },
            {
                path: "cafes",
                element: <CafeContainer />
            },
            {
                path: "users/:userId",
                element: <UserCard />
            },
            {
                path: "reviews/:reviewId",
                element: <ReviewCard />
            },
            {
                path:"cafes/:cafeId",
                element: <CafeCard />
            }
        ]
    }
])