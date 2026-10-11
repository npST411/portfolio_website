import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  words: string[];
  color: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  // How long a finished word stays on screen before it is deleted
  pause?: number;
}

// Types each word, holds it, deletes it, then moves on to the next one, forever.
// It runs even with "reduce motion" on: letters appear in place and nothing moves across the screen.
const Typewriter = ({ words, color, typeSpeed = 110, deleteSpeed = 55, pause = 1800 }: TypewriterProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const word = words[wordIndex % words.length];
  const holding = !deleting && length === word.length;

  useEffect(() => {
    let delay = deleting ? deleteSpeed : typeSpeed;
    if (holding) delay = pause;
    else if (deleting && length === 0) delay = 400;

    const timer = setTimeout(() => {
      if (holding) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [deleting, holding, length, words.length, typeSpeed, deleteSpeed, pause]);

  const shown = word.slice(0, length);
  // Blink only while idle; a real cursor stays solid while keys are being pressed
  const idle = holding || (deleting && length === 0);

  const cursorStyle = {
    display: "inline-block",
    width: "0.08em",
    height: "0.9em",
    marginLeft: "0.08em",
    verticalAlign: "-0.08em",
    borderRadius: 2,
    backgroundColor: color,
  };

  return (
    // Both children share one grid cell: the invisible full word reserves the
    // width, so the surrounding line doesn't shift while letters come and go
    <span aria-label={word} style={{ display: "inline-grid", color, whiteSpace: "nowrap" }}>
      <span aria-hidden style={{ gridArea: "1 / 1", visibility: "hidden" }}>
        {word}
        <span style={cursorStyle} />
      </span>
      <span aria-hidden style={{ gridArea: "1 / 1", textAlign: "left" }}>
        {shown}
        <motion.span
          animate={idle ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
          transition={idle ? { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] } : { duration: 0 }}
          style={cursorStyle}
        />
      </span>
    </span>
  );
};

export default Typewriter;
