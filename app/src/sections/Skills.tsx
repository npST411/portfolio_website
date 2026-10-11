import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "../components/common/SectionTitle";
import Reveal from "../components/motion/Reveal";
import { popIn, stagger, viewportOnce } from "../components/motion/variants";
import { softSkills, technicalSkills } from "../data/skills";
import { SECTION_IDS } from "../data/navigation";
import { ACCENT, BORDER, SURFACE_RAISED, TEXT_BODY } from "../theme/colors";

const iconBoxStyle = {
  bgcolor: SURFACE_RAISED,
  border: `1px solid ${BORDER}`,
  borderRadius: "50%",
  boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
  width: { xs: 70, md: 80 },
  height: { xs: 70, md: 80 },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "box-shadow 0.3s",
  "&:hover": { boxShadow: "0 8px 24px rgba(56,189,248,0.35)" },
};

const softSkillIconStyle = { fontSize: { xs: 36, md: 44 }, color: ACCENT };

const groupTitleStyle = {
  textAlign: { xs: "center", md: "left" },
  lineHeight: 1.2,
  minWidth: 180,
} as const;

const Skills = () => {
  return (
    <Box
      id={SECTION_IDS.skill}
      sx={{
        paddingTop: 15,
        paddingBottom: 4,
      }}
    >
      <Container maxWidth="md">
        <SectionTitle
          eyebrow="What I work with"
          title="MY SKILLS"
          subtitle="The languages and tools I write code with, and the habits I bring to a team."
        />
      </Container>

      {/* Technical skills */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row-reverse" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 4, md: 6 },
          }}
        >
          <Reveal direction="right" style={{ flexShrink: 0 }}>
            <Typography
              variant="h4"
              fontWeight="900"
              sx={{ ...groupTitleStyle, textAlign: { xs: "center", md: "right" } }}
            >
              TECHNICAL
              <br />
              <span style={{ color: ACCENT }}>SKILLS</span>
            </Typography>
          </Reveal>

          <Box
            component={motion.div}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
              gap: 3,
              // Room for five icons per row
              maxWidth: 520,
            }}
          >
            {technicalSkills.map((skill, i) => (
              <motion.div key={skill.alt} variants={popIn}>
                {/* Offset each icon's float so they don't move in lockstep */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  title={skill.alt}
                  style={{ borderRadius: "50%" }}
                >
                  <Box sx={iconBoxStyle}>
                    <img
                      src={skill.src}
                      alt={skill.alt}
                      style={{ width: skill.size ?? 50, height: skill.size ?? 50, objectFit: "contain" }}
                    />
                  </Box>
                </motion.div>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Soft skills */}
      <Container maxWidth="md" sx={{ mb: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 4, md: 6 },
          }}
        >
          <Reveal direction="left" style={{ flexShrink: 0 }}>
            <Typography variant="h4" fontWeight="900" sx={groupTitleStyle}>
              SOFT
              <br />
              <span style={{ color: ACCENT }}>SKILLS</span>
            </Typography>
          </Reveal>

          <Box
            component={motion.div}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-end" },
              gap: 3,
              maxWidth: 430,
            }}
          >
            {softSkills.map(({ Icon, label }) => (
              <motion.div
                key={label}
                variants={popIn}
                whileHover={{ y: -8 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: TEXT_BODY,
                  alignItems: "center",
                  gap: 8,
                  cursor: "default",
                  minWidth: 90,
                }}
              >
                <Box sx={iconBoxStyle}>
                  <Icon sx={softSkillIconStyle} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    userSelect: "none",
                  }}
                >
                  {label}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;
