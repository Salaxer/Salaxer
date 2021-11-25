import React from "react";
import { motion } from "framer-motion";

const Animation = () =>{
    const list = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }
    
    const item = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    }
      
    return (
    <motion.ul
        initial="hidden"
        animate="visible"
        variants={list}
    >
        <motion.li variants={item}>Hola como estas</motion.li>
        <motion.li variants={item} />
        <motion.li variants={item} />
    </motion.ul>
    )
}

export default Animation;