import React from "react";
import './MessageUI.css';

/**
 * 
 * @param {Object} params
 * @param {string} params.text 
 * @returns JSX.Element
 */
const MessageUI = ({ text }) => {
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

    return (
        <pre className="message-ui">
            {parts.map((part, i) => {
                let processedPart = [];
                if (part) {
                    // Dividimos el texto en palabras para aplicar las detecciones
                    const words = part.split(/(\s+)/); // Incluye separadores como espacios
                    processedPart = words.map((word, index) => {
                        if (word.match(urlRegex)) {
                            return (
                                <a key={index} href={word} target="_blank" rel="noopener noreferrer">
                                    {word}
                                </a>
                            );
                        }
                        if (word.match(emailRegex)) {
                            return (
                                <a key={index} href={`mailto:${word}`}>
                                    {word}
                                </a>
                            );
                        }
                        if (word.match(phoneRegex)) {
                            const cleanedNumber = word.replace(/[\s-]/g, "");
                            return (
                                <a key={index} href={`tel:${cleanedNumber}`}>
                                    {word}
                                </a>
                            );
                        }
                        return <span key={index}>{word}</span>;
                    });
                }

                return (
                    <React.Fragment key={i}>
                        {processedPart}
                        {emojis[i] && (
                            <span className="emoji" key={`emoji-${i}`}>
                                {emojis[i][0]}
                            </span>
                        )}
                    </React.Fragment>
                );
            })}
        </pre>
    );
};

export default MessageUI;
