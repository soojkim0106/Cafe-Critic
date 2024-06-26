import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Error from '../components/errors/Error'
import UserCard from '../components/user/UserCard'
import Registration from '../components/auth/registration'
import CafeContainer from '../components/cafe/CafeContainer'
import CafeDetail from '../components/cafe/CafeDetail'
import GoogleAuth from '../components/auth/googleauth'
import CommentCard from '../components/comment/CommentCard'
import ReviewContainer from '../components/review/ReviewContainer'

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
                path: "cafe",
                element: <CafeContainer />
            },
            {
                path: "profile",
                element: <UserCard />
            },
            {
                path: "review",
                element: <ReviewContainer />
            },
            {
                path:"cafe/:cafeId",
                element: <CafeDetail />
            }
        ]
    }
])