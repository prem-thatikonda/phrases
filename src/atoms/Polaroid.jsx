import React from "react";
import { Image } from "lucide-react";

const Polaroid = ({ imageUrl, caption, badge, width = "w-64" }) => {
  return (
    <div className={`${width} bg-gray-100 p-4 shadow-lg rounded-sm relative`}>
      {/* Badge container */}
      <div className="absolute w-20 h-16 -top-4 -right-5 bg-transparent text-white px-2 py-1 rounded-tl-sm">
        {badge ? (
          <img
            src={badge}
            alt={caption}
            className="w-[90%] h-[90%] object-cover hover:animate-sway"
          />
        ) : (
          <></>
        )}
      </div>
      {/* Image container */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center mb-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={caption}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image className="w-12 h-12 text-gray-400" />
        )}
      </div>

      {/* Caption */}
      <div className="text-center font-cursive text-gray-800 min-h-[2rem]">
        {caption}
      </div>
    </div>
  );
};

export default Polaroid;
