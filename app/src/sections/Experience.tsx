import { useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/motion/Reveal';
import { useParallax } from '../components/motion/useParallax';
import { experiences } from '../data/experience';
import { SECTION_IDS } from '../data/navigation';
import { ACCENT, BORDER, SURFACE, TEXT_BODY, TEXT_MUTED } from '../theme/colors';

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // 0 when the timeline's top is 75% down the screen, 1 when its bottom reaches 60%
  const progress = useParallax(timelineRef, 0, 1, ['start 75%', 'end 60%']);
  const lineScale = useSpring(progress, { stiffness: 120, damping: 30 });

  return (
    <Box id={SECTION_IDS.experience} sx={{
        paddingTop: 12,
        paddingBottom: 6,
        }}>
      <Container maxWidth="md">
        <SectionTitle
          eyebrow="Where I've worked"
          title="EXPERIENCE"
          subtitle="Jobs I've held and what I did in each one."
        />

        <Box ref={timelineRef} sx={{ position: 'relative', pl: { xs: 4, md: 6 } }}>
          {/* Faint track, with the blue line filling it as the user scrolls */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 10, md: 18 },
              top: 0,
              bottom: 0,
              width: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(56,189,248,0.1)',
            }}
          />
          <Box
            component={motion.div}
            style={{ scaleY: reduceMotion ? 1 : lineScale }}
            sx={{
              position: 'absolute',
              left: { xs: 10, md: 18 },
              top: 0,
              bottom: 0,
              width: 3,
              borderRadius: 2,
              background: `linear-gradient(${ACCENT}, rgba(56,189,248,0.1))`,
              transformOrigin: 'top',
            }}
          />

          {experiences.map((item, i) => (
            <Reveal key={`${item.company}-${item.period}`} direction="left" delay={i * 0.15}>
              <Box sx={{ position: 'relative', mb: 5 }}>
                {/* Timeline dot */}
                <Box
                  component={motion.div}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
                  sx={{
                    position: 'absolute',
                    left: { xs: -30, md: -38 },
                    top: 24,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: ACCENT,
                    boxShadow: '0 0 0 6px rgba(56,189,248,0.18)',
                  }}
                />

                <Box
                  component={motion.div}
                  whileHover={{ x: 6 }}
                  sx={{
                    backgroundColor: SURFACE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 4,
                    p: { xs: 2.5, md: 3.5 },
                    boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                    borderLeft: `4px solid ${ACCENT}`,
                  }}
                >
                  <Typography sx={{ color: ACCENT, fontWeight: 700, fontSize: 14, mb: 0.5 }}>
                    {item.period}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {item.role}
                  </Typography>
                  <Typography sx={{ color: TEXT_MUTED, mb: 1.5 }}>
                    {item.company}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5, color: TEXT_BODY }}>
                    {item.highlights.map((highlight) => (
                      <Typography component="li" variant="body2" key={highlight} sx={{ mb: 0.5 }}>
                        {highlight}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;
