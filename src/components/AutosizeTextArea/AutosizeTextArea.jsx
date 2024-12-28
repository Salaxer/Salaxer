import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AutoSizeTextArea.css'
import MobileDetect from 'mobile-detect';

const TextareaAutoSize = (
    { 
        placeholder = "Type a message", 
        onChange = (text) => {} ,
        EnterDown = (e) => {},
        value = ""
    }) => {
    const md = new MobileDetect(window.navigator.userAgent);
    const isMobile = md.mobile(); // Detecta si es móvil
    const textareaRef = useRef(null);

    useEffect(() => {
        resizeTextarea();
    }, [value]); // Ajusta el tamaño cuando el texto cambia

    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Resetea la altura para calcular correctamente
            const newHeight = Math.min(textareaRef.current.scrollHeight, 150); // Ajusta al mínimo entre scrollHeight y 150px
            if (newHeight === 150) {
                textareaRef.current.style.overflow = "auto"
            }else{
                textareaRef.current.style.overflow = "hidden"
            }
            textareaRef.current.style.height = `${newHeight + 4}px`;
        }
    };

    const handleKeyDown = (event) => {
        const trimmed = value.trim();
        if (event.key === 'Enter' && !event.shiftKey && trimmed !== "" && !isMobile) {
            event.preventDefault(); // Previene el salto de línea
            EnterDown(event)
        }
    };

    return (
        <motion.textarea
            ref={textareaRef}
            placeholder={placeholder}
            style={{ overflow: 'hidden', resize: 'none', maxHeight: '150px'}}
            id='inputText'
            value={value}
            onChange={(event) => {onChange(event)}}
            className="AutoSizeTextArea"
            autoComplete="off"
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            rows={1}
        >
        </motion.textarea>
    );
};

export default TextareaAutoSize;