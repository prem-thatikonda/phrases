import React, { useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Phrase from "../atoms/Phrase.jsx";
import jars from "../constants/jars.js";
import phrases from "../constants/phrases.js";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ClickSpark from "../atoms/ClickSpark";
import { useRef } from "react";

const PhraseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedMood, setSelectedMood] = useState(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const moods = useMemo(
    () => [
      "Happy Jar",
      "Proud Jar",
      "Sad Jar",
      "Alone Jar",
      "Need Reassurance Jar",
      "Anxious Jar",
      "Not Feeling Heard Jar",
    ],
    []
  );

  const getMoodIndex = useCallback(
    (moodName) => {
      return moods.indexOf(moodName);
    },
    [moods]
  );

  const handleNext = useCallback(() => {
    setDirection(1);
    const currentMoodPhrases = phrases[getMoodIndex(selectedMood)];
    setCurrentPhraseIndex((prev) =>
      prev === currentMoodPhrases.length - 1 ? 0 : prev + 1
    );
  }, [selectedMood, getMoodIndex]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    const currentMoodPhrases = phrases[getMoodIndex(selectedMood)];
    setCurrentPhraseIndex((prev) =>
      prev === 0 ? currentMoodPhrases.length - 1 : prev - 1
    );
  }, [selectedMood, getMoodIndex]);

  const handleJarClick = useCallback((jarName) => {
    setSelectedMood(jarName);
    setCurrentPhraseIndex(0);
  }, []);

  const jarAnimationVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  const containerVariants = useMemo(
    () => ({
      visible: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  return (
    <ClickSpark
      sparkColor="#ffbe0b"
      sparkSize={22}
      sparkRadius={12}
      sparkCount={8}
      duration={400}
    >
      <section
        ref={ref}
        className={`w-full min-h-screen py-20 px-32 flex flex-col items-center gap-8 bg-middle`}
        style={{
          backgroundImage: `url('/backgrounds/main-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-gothic font-semibold">
          How do you feel right now?
        </h1>

        {/* TABLE BACKGROUND WITH JARS */}
        <div className="w-[900px] h-[100px] bg-contain bg-no-repeat bg-bottom relative">
          <motion.div
            className="absolute left-0 w-full flex justify-around items-end px-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {jars.map((jar, index) => (
              <motion.div
                key={jar.name}
                variants={jarAnimationVariants}
                whileTap={{ scale: 0.9 }}
                animate={
                  selectedMood === jar.name
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, -10, 10, 0],
                        transition: {
                          duration: 0.5,
                          ease: "easeInOut",
                        },
                      }
                    : {
                        scale: 1,
                        rotate: 0,
                      }
                }
                onClick={() => handleJarClick(jar.name)}
                className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform group relative"
              >
                {/* Bubbles */}
                <div
                  className={`absolute ${
                    (index % 2) + 1 === 1
                      ? `-top-6 w-8 h-8`
                      : `-top-8 w-12 h-12`
                  } pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  style={{
                    backgroundImage: `url('/jars/bubbles-${
                      (index % 2) + 1
                    }.png')`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                />

                <img
                  src={jar.image}
                  alt={jar.label}
                  className="w-20 h-24 object-contain"
                />

                {/* Tooltip */}
                <div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-md shadow-md text-center
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-sm"
                >
                  {jar.name.split(" ").length <= 2
                    ? jar.name.split(" ")[0]
                    : jar.name.split(" ").slice(0, -1).join(" ")}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CARDS APPEAR ON MOOD SELECTION */}
        <div className="w-[90%] h-[500px] border-2 border-white/80 p-6 rounded-xl shadow-md relative">
          {selectedMood ? (
            <motion.div
              key={selectedMood}
              className="relative h-full flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <button
                onClick={handlePrev}
                className="absolute cursor-pointer left-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="w-full h-full flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentPhraseIndex}
                    initial={{
                      opacity: 0,
                      x: direction === 1 ? 100 : -100,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: direction === 1 ? -100 : 100,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="w-full"
                  >
                    <Phrase
                      phrase={
                        phrases[getMoodIndex(selectedMood)][currentPhraseIndex]
                          .text
                      }
                      color={
                        phrases[getMoodIndex(selectedMood)][currentPhraseIndex]
                          .color
                      }
                      textColor={
                        phrases[getMoodIndex(selectedMood)][currentPhraseIndex]
                          .textColor
                      }
                      className="w-full h-full max-w-2xl mx-auto flex items-center justify-center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={handleNext}
                className="absolute cursor-pointer right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          ) : (
            <p className="text-gray-500 text-center text-2xl mt-10">
              Pick a jar to see what's inside{" "}
              <span className="text-3xl">💌</span>
            </p>
          )}
        </div>
      </section>
    </ClickSpark>
  );
};

export default React.memo(PhraseSection);
