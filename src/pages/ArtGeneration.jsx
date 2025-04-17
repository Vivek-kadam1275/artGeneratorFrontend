import React, { useContext, useState, useRef, useEffect } from "react"
import Navbar from "../components/Navbar.jsx";
import { artContext } from "../context/artContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import { imageUpload } from "../utils/ApiRoutes.jsx";

const ArtGeneration = (props) => {
  const { toastOptions } = useContext(artContext);

  const navigate = useNavigate();


  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scribbleImage, setScribbleImage] = useState(null);
  const canvasRef = useRef(null);
  const API_KEY=import.meta.env.VITE_DALLE_API;
  const generateImage = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        { prompt, n: 1, size: "1024x1024" },
        { headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" } }
      );
      setImageUrl(response.data.data[0].url);
      console.log(response.data.data[0].url);
      uploadImageToCloudinary();
      toast.success("Art generated successfully!", toastOptions);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed to generate art. Try again.");
    }
  };

  const uploadImageToCloudinary=async()=>{
    const response = await fetch(imageUpload, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },

      body: JSON.stringify({  imageUrl }),
  })
  const data = await response.json();
  console.log(data);
  }
  
  
  const handleClear = () => {
    // canvasRef.current.clearCanvas();
    setPrompt("");
    // setScribbleImage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("clicked");
    if (!prompt) {
      toast.error("Enter a prompt.");
      return;
    }
    
    generateImage();
  };
  return (
    <div>
      <Navbar />
      <div className="h-screen bg-gradient-to-b from-purple-600 to-blue-900 p-6 flex justify-center " >
        <form onSubmit={handleSubmit} className="w-[30%]  flex flex-col gap-4">
          <label className="text-white">Prompt</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="p-2 rounded bg-transparent border border-white text-white"
          />

          <label className="text-white">Canvas (Scribble Below)</label>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ height: 300, border: "1px solid white" }}
            strokeWidth={4}
            strokeColor="black"
          />

          <button type="submit" className="py-2 px-4 bg-purple-700 text-white rounded hover:scale-105 cursor-pointer">
            Generate Art
          </button>
          <button type="button" onClick={handleClear} className="py-2 px-4 bg-blue-600 text-white rounded hover:scale-105">
            Clear
          </button>
        </form>

       
        
          {imageUrl && (
            <div className=" w-[60%] text-center">
              <h3 className="text-white">Generated Art:</h3>
              <img src={imageUrl} alt="Generated Art" className="mx-auto mt-4" style={{ maxWidth: 300 }} />
            </div>
          )}
      </div>
      
    </div>
  )
};

export default ArtGeneration;
