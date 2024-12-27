import React, { useContext, useEffect, useRef, useState } from 'react';
import { Loader, MessageUI } from '../../components';
import { db } from '../../api/firebaseConfig';
import { collection, query, orderBy, onSnapshot, limit, startAfter, getDocs } from "firebase/firestore";
import { AuthContext } from '../../state/AuthContext';
import NotificationContext from '../../state/NotificationContext';
import { add } from '../../utils/array';
import { Helmet } from 'react-helmet-async';
import SendMessage from './SendMessage';
import ScrollAndAlertMessages from './ScrollAndAlertMessages';
import './Chat.css'

const chatId = "bUbprjBpmDP9XaqmB9GzGFt0Opi2_iWA64CUm2SZj0Meo2jS3hP6ScRU2"

const Chat = () => {
    const { currentUser } = useContext(AuthContext);

    const contextNotification = useContext(NotificationContext);
    const [startAfterMessage, setStartAfterMessage] = useState(null);
    const [loadingMoreMessages, setLoadingMoreMessages] = useState(false)
    const [isUserReadingMessages, setIsUserReadingMessages] = useState(false);
    const [newMessagesWithoutRead, setNewMessagesWithoutRead] = useState(false);
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);

    // Configurando Query reusable
    const getQuery = (doc) => {
        const messageLimit = 40;
        const messagesRef = collection(db, "Chats", chatId, "Messages");
        if (doc) {
            return query(messagesRef, orderBy("timestamp", "desc"), limit(messageLimit), startAfter(doc));
        }else{
            return query(messagesRef, orderBy("timestamp", "desc"), limit(messageLimit));
        }
    };

    // Cargar y configurar suscripción en tiempo real
    useEffect(() => {
        const q =  getQuery();
        const unsubscribe = onSnapshot(q, 
        (snapshot) => {
            const newMessages = snapshot.docs.map(doc => ({ id: doc.id, doc, ...doc.data() }));
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
            setIsUserReadingMessages((current) => {
                // Only checking current value of User
                if (current) {
                    setNewMessagesWithoutRead(true);
                }
                return current
            })
        }, (error) => {
            contextNotification.add(add(contextNotification.list, {
                id: Date.now(),
                title: 'Error',
                message: `Error al cargar mensajes recientes: ${error}`,
                life: 4000,
            }));
        });
        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMoreMessages = async () => {
        if (!startAfterMessage) return;
        console.log("Getting more messages");
        const q = getQuery(startAfterMessage)
        const querySnapshot = await getDocs(q);
        const newMessages = querySnapshot.docs.map(doc => ({ id: doc.id, doc, ...doc.data() }));
        setMessages(prevMessages => {
            const newArray = prevMessages.concat(newMessages)
            return newArray;
        });
    }
    
    // Desplazar el scroll al fondo solo después de cargar los nuevos mensajes
    useEffect(() => {
        if (messages.length > 0) {
            const doc = messages[messages.length - 1]?.doc;
            setStartAfterMessage(doc ? doc : null);
            console.log("last_Message: ", doc.data());
            setLoadingMoreMessages(false)
        }
        if (!isUserReadingMessages) {
            scrollToBottom();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    // Detectar scroll hacia arriba con un delay para no llamar la función varias veces
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => func(...args), delay);
        };
    };

    const onScrollUserController = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const isScrollingToTop = scrollHeight + scrollTop <= clientHeight + 50;
        if (isScrollingToTop && !loadingMoreMessages) {
            getMoreMessages();
            setLoadingMoreMessages(true)
        }
        if (500 + scrollTop <= 0) {
            setIsUserReadingMessages(true)
        }else{
            setIsUserReadingMessages(false)
            setNewMessagesWithoutRead(false)
        }
    }
    const debouncedScroll = debounce(onScrollUserController, 500);

    // Función para desplazar al fondo
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            setNewMessagesWithoutRead(false);
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
                    onScroll={debouncedScroll}
                    ref={chatContainerRef} >
                {
                    messages.map((msg, i) => 
                    <MessageUI 
                    key={msg.id} 
                    id={msg.id}
                    text={msg.content} 
                    isSameSender={currentUser.uid === msg.sender} 
                    sender={msg.sender} 
                    nextMessageIsFromDiffUser={ (i !== messages.length - 1) ? msg.sender !== messages[i + 1].sender : true}
                    timestamp={msg.timestamp} />) 
                }
                { loadingMoreMessages && 
                    <div className='messages_loader'>
                        <Loader  background={"transparent"} position={"relative"} color={"white"}/>
                    </div>
                }
                </section>
                <ScrollAndAlertMessages 
                newMessage={newMessagesWithoutRead}
                isScrolling={isUserReadingMessages} 
                onClick={scrollToBottom}></ScrollAndAlertMessages>
                <SendMessage chatId={chatId} currentUser={currentUser}/>
            </div>
        </>
    );
};


// aver falta:

// Guardar mensajes ✔️
// Hacer paginado ✔️
// Hacer reply doing
// Enviar stickers 
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