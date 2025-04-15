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
        <ArtGeneration />

    },
    {
      path:"/gallery",
      element:<Gallery/>
    },{
      path:"/instructions",
      element:<Instructions/>
    } 
  ])
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
