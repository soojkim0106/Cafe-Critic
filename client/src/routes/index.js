import { createBrowserRouter } from 'react-router-dom'
import App from '../components/App'
import Home from '../components/pages/Home'
import Error from '../components/errors/Error'
import Registration from '../components/auth/Registration'
import CatDetail from '../components/project/CatDetail'
import CatForm from '../components/project/CatForm'
import UserCard from '../components/project/UserCard'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />
      },
      {
        path: 'registration',
        element: <Registration />
      },
      {
        path: 'cats/:catId',
        element: <CatDetail />
      },
      {
        path: 'adopt_foster',
        element: <CatForm />
      },
      {
        path: 'users/:userId',
        element: <UserCard />
      }
    ]
  }
])