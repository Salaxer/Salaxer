import { motion } from "framer-motion";
import React from "react";

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => (
  <button id="toggleNavar" className="buttonNav" onClick={toggle}>
    <svg width="25" height="25" viewBox="0 0 24 24">
      <Path 
        stroke="var(--textColor)"
        variants={{
          closed: { d: "M 2 2 L 22 2" },
          open: { d: "M 2 22 L 22 2" }
        }}
      />
      <Path
        stroke="var(--textColor)"
        d="M 2 12 L 22 12"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        stroke="var(--textColor)"
        variants={{
          closed: { d: "M 2 22 L 22 22" },
          open: { d: "M 2 2 L 22 22" }
        }}
      />
    </svg>
  </button>
);
