import { TextareaAutoSize } from '../../components';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import React, { useState, useContext } from 'react';
import NotificationContext from '../../state/NotificationContext';
import { db } from '../../api/firebaseConfig';
import { add } from '../../utils/array';
import './SendMessage.css'

const SendMessage = ({ chatId, currentUser }) =>{
    const [newMessage, setNewMessage] = useState('');
    const contextNotification = useContext(NotificationContext);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        const messagesRef = collection(db, "Chats", chatId, "Messages");
        try {
            setNewMessage("")
            await addDoc(messagesRef, {
                content: newMessage.trim(),
                sender: currentUser.uid,
                timestamp: serverTimestamp(),
            });
            console.log("Mensaje enviado");
        } catch (error) {
            contextNotification.add(add(contextNotification.list, {
                id: Date.now(),
                title: 'Error',
                message: error,
                life: 4000,
            })); 
            console.error("Error al enviar el mensaje:", error);
        }
    };

    return <section className='input'>
        <TextareaAutoSize 
        EnterDown={handleSendMessage} 
        onChange={(t) => setNewMessage(t)}
        value={newMessage}>
        </TextareaAutoSize>
        <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleSendMessage}
        className="send"
        >
             <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                {/*
                    Forma del “avión” (un estilo parecido al de WhatsApp),
                    pero apuntando horizontalmente a la derecha:
                    M7,12 (inicio izq)
                    L16,8 (punta arriba-derecha)
                    L13,12 (centro de la derecha)
                    L16,16 (punta abajo-derecha)
                    Z (cierra la figura)
                */}
                <path
                    d="M22 12 L5 2 L10 12 L5 22 Z"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                />
                <line
                    x1="9" y1="12" x2="11" y2="12"
                    stroke="var(--textColor)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
                />
            </svg>
        </motion.button>
    </section>
}

export default SendMessage