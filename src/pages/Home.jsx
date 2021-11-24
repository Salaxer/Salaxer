import React from 'react';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="viewUser" style={{color:"white"}}>
        <div className="containerImg">
          <img src="" alt="hector salazar" />

        </div>
        <div className="personalInformation">
          <div className="backgroundForText">
            <h1 className="Name">
              Hector Miguel Salazar Doroteo
            </h1>
          </div>
          <div className="whoiam">
            <p>Hi!, I'm Hector Salazar and welcome to my webpage</p>
            <p>I'm a FrontEnd Developer and Mechatronic Engieneer</p>
          </div>
        </div>
        <div className="Three">

        </div>

    </div>
  );
};

export default Home;