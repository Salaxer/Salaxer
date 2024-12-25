import React, { useRef, useState} from "react";
import { Navigation } from "../Navigation";
import { MenuToggle } from "../MenuToggle";
import { motion } from "framer-motion";
import './navMobile.css'

const sidebar = {
    open: () => ({
      clipPath: `circle(100vh at  259px 31px)`,
      transition: {
        type: "spring",
        stiffness: 100,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: `circle(20px at  259px 31px)`,
      transition: {
        delay: 1,
        type: "spring",
        stiffness: 111,
        damping: 111
      }
    }
  };

const NavMobile = () =>{
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const toggleOpen = () =>{
      setOpen(open ? false : true);
  }
  return (
    <motion.nav
      initial={false}
      animate={open ? "open" : "closed"}
      ref={containerRef}
    >
      <Navigation toggle={() => toggleOpen()} open={open}/>
      <motion.div className="backgroundNav" variants={sidebar} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
}
export default NavMobile