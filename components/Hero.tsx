"use client";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const Hero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  const backgroundImage = useMotionTemplate`linear-gradient(to bottom, #020617 0%, #020617 50%, ${color} 100%)`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={
        {
          // backgroundImage,
        }
      }
      className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200"
    >
      <div
        className="absolute inset-0 -z-20 h-full w-full pointer-events-none"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center mb-64">
        <h1 className="max-w-5xl bg-gradient-to-b from-gray-200 to-gray-500 bg-clip-text text-center text-4xl font-semibold leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Practice Tech Interviews with a Talking AI
        </h1>
        <p className="my-6 max-w-2xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Simulate real interviews with an AI that asks questions, listens to
          your answers, and gives instant voice feedback — anytime, anywhere.
        </p>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          Start Your AI Interview
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>
    </motion.section>
  );
};
