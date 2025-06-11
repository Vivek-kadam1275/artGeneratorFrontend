import { useState } from 'react'

import './App.css'
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ArtGeneration from './pages/ArtGeneration';
import Gallery from './pages/Gallery';
import Instructions from './pages/Instructions';
import SetAvatar from './pages/SetAvatar';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


function App() {

  const router = createBrowserRouter([
    {
      path: "/signup",
      element:
        <Signup />

    },
    {
      path: "/login",
      element:
        <Login />
    },
    {
      path: "/",
      element:
        <ProtectedRoute>
          <ArtGeneration />
        </ProtectedRoute>

    },
    {
      path: "/gallery",
      element: <ProtectedRoute>
        <Gallery />
      </ProtectedRoute>
    }, {
      path: "/instructions",
      element: <ProtectedRoute>
        <Instructions />
      </ProtectedRoute>
    },
    {
      path: "/forgot-password",
      element:
        <ForgotPassword/>
    },{
      path:"/reset-password/:token",
      element:<ResetPassword/>
    }

  ])
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App;
