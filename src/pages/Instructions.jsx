import React from "react"
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const Instructions = (props) => {
  return (
    <div>
        <Navbar/>
        <div>
      <main className="flex min-h-screen flex-col items-center bg-slate-300">
      <h3 className="mt-10 mb-6 p-1 text-center font-semibold text-3xl">
        How to become an Arter?
      </h3>
      <ol className="text-xl list-decimal">
        <li> Write a prompt </li>
        <li> Draw your scribble </li>
        <li> Submit and enjoy your art. </li>
      </ol>

      <Link to="/">
        <p className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded mt-6">
          Start now!
        </p>
      </Link>

      <p className="flex p-10">
        Visit the&nbsp;
        <Link className="text-blue-500 underline text-sm" to="/gallery">
          gallery
        </Link>
        &nbsp;to view all the past artworks.
      </p>

      <h3 className="mt-10 mb-6 font-semibold text-3xl text-red-600">
        Some obvious rules:
      </h3>
      <ol className="text-xl list-decimal">
        <li> Keep it appropriate</li>
        <li> Do not spam</li>
        <li> Respect other people&apos;s art </li>
      </ol>
      <p className="text-sm mt-10">
        Made by:&nbsp;
        <Link
          className="text-blue-500 underline text-sm"
          target="_blank"
          
        >
          GROUP 21
        </Link>
      </p>
    </main>
    </div>
    </div>
  )
};

export default Instructions;
