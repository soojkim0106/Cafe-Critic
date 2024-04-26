import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Error from '../components/errors/Error'
import UserCard from '../components/user/UserCard'
import Registration from '../components/auth/registration'
import ReviewDetail from '../components/review/ReviewDetail'
import CafeContainer from '../components/cafe/CafeContainer'
import CafeDetail from '../components/cafe/CafeDetail'

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
                path: "profile",
                element: <UserCard />
            },
            {
                path: "reviews/:reviewId",
                element: <ReviewDetail />
            },
            {
                path:"cafes/:cafeId",
                element: <CafeDetail />
            }
        ]
    }
])