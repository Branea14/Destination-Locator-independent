import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import * as sessionActions from './store/session';
import SpotsBrowser from "./components/Spots/SpotsBrowser";
import SpotDetails from "./components/Spots/SpotDetails";
import Reviews from './components/Reviews/Reviews'
import CreateSpot from "./components/Spots/CreateSpot";
// import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
// import { Greeting } from "./components/OpenModalButton/OpenModalButton";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    })
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [

      {
        path: '/',
        element: <SpotsBrowser />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />,
        children: [
          {
            path: '',
            element: <Reviews />
          }
        ]
      },
      {
        path: '/spots/new',
        element: <CreateSpot />
      }
      //removed/refactor to turn into modal
      // {
      //   path: '/login',
      //   element: <LoginFormPage />
      // },

      //removed/refactor to turn into modal
      // {
      //   path: '/signup',
      //   element: <SignupFormPage />
      // },

      //testing purposes
      // {
      //   path: '/greeting',
      //   element: <Greeting />
      // }
    ]
  },
]);


function App() {
  return <RouterProvider router={router} />
}

export default App;
