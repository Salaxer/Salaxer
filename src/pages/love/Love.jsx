import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Love.css';
import MovingArrow from './MovingArrow';

const Love = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Hola",
      text: "Te amo mucho amorcito",
      question: "¿Me quieres?",
      response:{
        left: {
          label: "No",
          text: "",
          action: "keep"
        },
        right:{
          label: "Si",
          text: "",
          action: "left"
        },
      }
    },
    {
      title: "¿Como te la estas pasando?",
      text: "Amorcito, esta es una serie de preguntas que te hice para ti",
      question: "¿Estas lista?",
      response:{
        left: {
          label: "No quiero",
          text: "",
          action: "keep"
        },
        right:{
          label: "Si por favor",
          text: "",
          action: "left"
        },
      }
    }
  ];

  const handleDragEnd = (_event, info) => {
    if (info.offset.x > 100) {
      setCurrentSlide((prev) => {
        if (prev === 0) {
          return prev;
        }
        return prev - 1;
      });
    }else if (info.offset.x < -100) {
      setCurrentSlide((prev) => {
        if (prev >= slides.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }
  };

  useEffect(()=>{
    console.log(currentSlide);
  },[currentSlide])

  return (
    <div className="love-container">
        <motion.div
        className="slide"
        key={currentSlide}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {slides[currentSlide].title}
        </motion.h1>
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          {slides[currentSlide].text}
        </motion.h2>
        
        <motion.div
          className="options"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 4 }}
        >
          <div className="left">
            <MovingArrow delay={4} direction="left" />
            <span>{slides[currentSlide].response.left.label}</span>
          </div>
          <div className="right">
            <MovingArrow delay={4} />
            <span>{slides[currentSlide].response.right.label}</span>
          </div>
        </motion.div>
      </motion.div>
      
    </div>
  );
};

export default Love;
