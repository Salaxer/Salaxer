import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AutoSizeTextArea.css'
const TextareaAutoSize = (
    { 
        placeholder = "Type a message", 
        onChange = (text) => {} ,
        EnterDown = () => {},
        value = ""
    }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        resizeTextarea();
    }, [value]); // Ajusta el tamaño cuando el texto cambia

    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Resetea la altura para calcular correctamente
            const newHeight = Math.min(textareaRef.current.scrollHeight, 150); // Ajusta al mínimo entre scrollHeight y 150px
            textareaRef.current.style.height = `${newHeight}px`;
        }
    };

    const handleKeyDown = (event) => {
        const trimmed = value.trim()
        if (event.key === 'Enter' && !event.shiftKey && trimmed !== "") {
            event.preventDefault(); // Previene el salto de línea
            EnterDown()
        }
    };

    return (
        <motion.textarea
            placeholder={placeholder}
            style={{ overflow: 'hidden', resize: 'none', maxHeight: '150px'}}
            ref={textareaRef}
            id='inputText'
            value={value}
            onChange={(event) => {onChange(event.target.value)}}
            className="AutoSizeTextArea"
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
        </motion.textarea>
    );
};

export default TextareaAutoSize;