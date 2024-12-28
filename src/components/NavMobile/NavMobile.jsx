import React, { useEffect, useRef, useState} from "react";
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";
import { motion } from "framer-motion";
import './navMobile.css'

const sidebar = {
  open: () => ({
    clipPath: `circle(1100px at  275px 25px)`,
    transition: {
      type: "spring",
      stiffness: 100, // Rigidez moderada
      damping: 20,    // Amortiguación que reduce el rebote
      mass: 0.8,       // Masa ligera para un movimiento ágil
      restDelta: 0.05 //opcional, pero ayuda a suavizar el final
    }
  }),
  closed: {
    clipPath: `circle(22px at 275px 25px)`,
    transition: {
      type: "spring",
      stiffness: 100, // Misma rigidez que al abrir para consistencia
      damping: 20,    // Misma amortiguación para consistencia
      mass: 0.8,       // Misma masa para consistencia
      restDelta: 0.05, //opcional, pero ayuda a suavizar el final
      delay: 0       // Generalmente no se necesita delay en el cerrado para una mejor UX
    }
  }
};

const NavMobile = () =>{
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const toggleOpen = () =>{
      setOpen(open ? false : true);
  }

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target) && open) {
      toggleOpen(); // Cierra el navbar si el clic fue afuera
    }
  };

  useEffect(() => {
    // Agregar listener al hacer clic en el documento
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }else{
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // Eliminar el listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <motion.nav
      initial={false}
      animate={open ? "open" : "closed"}
      ref={containerRef}
      className="navMobile"
    >
      <Navigation toggle={() => toggleOpen()} open={open}/>
      <motion.div className="backgroundNav" variants={sidebar} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
}
export default NavMobile