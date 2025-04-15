import React, { useContext, useEffect } from "react"
import Navbar from "../components/Navbar.jsx";
import { artContext } from "../context/artContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ArtGeneration = (props) => {
  const {currentUser,toastOptions}=useContext(artContext);
   useEffect(()=>{
    console.log(currentUser);
   },[])
   const navigate=useNavigate();

//  if avatar is not set, then set first
  // useEffect(() => {
  //   if (currentUser) {
  //     if (!currentUser.isAvatarSet) {
  //       toast.error("set avatar first", toastOptions);
  //       navigate("/setAvatar");
  //     }
  //   }
  // }, [currentUser])
  return (
    <div>
       <Navbar/>
    </div>
  )
};

export default ArtGeneration;
