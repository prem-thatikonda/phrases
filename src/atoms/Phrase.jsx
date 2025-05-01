import React from "react";

const Phrase = ({ phrase, color, textColor, className = "" }) => {
  return (
    <div
      className={`p-6 rounded-none ${className} font-pretty text-4xl leading-14`}
      style={{ backgroundColor: color, color: textColor }}
    >
      {phrase}
    </div>
  );
};

export default Phrase;
