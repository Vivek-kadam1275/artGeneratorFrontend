import React, { useContext, useState, useRef, useEffect } from "react"
import Navbar from "../components/Navbar.jsx";
import { artContext } from "../context/artContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReactSketchCanvas } from "react-sketch-canvas";
// import axios from "axios";
import { dalleRoute, imageUpload, replicateRoute, storeImage } from "../utils/ApiRoutes.jsx";

const ArtGeneration = (props) => {
  const { toastOptions } = useContext(artContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const canvasRef = useRef(null);
  let generatedImage = useRef("");
  // const [canvasHeight, setCanvasHeight] = useState(350);

  // const API_KEY = import.meta.env.VITE_DALLE_API;

  const generateDalle = async () => {
    // const response = await axios.post(
    //   "https://api.openai.com/v1/images/generations",
    //   { prompt, n: 1, size: "512x512" },
    //   { headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" } }
    // );
    // const openaiImageUrl = response.data.data[0].url;

    console.log("into dalle")
    const response = await fetch(dalleRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
    const data = await response.json();
    console.log(data);
    const openaiImageUrl = data.imageUrl;

    return openaiImageUrl;

  }
  const generateScribble = async () => {

    console.log("into replicate")
    const scribble = await canvasRef.current.exportImage("jpeg");
    const res = await fetch(replicateRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, scribble }),
    });

    const data = await res.json();
    // console.log(data);
    // ✅ Make sure you're accessing the actual URL
    console.log("Image URL:", data.result);


    return data.result;



  }
  const generateImage = async () => {
    try {
      setLoading(true); // Start loading
      // const response = await axios.post(
      //   "https://api.openai.com/v1/images/generations",
      //   { prompt, n: 1, size: "512x512" },
      //   { headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" } }
      // );
      // const openaiImageUrl = response.data.data[0].url;
      // Check if the canvas is blank (by comparing to a known empty canvas)
      const paths = await canvasRef.current.exportPaths();

      if (!paths || paths.length === 0) {
        generatedImage.current = await generateDalle();
        console.log("printing generated image--->",generatedImage.current)
      } else {
        generatedImage.current = await generateScribble()
        console.log("printing generated image--->",generatedImage.current);
      }


      if (generatedImage.current==="" || !generatedImage.current) {
        toast.error("Image generation failed.",toastOptions);
         console.log("Sorry for incovenience.Please try again.");
        console.log("Image not generated------>")
        setLoading(false);
        return;
      }
      // console.log(openaiImageUrl);
      await uploadImageToCloudinary(generatedImage.current);
      toast.success("Art generated successfully!", toastOptions);
      setLoading(false); // Stop loading in all cases
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      console.log("Full error:", error);
      toast.error("Sorry for incovenience.Please try again.");
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (openaiImageUrl) => {
    console.log("uploading to cloudinary..");
    const response = await fetch(imageUpload, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({ imageUrl: openaiImageUrl }),
    })
    const data = await response.json();
    console.log("uploaded to cloudinary...");
    console.log(data);

    setImageUrl(data.url);
    saveImageToDatabase(data.url);
    setPrompt("");
    canvasRef.current.clearCanvas();
    generatedImage.current="";

  }

  const saveImageToDatabase = async (url) => {
    console.log("saving to db");
    const response = await fetch(storeImage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({ imageUrl: url, prompt }),
    })
    const result = await response.json();
    console.log("saved to db");
    console.log(result);
  }

  const handleClear = () => {
    canvasRef.current.clearCanvas();
    setPrompt("");
    // setScribbleImage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("clicked");
    if (!prompt) {
      toast.error("Enter a prompt.");
      return;
    }

    generateImage();

  };
  return (
    <div>
      <Navbar />
      <div className="h-screen bg-gradient-to-b from-purple-600 to-blue-900 p-6 flex justify-center gap-10 " >
        <form onSubmit={handleSubmit} className="w-[40%]  flex flex-col gap-4">
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

          <button type="submit"
            disabled={loading}
            className={`py-2 px-4   text-white rounded    ${loading ? 'bg-gray-400 cursor-not-allowed' : '  bg-purple-700 hover:scale-105'
              }`}>
            Generate Art
          </button>
          <button type="button"
            disabled={loading}
            onClick={handleClear} className={`py-2 px-4  text-white rounded   ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:scale-105'
              }`}>
            Clear
          </button>
        </form>


        {loading ? <div className="text-white text-center mt-4 animate-pulse w-[50%]">
          ⏳ Generating your AI art, please wait...
        </div> : <div className="">
          {imageUrl && (
            <div className="  text-center h">
              <h3 className="text-white">Generated Art:</h3>
              <img src={imageUrl} alt="Generated Art" className="mx-auto mt-4 w-[400px] h-[400px] object-cover rounded-xl" />
            </div>
          )}
        </div>}



      </div>

    </div>
  )
};

export default ArtGeneration;
