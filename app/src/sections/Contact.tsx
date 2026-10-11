import { useRef, useState } from "react";
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "../components/common/SectionTitle";
import { useParallax } from "../components/motion/useParallax";
import { fadeUp, popIn, stagger, viewportOnce } from "../components/motion/variants";
import { contactItems } from "../data/contact";
import { socialLinks } from "../data/socialLinks";
import { SECTION_IDS } from "../data/navigation";
import { ACCENT, BG, BORDER, SURFACE, SURFACE_RAISED, TEXT, TEXT_MUTED } from "../theme/colors";

const Contact = () => {
  // Label of the item whose value was just copied, for the tick feedback
  const [copied, setCopied] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const bgY = useParallax(ref, -80, 80);

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied((current) => (current === label ? null : current)), 1500);
    } catch {
      // Clipboard can be blocked (e.g. non-HTTPS); the value is still visible to copy by hand
    }
  };

  return (
    <Box
      ref={ref}
      id={SECTION_IDS.contact}
      sx={{ position: "relative", overflow: "hidden", paddingTop: 12, paddingBottom: 20 }}
    >
      {/* Background photo that fades in from the section above */}
      <Box
        component={motion.div}
        aria-hidden
        style={{ y: bgY }}
        sx={{
          position: "absolute",
          top: "-15%",
          left: 0,
          right: 0,
          bottom: "-15%",
          backgroundImage: "url(/assets/bg/Pic-bg-2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            `linear-gradient(180deg, ${BG} 0%, rgba(14,17,22,0.85) 25%, rgba(14,17,22,0.65) 70%, rgba(14,17,22,0.55) 100%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative" }}>
        <SectionTitle
          eyebrow="Get in touch"
          title="CONTACT"
          subtitle="Email is the quickest way to reach me. You can also call or find me on the links below."
        />

        <Box
          component={motion.div}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {contactItems.map(({ Icon, label, value, href, copyable }) => (
            <Box
              key={label}
              component={motion.div}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              sx={{
                position: "relative",
                backgroundColor: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                transition: "box-shadow 0.3s",
                "&:hover": { boxShadow: "0 12px 28px rgba(56,189,248,0.18)" },
              }}
            >
              <Box
                component={motion.div}
                whileHover={{ rotate: [0, -12, 12, 0] }}
                transition={{ duration: 0.5 }}
                sx={{
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 1.5,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: ACCENT,
                  backgroundColor: "rgba(56,189,248,0.1)",
                }}
              >
                <Icon />
              </Box>
              <Typography sx={{ fontSize: 13, fontWeight: 700, letterSpacing: "2px", color: TEXT_MUTED, mb: 0.5 }}>
                {label.toUpperCase()}
              </Typography>
              {href ? (
                <Typography
                  component="a"
                  href={href}
                  sx={{
                    color: TEXT,
                    fontWeight: 600,
                    textDecoration: "none",
                    wordBreak: "break-word",
                    "&:hover": { color: ACCENT },
                  }}
                >
                  {value}
                </Typography>
              ) : (
                <Typography sx={{ color: TEXT, fontWeight: 600 }}>{value}</Typography>
              )}

              {copyable && (
                <Tooltip title={copied === label ? "Copied" : `Copy ${label.toLowerCase()}`}>
                  <IconButton
                    size="small"
                    aria-label={`Copy ${label.toLowerCase()}`}
                    onClick={() => handleCopy(label, value)}
                    sx={{ position: "absolute", top: 8, right: 8, color: copied === label ? "#4ADE80" : TEXT_MUTED }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={copied === label ? "done" : "copy"}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex" }}
                      >
                        {copied === label ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                      </motion.span>
                    </AnimatePresence>
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          ))}
        </Box>

        {/* Social links */}
        <Box
          component={motion.div}
          variants={stagger(0.1, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 6 }}
        >
          {socialLinks.map(({ Icon, href, color }) => (
            <motion.div key={href} variants={popIn} whileHover={{ y: -6, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color,
                  width: 52,
                  height: 52,
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
      </Container>
    </Box>
  );
};

export default Contact;
