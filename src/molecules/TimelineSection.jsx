import React from "react";
import Polaroid from "../atoms/Polaroid";

const TimelineSection = ({ background, index }) => {
  return (
    <section className={`w-full h-screen bg-middle flex-center gap-12`} style={{backgroundImage: `url(${background})`}}>
      {index % 2 === 0 ? (
        <>
          <div className="flex-center">
            <Polaroid
              caption={"04/04/2025"}
              badge={"/badges/cheese-badge.png"}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-brownist text-5xl">First Polaroid</h1>
            <h3 className="font-pretty text-2xl">text appears here</h3>
            <h3 className="font-pretty text-2xl">text appears here</h3>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <h1 className="font-brownist text-5xl">First Polaroid</h1>
            <h3 className="font-pretty text-2xl">text appears here</h3>
            <h3 className="font-pretty text-2xl">text appears here</h3>
          </div>
          <div className="flex-center">
            <Polaroid
              caption={"04/04/2025"}
              badge={"/badges/cheese-badge.png"}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default TimelineSection;
