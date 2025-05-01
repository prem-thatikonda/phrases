import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Polaroid from "../atoms/Polaroid";
import { ChevronDownCircleIcon } from "lucide-react";

const Hero = () => {
  const polaroidData = useMemo(
    () => [
      {
        imageUrl: "/photos/photo1.jpg",
        badge: "/badges/cheese-badge.png",
        width: "w-60",
        position: "absolute top-2 left-0 rotate-6 max-w-[90vw]",
      },
      {
        imageUrl: "/photos/photo2.jpg",
        badge: "/badges/cookie-badge.png",
        width: "w-60",
        position: "absolute bottom-4 right-12 rotate-12 max-w-[90vw]",
      },
      {
        imageUrl: "/photos/photo3.jpg",
        badge: "/badges/watermelon-badge.png",
        width: "w-52",
        position: "absolute top-4 right-12 -rotate-6 max-w-[90vw]",
      },
      {
        imageUrl: "/photos/photo4.jpg",
        badge: "/badges/heart-badge.png",
        width: "w-56",
        position: "absolute bottom-4 left-4 -rotate-12 max-w-[90vw]",
      },
    ],
    []
  );

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `url('/backgrounds/main-background.jpg')`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const polaroidVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const [text, setText] = useState("");
  const fullText = "Made just for you, with all of me ᢉ𐭩";
  const colors = [
    "#590D22",
    "#52B788",
    "#08BDBD",
    "#B892FF",
    "#ffbe0b",
    "#E86252",
    "#ff8fab",
    "#723d46",
    "#FF0A54",
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const words = text.split(" ");

  return (
    <section
      className="w-full min-h-[100dvh] bg-middle flex-center gap-12 relative overflow-hidden pb-20"
      style={backgroundStyle}
    >
      <h1 className="font-magazine text-8xl text-center leading-32 z-10 max-w-[90vw] mx-auto">
        {words.map((word, index) => (
          <React.Fragment key={index}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ color: colors[index % colors.length] }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="absolute inset-0"
      >
        {polaroidData.map((data, index) => (
          <motion.div
            key={index}
            className={data.position}
            variants={polaroidVariants}
          >
            <Polaroid
              imageUrl={data.imageUrl}
              badge={data.badge}
              width={data.width}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDownCircleIcon size={40} />
      </div>
    </section>
  );
};

export default React.memo(Hero);
