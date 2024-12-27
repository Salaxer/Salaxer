import React from "react";
import './MessageUI.css';
import { motion } from 'framer-motion';
import formatTimestamp from '../../utils/formatTimestamp'

/**
 * 
 * @param {Object} params
 * @param {string} params.id
 * @param {string} params.text 
 * @param {boolean} params.isSameSender 
 * @param {string} params.sender
 * @param {string} params.timestamp
 * @param {boolean} params.nextMessageIsFromDiffUser
 * @returns JSX.Element
 */
const MessageUI = (
    { text, sender, isSameSender, timestamp, nextMessageIsFromDiffUser, id }) => {
    if (!text) {
        return ""
    }
    // 1. Detectar enlaces http/https
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // 2. Detectar correos (básico)
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    // 3. Detectar teléfonos (básico: internacional o local con/sin separadores)
    const phoneRegex = /(\+?\d[\d\s-]{6,}\d)/g;
    // 4. Detectar emojis
    const emojiRegex = /\p{Extended_Pictographic}/gu;
    // Procesar el texto dividiéndolo entre partes (texto normal y emojis)
    const parts = text.split(emojiRegex);
    const emojis = [...text.matchAll(emojiRegex)];
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    const horaFormateada = timestamp ? formatTimestamp(timestamp?.toDate()) : "Enviando...";

    const handleDragEnd = (_event, info) => {
        if (info.offset.x > 100) {
            console.log("Lo mueve a la izquierda");
        }else if (info.offset.x < -100) {
          console.log("Lo mueve a la derecha");
        }
    };

    return (
        <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        transition={{ 
            duration: 0.8,
        }}
        className={`message ${isSameSender ? "from" : "to"} ${nextMessageIsFromDiffUser ? "otherUser" : ""}`} >
            <p className='username'>{sender}</p>
                <pre className="message-ui">
                    {parts.map((part, i) => {
                        let processedPart = [];
                        // Dividimos el texto en palabras para aplicar las detecciones
                        const words = part.split(/(\s+)/); // Incluye separadores como espacios
                        processedPart = words.map((word, index) => {
                            if (word.match(urlRegex)) {
                                return (
                                    <a key={`${id}_${word}_${index}`} href={word} target="_blank" rel="noopener noreferrer">
                                        {word}
                                    </a>
                                );
                            }
                            if (word.match(emailRegex)) {
                                return (
                                    <a key={`${id}_${word}_${index}`} href={`mailto:${word}`}>
                                        {word}
                                    </a>
                                );
                            }
                            if (word.match(phoneRegex)) {
                                const cleanedNumber = word.replace(/[\s-]/g, "");
                                return (
                                    <a key={`${id}_${word}_${index}`} href={`tel:${cleanedNumber}`}>
                                        {word}
                                    </a>
                                );
                            }
                            return <React.Fragment key={`${id}_${word}_${index}`}>{word}</React.Fragment>;
                        });
                        return (
                            <React.Fragment key={`${id}_${i}`}>
                                {processedPart}
                                {(emojis[i] ) && (
                                    (
                                        isIOS ? 
                                        (<span style={{verticalAlign: "middle"}}>{emojis[i][0]}</span>)
                                        :
                                        (<span className="emoji" key={`emoji-${i}`}>{emojis[i][0]}</span>)
                                    )
                                ) }
                            </React.Fragment>
                        );
                    })}
                </pre>
            <p className='datetime'>{horaFormateada}</p>
        </motion.div>
    );
};

export default MessageUI;
