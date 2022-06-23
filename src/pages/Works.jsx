import React from "react";
import { useState } from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { wrap } from "popmotion";
import WorksDetails from '../components/WorksDetails'
import { Helmet } from 'react-helmet-async';

import '../styles/works.css'

const images = [
  {
    name: `Restaurante Doña Martha`,
    images: 'https://i.ibb.co/xfPzbsv/sign.png',
    imagesPrev: ['https://i.ibb.co/d6j9W9S/me.png', 'https://i.ibb.co/p07ZSWJ/mobile.png'],
    description: 'A web page where the user can view the content of the menu, as well as the offers. additionally the user can register and this be able to save their favorite food.',
    url: 'https://donamartha.com.mx/',
  },
  {
    name: '100tifi.co',
    images: 'https://i.ibb.co/Kz9nj0p/Menu.png',
    imagesPrev: ['https://i.ibb.co/Kz9nj0p/Menu.png', 'https://i.ibb.co/SdwYMNv/item.png'],
    description: 'API consumption from a Single Page Aplication',
    url: 'https://salaxer.github.io/100tifi.co/',
  },
  {
    name: 'Fingerprint',
    images: 'https://i.ibb.co/S57jtkm/ssssmenu.png',
    imagesPrev: ['https://i.ibb.co/5KJc00f/sssinicio.png', 'https://i.ibb.co/b24MBsc/ssssinicio-es.png'],
    description: 'Telemonitoring of an IoT device which captures fingerprints, saves them in a real-time database and the results are displayed on a web page',
    url: '',
  },
  {
    name: 'Game Simon Say',
    images: 'https://i.ibb.co/Bn2vw6P/eeeinicio.png',
    imagesPrev: ['https://i.ibb.co/ZTH33vD/eeefail.png', 'https://i.ibb.co/M9ngRH0/eeeproccess.png'],
    description: 'A very popular among us game in which you have to memorize the random steps that the machine does',
    url: 'https://salaxer.github.io/',
  },
  {
    name: 'Platzi badges',
    images: 'https://i.ibb.co/xhMq6qy/inicio.png',
    imagesPrev: ['https://i.ibb.co/6r65Xxx/muestra.png', 'https://i.ibb.co/FDkYLJJ/muestra-mobi.png'],
    description: 'platzi badges is a site in which people register their entry to an event, this is connected to an API which saves the information',
    url: '',
  },
  {
    name: 'Desing of automatic window',
    images: 'https://i.ibb.co/s5dG6Tw/Ensamblaje-2-1.gif',
    imagesPrev: ['https://i.ibb.co/Xt0Q4tV/1-1.png','https://i.ibb.co/wLGTKKh/2-1.png'],
    description: 'Vehicle window design, this design only protrudes 25mm and can stay open up to 56%',
    url: ''
  },
  {
    name: 'prototype of a hoverboard',
    images: 'https://i.ibb.co/CWMfhm5/1.png',
    imagesPrev: ['https://i.ibb.co/R3JL8jX/2.png','https://i.ibb.co/cQNq19M/3.png'],
    description: 'This is a design of a hoverboard prototype implementing PID control for the automatic balance of the wheels programmed in arduino.',
    url: ''
  },
  {
    name: 'NextJS Personal blog',
    images: 'https://i.ibb.co/0Q7ksg8/vercel-Trueblog.png',
    imagesPrev: ['https://i.ibb.co/Vvp5XZP/vercelshop.png', 'https://i.ibb.co/yRGKzsp/vercelblog.png', 'https://i.ibb.co/ZJQhZG7/vercelblogmobile.png'],
    description: 'it was created for learning purpose, but also to show you how to create Static Site Generation for better performance',
    url: 'https://nextjs-blog-30kk56f54-salaxer.vercel.app/',
  },
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  enterShow: (direction) => {
    return {
      y: -120,
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
  },
  show:{
    zIndex: 1,
    y: -120,
    x: 0,
    opacity: 1,
    scale: 0.7
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  exitShow: (direction) => {
    return {
      y: -120,
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Works = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [details, setDetails] = useCycle(false, true);
  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  // const meta = {
  //   title: 'Salaxer | My Works',
  //   description: 'You can see the works of Salaxer, with a slide of images',
  // }
  return (
      <div className="viewWorks">
        <Helmet>
          <title>Salaxer | My Works</title>
          <meta name="description" content="You can see the works of Salaxer, with a slide of images"/>
          <meta name="twitter:card" content="home"/>
          <meta name="twitter:title" content="Salaxer | My Works"/>
          <meta property="og:type" content="My Works"/> 
          <meta property="og:description" content="I am a Software Developer and currently on certification process of Mechatronics engineering, You can see the works of Salaxer, with a slide of images"/>
          <link rel="canonical" href="https://salaxer.com/"/>
        </Helmet>
        <div className="containerWorks">
          <AnimatePresence initial={false} custom={direction}>
              <motion.img
                tabIndex={0}
                key={page}
                src={images[imageIndex].images}
                custom={direction}
                variants={variants}
                initial={details ? "enterShow" : "enter"}
                animate={details ? "show" : "center"}
                exit={details ? "exitShow" : "exit"}
                className="imgForSlides"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag={"x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDrag={(e)=>e.target.style.cursor = 'grabbing'}
                onDragEnd={(e, { offset, velocity }) => {
                  e.target.style.cursor = 'grab'
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                alt={`web page with title: ${images[imageIndex].name}`}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={setDetails}
                className="linkToWorks buttonDetails"
              >
                {details ? <p>hide details</p> : <p>Show Details</p> }
              </motion.button>
          </AnimatePresence>
          <AnimatePresence exitBeforeEnter >
          {details ? <WorksDetails positi={imageIndex} data={images}/> : 
            <motion.div
              className="buttonsImg"
              key="aa"
              initial={{y: 20, opacity: 0}}
              animate={{ y: 0, opacity: 1}}
              transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              exit={{opacity: 0,  y: 20}}
              >
                <button 
                  tabIndex={0}
                  aria-label="next work"
                  className="next"  onClick={() => paginate(1)}>
                  {"‣"}
                </button>
                <button
                tabIndex={0}
                aria-label="previous work"
                className="prev" onClick={() => paginate(-1)}>
                  {"‣"}
                </button>
            </motion.div>
          }
          </AnimatePresence>
          
        </div>
      </div>
  );
};

export default Works;