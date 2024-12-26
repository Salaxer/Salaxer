import './chat.css'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageUI, TextareaAutoSize } from '../../components';
import { db } from '../../api/firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, limit } from "firebase/firestore";
import { AuthContext } from '../../state/AuthContext';
import NotificationContext from '../../state/NotificationContext';
import { add } from '../../utils/array';
import { Helmet } from 'react-helmet-async';

const chatId = "bUbprjBpmDP9XaqmB9GzGFt0Opi2_iWA64CUm2SZj0Meo2jS3hP6ScRU2"

const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    const contextNotification = useContext(NotificationContext);
    const [newMessage, setNewMessage] = useState('');
    // const [startAfter, setStartAfter] = useState(null);
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

    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);

    // Cargar los últimos mensajes iniciales y configurar suscripción en tiempo real
    useEffect(() => {
        console.log("Chat ID:", chatId);
        const messagesRef = collection(db, "Chats", chatId, "Messages");
        const q = query(messagesRef, orderBy("timestamp", "desc"), limit(70));
        const unsubscribe = onSnapshot(q, 
        (snapshot) => {
            const newMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Actualizar el estado de los mensajes
            setMessages(prevMessages => {
                const messageMap = new Map(newMessages.map(msg => [msg.id, msg])); // Prioriza los nuevos mensajes
                prevMessages.forEach(msg => {
                    if (!messageMap.has(msg.id)) {
                        messageMap.set(msg.id, msg); // Agrega los mensajes existentes que no están en los nuevos
                    }
                });
                return Array.from(messageMap.values()); // Retorna los mensajes con los nuevos al inicio
            });

        }, (error) => {
            console.log(error);
            contextNotification.add(add(contextNotification.list, {
                id: Date.now(),
                title: 'Error',
                message: `Error al cargar mensajes recientes: ${error}`,
                life: 4000,
            }));
        });
        return () => unsubscribe();
    }, [contextNotification]);

    // Detectar scroll hacia arriba
    const handleScroll = (e) => {
        if (e.target.scrollTop === 0) {
        }
    };

    // Desplazar el scroll al fondo solo después de cargar los mensajes iniciales
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Función para desplazar al fondo
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    return (
        <>
            <Helmet>
                <title>Salaxer | Chat me</title>
                <meta name="description" content="You can chat in real time with me here"/>
                <meta name="twitter:title" content="Salaxer | Chat me"/>
                <meta property="og:type" content="Contact me"/> 
                <meta property="og:description" content="I am a Software Developer and currently on certification process of Mechatronics engineering, You can chat to me here"/>
                <link rel="canonical" href="https://salaxer.com/"/>
            </Helmet>
            <div className="container" style={{color: 'white'}}>
                <section 
                    className='messages' 
                    onScroll={handleScroll}
                    ref={chatContainerRef} >
                {
                    messages.map((msg, i) => 
                    <MessageUI 
                        key={`${msg.id}${i}`} 
                        text={msg.content} 
                        isSameSender={currentUser.uid === msg.sender} 
                        sender={msg.sender} 
                        lastMessageWasFromSameUser={ (i !== 0) ? msg.sender === messages[i - 1].sender : false}
                        timestamp={msg.timestamp} />) 
                }
                </section>
                <section className='input'>
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
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            >
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg> 
                    </motion.button>
                </section>
            </div>
        </>
    );
};

// aver falta:

// Guardar mensajes
// Hacer paginado
// Enviar stickers
// Hacer reply
// Poner leidos
// Cambiar colores 
// Editar los mensajes
// Mandar imagenes
// Mandar audios
// barra de busqueda
// ver galeria
// Reacciones
// Cuando alguien escribe

export default Chat;