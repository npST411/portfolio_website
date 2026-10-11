import { useRef } from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../motion/variants";
import { useParallax } from "../motion/useParallax";
import { ACCENT, TEXT_BODY } from "../../theme/colors";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionTitle = ({ eyebrow, title, subtitle, align = "center" }: SectionTitleProps) => {
  const centered = align === "center";
  const ref = useRef<HTMLDivElement>(null);
  // The backdrop word drifts sideways while the title passes through the screen
  const backdropX = useParallax(ref, centered ? 120 : 60, centered ? -120 : -180);

  return (
    <div ref={ref} style={{ position: "relative", marginBottom: 64 }}>
      <motion.div
        aria-hidden
        style={{
          x: backdropX,
          position: "absolute",
          top: "50%",
          left: centered ? "50%" : 0,
          translateY: "-50%",
          translateX: centered ? "-50%" : 0,
          fontSize: "clamp(4rem, 13vw, 9rem)",
          fontWeight: 900,
          letterSpacing: "6px",
          lineHeight: 1,
          whiteSpace: "nowrap",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(56,189,248,0.12)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {title}
      </motion.div>

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ textAlign: align, position: "relative", zIndex: 1 }}
      >
        {eyebrow && (
          <motion.div variants={fadeUp}>
            <Typography
              sx={{
                color: ACCENT,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "4px",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              {eyebrow}
            </Typography>
          </motion.div>
        )}

        <motion.div variants={fadeUp}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ letterSpacing: "3px", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
          >
            {title}
          </Typography>
        </motion.div>

        {/* Accent bar that grows out under the title */}
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
          }}
          style={{
            height: 4,
            width: 64,
            borderRadius: 2,
            background: ACCENT,
            margin: centered ? "16px auto 0" : "16px 0 0",
            transformOrigin: centered ? "center" : "left",
          }}
        />

        {subtitle && (
          <motion.div variants={fadeUp}>
            <Typography
              sx={{
                mt: 2,
                color: TEXT_BODY,
                maxWidth: 560,
                mx: centered ? "auto" : 0,
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </Typography>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SectionTitle;
