import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { viewportOnce } from "./variants";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  style?: CSSProperties;
}

const offsets = {
  up: { y: 32 },
  left: { x: -60 },
  right: { x: 60 },
};

// Fades and slides its children in the first time they scroll into view
const Reveal = ({ children, delay = 0, direction = "up", style }: RevealProps) => {
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
