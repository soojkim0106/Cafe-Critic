import { createBrowserRouter } from 'react-router-dom'
import Home from '../components/pages/Home'
import Error from '../components/errors/Error'
import Registration from '../components/auth/Registration'
import CatDetail from '../components/project/CatDetail'
import CatForm from '../components/project/CatForm'
import UserCard from '../components/project/UserCard'


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/registration",
    element: <Registration />,
    errorElement: <Error />,
  },
  {
    path: "/cats/:catId",
    element: <CatDetail />,
    errorElement: <Error />,
  },
  {
    path: "/cats",
    element: <CatForm />,
    errorElement: <Error />,
  },
  {
    path: "/users/:userId", //make a /profile and this could be linked to admin
    element: <UserCard />,
    errorElement: <Error />,
  },
]);