import React from "react"
import { motion } from 'framer-motion';
import './ScrollAndAlertMessages.css'

const variants = {
    open: {
        width: "70px",
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        }
    },
    closed: {
        width: "34px",
        
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const ScrollAndAlertMessages = ({ newMessage = false, isScrolling = false, onClick}) => {

    return (
        <div className="scrollAndAlertMessages_container">
            {isScrolling && 
            <motion.button 
                onClick={onClick}
                variants={variants}
                animate={newMessage ? "open" : "closed"}
                className={`scrollAndAlertMessages_button ${newMessage ? "ring" : ""}`}>
                { newMessage && <p>New</p> }
                <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="scrollAndAlertMessages_button_svg"
                >
                    {/* Flecha superior */}
                    <motion.path
                    d="M7 8 L12 13 L17 8"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    /* Animación: pequeña traslación vertical (bounce) */
                    animate={{
                        y: [-1, 3, 0],
                    }}
                    transition={{
                        duration: 1,       // Duración de un ciclo
                        repeat: 4,  // Se repite para siempre
                        ease: 'easeInOut',
                    }}
                    />

                    {/* Flecha inferior */}
                    <motion.path
                    d="M7 14 L12 19 L17 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    /* Animación idéntica (puedes modificar el delay si deseas desfase) */
                    animate={{
                        y: [-1, 3, 0],
                    }}
                    transition={{
                        duration: 1,
                        repeat: 4,
                        ease: 'easeInOut',
                    }}
                    />
                </svg>
            </motion.button>
            }
        </div>
    )
}

export default ScrollAndAlertMessages