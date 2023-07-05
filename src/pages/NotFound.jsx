import React from 'react';

const NotFound = () => {
  // #1A1A1B
  return (
    <body style={{backgroundColor: "#EEEEEE", width: "100vw", display: "flex", alignItems: "center", flexDirection: "column", fontFamily: "'Nunito Sans', sans-serif;", gap: "1rem"}}>
      <header style={{width: "100vw", fontSize: "30px", color: "#1A1A1B", padding: "1rem", fontWeight: "800"}}>SALAXER</header>
      <h1 style={{fontSize: "25px", color: "#1A1A1B", }} className='title'>Hola Persona!</h1>
      <p style={{fontSize: "18px"}}>Muchas gracias por ponerte en contacto conmigo</p>
      <p style={{fontSize: "18px", paddingBottom: "10rem"}}>Muy pronto me estare poniendo en contacto contigo, si es de manera urgente, por favor contesta este correo dejando su numero de celular para una comunicacion mas rapida</p>
      <footer style={{width: "100vw", fontSize: "17px", color: "#1A1A1B", padding: "1rem", display: "flex", justifyContent: "space-around"}}><p>Saludos y Gracias</p> <p> Made with ❤ by Salaxer</p></footer>
    </body>
    // <div className="all" style={{color: 'white'}}>
    //   Hola como estas no hay nada aqui :) saludos
    // </div>
  );
};

export default NotFound;