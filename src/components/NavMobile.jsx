import React, { useRef, useState} from "react";
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";
import { motion } from "framer-motion";
import '../styles/navMobile.css'

const sidebar = {
    open: () => ({
      clipPath: `circle(130vh at  259px 31px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: `circle(${20}px at  259px 31px)`,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

const NavMobile = () =>{
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    console.log(open);
    const toggleOpen = () =>{
        setOpen(open ? false : true);
    }

  return (
    <motion.nav
      initial={false}
      animate={open ? "open" : "closed"}
      ref={containerRef}
      custom={""}
    >
      <Navigation/>
      <motion.div className="backgroundNav" variants={sidebar} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
}
export default NavMobile