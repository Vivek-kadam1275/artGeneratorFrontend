import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar.jsx";
import { getImages } from "../utils/ApiRoutes.jsx";
import { useLocation } from "react-router-dom";
const Gallery = (props) => {

  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const getImagesData = async () => {
    const response = await fetch(getImages, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
    setImagesData(result.data);
    setLoading(false);
  }
  useEffect(() => {
    getImagesData();
  }, [location.pathname]);


  const downloadImage = async (url, prompt = "generated-art") => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${prompt.replace(/\s+/g, "-")}.png`; // dynamic filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <div className="h-screen">
      <Navbar />
      <div className="bg-gradient-to-b from-purple-600 to-blue-900 pt-10 md:min-h-[90%] ">
        {loading ? <div className="w-full h-80 ">
          loading
        </div> : <div className=" w-[70%] mx-auto flex flex-wrap justify-center gap-8  ">
          {imagesData.map((item) => {
            return <div key={item._id} className="  flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-[320px]">
              <div className=" text-white text-lg font-semibold text-center mb-3 drop-shadow">{item.prompt}</div>
              <img src={item.imageUrl} alt="image" className="mx-auto w-[300px] h-[300px] object-cover rounded-xl" />

              <button
                onClick={() => downloadImage(item.imageUrl, item.prompt)}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:scale-105"
              >
                Download Image
              </button>

            </div>
          })}
        </div>}
      </div>
    </div>
  )
};

export default Gallery;
