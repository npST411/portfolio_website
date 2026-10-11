import { motion, useScroll, useSpring } from "framer-motion";
import { ACCENT } from "../../theme/colors";

// Thin bar along the top of the page that fills as the user scrolls
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: ACCENT,
        transformOrigin: "0%",
        zIndex: 1301, // above the MUI AppBar
      }}
    />
  );
};

export default ScrollProgress;
