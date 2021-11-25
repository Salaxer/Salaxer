import React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemIds = [
  {
    path: '/',
    name: 'About me',
    a: false,
  },
  {
    path: '/works',
    name: 'Works',
    a: false,
  },
  {
    path: '/contact',
    name: 'Contact me',
    a: false,
  },
  {
    path: 'https://github.com/Salaxer/Salaxer',
    name: 'Source',
    a: true,
  }
];

export const Navigation = () => (
  <motion.ul className="ulNavigation" variants={variants}>
    {itemIds.map((item, index) => (
      <MenuItem item={item} index={index} key={index} />
    ))}
  </motion.ul>
);
