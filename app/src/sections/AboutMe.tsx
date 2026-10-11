import { useRef, useState } from "react";
import { Box, Typography, Container, Avatar, IconButton } from "@mui/material";
import { motion, useTransform } from "framer-motion";
import Reveal from "../components/motion/Reveal";
import Typewriter from "../components/motion/Typewriter";
import { useParallax } from "../components/motion/useParallax";
import { fadeUp, stagger } from "../components/motion/variants";
import { socialLinks } from "../data/socialLinks";
import { SECTION_IDS } from "../data/navigation";
import { ACCENT, ACCENT_LIGHT, BG, BORDER, ON_ACCENT, SURFACE, SURFACE_RAISED, TEXT, TEXT_BODY } from "../theme/colors";

// Progress runs from 0 at the top of the page to 1 when the hero has scrolled away
const HERO_OFFSET = ["start start", "end start"] as const;

// Titles the badge under the avatar takes turns showing
const ROLES = ["Web Developer", "AI Engineer"];

const AboutMe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  // Layers move at different speeds while scrolling, which gives the hero depth
  const avatarY = useParallax(ref, 0, 60, [...HERO_OFFSET]);
  const shrink = useParallax(ref, 0, 0.12, [...HERO_OFFSET]);
  const avatarScale = useTransform(shrink, (v) => 1 - v);
  const textY = useParallax(ref, 0, 40, [...HERO_OFFSET]);
  // Both blobs drift upwards (at different speeds) so neither hits the section's bottom edge
  const blobFastY = useParallax(ref, 0, -220, [...HERO_OFFSET]);
  const blobSlowY = useParallax(ref, 0, -110, [...HERO_OFFSET]);
  const fade = useParallax(ref, 0, 1.4, [...HERO_OFFSET]);
  const textOpacity = useTransform(fade, (v) => Math.max(0, 1 - v));
  // Background photo scrolls slower than the content
  const bgY = useParallax(ref, 0, 160, [...HERO_OFFSET]);

  return (
    <Box
      ref={ref}
      id={SECTION_IDS.about}
      sx={{
        position: "relative",
        paddingTop: { xs: "140px", md: "200px" },
        paddingBottom: 10,
        overflow: "hidden",
      }}
    >
      {/* Background photo, washed out towards the page colour so the text stays readable */}
      <Box
        component={motion.div}
        aria-hidden
        style={{ y: bgY }}
        sx={{
          position: "absolute",
          top: "-10%",
          left: 0,
          right: 0,
          bottom: "-10%",
          backgroundImage: "url(/assets/bg/Pic-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            `linear-gradient(180deg, rgba(14,17,22,0.62) 0%, rgba(14,17,22,0.72) 45%, rgba(14,17,22,0.9) 80%, ${BG} 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Soft background blobs */}
      <Box
        component={motion.div}
        animate={{ x: [0, 40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: blobFastY }}
        sx={{
          position: "absolute",
          top: 80,
          left: "-10%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        component={motion.div}
        animate={{ x: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: blobSlowY }}
        sx={{
          position: "absolute",
          bottom: 40,
          right: "-8%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(125,211,252,0.14), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 0 },
          }}
        >
          {/* Profile picture */}
          <Box
            component={motion.div}
            style={{ y: avatarY, scale: avatarScale }}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "relative" }}
              >
                {/* Spinning gradient ring behind the avatar */}
                <Box
                  component={motion.div}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  sx={{
                    position: "absolute",
                    inset: -8,
                    borderRadius: "50%",
                    background: `conic-gradient(${ACCENT}, ${ACCENT_LIGHT}, transparent 60%, ${ACCENT})`,
                  }}
                />
                <Avatar
                  alt="Napat Sae-tieo"
                  src="/assets/napat.jpg"
                  sx={{
                    position: "relative",
                    width: { xs: 200, md: 300 },
                    height: { xs: 200, md: 300 },
                    border: `6px solid ${BG}`,
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Badge is revealed left to right, holds, then wiped away right to left.
                Each pass ends by switching to the next title; the new key replays the animation.
                No opacity fade, so the wipe edge stays crisp. The clip-path still plays with
                "reduce motion" on (only the x slide is dropped). */}
            <motion.div
              key={roleIndex}
              onAnimationComplete={() => setRoleIndex((i) => (i + 1) % ROLES.length)}
              initial={{ x: -60, clipPath: "inset(-60% 100% -60% -20%)" }}
              animate={{
                x: [-60, 0, 0, -60],
                clipPath: [
                  "inset(-60% 100% -60% -20%)",
                  "inset(-60% -20% -60% -20%)",
                  "inset(-60% -20% -60% -20%)",
                  "inset(-60% 100% -60% -20%)",
                ],
              }}
              transition={{
                duration: 4,
                times: [0, 0.18, 0.82, 1],
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{ marginTop: 24 }}
            >
              <Box
                sx={{
                  backgroundColor: ACCENT,
                  color: ON_ACCENT,
                  px: 3,
                  py: 1.5,
                  borderRadius: "0 20px 20px 0",
                  fontWeight: "bold",
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  boxShadow: "0 8px 20px rgba(56,189,248,0.3)",
                }}
              >
                {ROLES[roleIndex]}
              </Box>
            </motion.div>
          </Box>

          {/* Intro text */}
          <Box
            component={motion.div}
            variants={stagger(0.15, 0.3)}
            initial="hidden"
            animate="visible"
            style={{ y: textY, opacity: textOpacity }}
            sx={{
              flex: 1,
              padding: 3,
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.3rem" },
              textAlign: { xs: "center", md: "left" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <motion.div variants={fadeUp}>
              <Typography
                sx={{
                  color: ACCENT,
                  fontWeight: 700,
                  letterSpacing: "4px",
                  fontSize: 14,
                  mb: 1,
                }}
              >
                HELLO THERE
              </Typography>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Typography
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "1.8rem",
                    sm: "2.5rem",
                    md: "3rem",
                  },
                  whiteSpace: "nowrap",
                }}
              >
                I'M <Typewriter words={["NAPAT SAE-TIEO"]} color={ACCENT} />
              </Typography>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, mb: 2, maxWidth: 520, color: TEXT_BODY }}
              >
                I'm a web developer. I build front ends in React and TypeScript,
                and I use Material UI for most of the components. This site is
                built with the same stack.
              </Typography>
            </motion.div>

            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map(({ Icon, href, color }) => (
                <motion.div
                  key={href}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color,
                      backgroundColor: SURFACE_RAISED,
                      border: `1px solid ${BORDER}`,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                      "&:hover": { backgroundColor: SURFACE_RAISED },
                    }}
                  >
                    <Icon />
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Motto marquee */}
      <Container maxWidth="md" sx={{ mt: 8, overflow: "hidden", position: "relative" }}>
        <Reveal>
          <Box
            sx={{
              borderRadius: "16px",
              px: 2,
              py: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              position: "relative",
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            }}
          >
            <Box
              sx={{
                display: "inline-block",
                paddingLeft: "100%",
                animation: "marqueeScroll 15s linear infinite",
                color: TEXT,
                fontSize: { xs: "1rem", md: "1.2rem" },
                fontStyle: "italic",
                fontWeight: "bold",
                "@keyframes marqueeScroll": {
                  "0%": { transform: "translateX(0%)" },
                  "100%": { transform: "translateX(-100%)" },
                },
              }}
            >
              <Typography component="span" sx={{ color: ACCENT, mr: 2, fontWeight: "bold" }}>
                My Motto:
              </Typography>
              <Typography component="span">
                "Push yourself, because no one else is going to do it for you."
              </Typography>
            </Box>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
};

export default AboutMe;
