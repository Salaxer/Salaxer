import React from "react";
import { motion } from "framer-motion";


const MovingArrow = ({ direction = "right", delay = 0}) => {
  return (
    <div style={{ position: "relative", overflow: "hidden", width: "150px", height: "50px" }}>
      {/* Flecha */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          rotate: (direction === "right") ? "0deg" : "180deg" 
        }}
        initial={{ x: 0 }}
        animate={{
          x: (direction === "right") ? [0, 100, 100, 0, 100, 100, 0, 100] : [100, 0, 0, 100, 0, 0, 100, 0], // Posiciones clave
          opacity: [0, 1, 0, 0, 1, 0, 0, 1], // Valores de opacidad en cada paso
        }}
        transition={{
          duration: 4, // Tiempo total de la animación
          delay,
          times: [0, 0.31, 0.32, 0.33, 0.64, 0.65, 0.66, 1], // Tiempos relativos (0% -> 25% -> 50% -> 100%)
          ease: "easeInOut", // Efecto de suavizado
        }}
        onAnimationComplete={() => console.log("Animation complete")}
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </motion.svg>
    </div>
  );
};

export default MovingArrow;
