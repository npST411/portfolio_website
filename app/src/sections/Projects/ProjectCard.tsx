import * as React from "react";
import { Box, Button, Chip, Collapse, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import ImageCarousel from "./ImageCarousel";
import ProjectLightbox from "./ProjectLightbox";
import type { Project } from "../../types";
import {
  ACCENT,
  ACCENT_DARK,
  BORDER,
  ON_ACCENT,
  SURFACE,
  SURFACE_RAISED,
  TEXT,
  TEXT_BODY,
  TEXT_MUTED,
} from "../../theme/colors";

interface ProjectCardProps {
  project: Project;
  expanded: boolean;
  onExpand: (id: number) => void;
  featured?: boolean;
}

const linkButtonStyle = {
  borderRadius: 999,
  px: 2,
  fontWeight: 600,
  color: TEXT,
  borderColor: "rgba(240,246,252,0.2)",
  "&:hover": { borderColor: ACCENT, color: ACCENT, backgroundColor: "rgba(56,189,248,0.04)" },
} as const;

export default function ProjectCard({ project, expanded, onExpand, featured = false }: ProjectCardProps) {
  // Index of the image open in the lightbox, or null when it is closed
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ height: "100%" }}
    >
      <Box
        component="article"
        sx={{
          height: "100%",
          display: "flex",
          // The featured card puts its images beside the text on wide screens
          flexDirection: { xs: "column", md: featured ? "row" : "column" },
          backgroundColor: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
          transition: "box-shadow 0.3s",
          "&:hover": { boxShadow: "0 12px 28px rgba(56,189,248,0.18)" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
            width: { xs: "100%", md: featured ? "58%" : "100%" },
            minHeight: { md: featured ? 420 : "auto" },
          }}
        >
          <ImageCarousel
            images={project.images}
            title={project.title}
            height={featured ? { xs: 230, md: "100%" } : 220}
            onImageClick={setLightboxIndex}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: { xs: 2.5, md: featured ? 4 : 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 1.5 }}>
            {featured && (
              <Chip
                label="LATEST"
                size="small"
                sx={{ fontWeight: 700, letterSpacing: "1px", color: ON_ACCENT, backgroundColor: ACCENT }}
              />
            )}
            <Chip
              label={project.year}
              title="Year developed"
              size="small"
              sx={{ fontWeight: 700, color: ACCENT, backgroundColor: "rgba(56,189,248,0.1)" }}
            />
            <Typography sx={{ fontSize: 13, color: TEXT_MUTED }}>{project.date}</Typography>
          </Box>

          <Typography
            component="h3"
            sx={{
              fontWeight: 800,
              color: TEXT,
              lineHeight: 1.3,
              fontSize: featured ? { xs: "1.3rem", md: "1.6rem" } : "1.15rem",
              mb: 1,
            }}
          >
            {project.title}
          </Typography>

          <Typography sx={{ color: TEXT_BODY, lineHeight: 1.7, fontSize: featured ? "1rem" : "0.92rem" }}>
            {project.shortDescription}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mt: 2 }}>
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ color: TEXT_BODY, backgroundColor: SURFACE_RAISED, fontWeight: 500 }}
              />
            ))}
          </Box>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography
              sx={{
                mt: 2,
                pl: 2,
                color: TEXT_MUTED,
                lineHeight: 1.75,
                fontSize: "0.92rem",
                borderLeft: `3px solid ${ACCENT}`,
              }}
            >
              {project.details}
            </Typography>
          </Collapse>

          {/* Links sit at the bottom so cards in the same row line up */}
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: "auto", pt: 2.5 }}>
            {project.repoUrl && (
              <Button
                variant="outlined"
                size="small"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon />}
                aria-label={`${project.title} source code on GitHub`}
                sx={linkButtonStyle}
              >
                Code
              </Button>
            )}
            {project.demoUrl && (
              <Button
                variant="outlined"
                size="small"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LaunchIcon />}
                aria-label={`Open ${project.title} live site`}
                sx={linkButtonStyle}
              >
                Live site
              </Button>
            )}
            {project.paperUrl && (
              <Button
                variant="contained"
                size="small"
                href={project.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<PictureAsPdfIcon />}
                disableElevation
                sx={{
                  borderRadius: 999,
                  px: 2,
                  fontWeight: 700,
                  color: ON_ACCENT,
                  backgroundColor: ACCENT,
                  "&:hover": { backgroundColor: ACCENT_DARK },
                }}
              >
                Research paper (PDF, Thai)
              </Button>
            )}

            <Button
              size="small"
              onClick={() => onExpand(project.id)}
              aria-expanded={expanded}
              endIcon={
                <ExpandMoreIcon
                  sx={{ transition: "transform 0.25s", transform: expanded ? "rotate(180deg)" : "none" }}
                />
              }
              sx={{ ml: "auto", fontWeight: 700, color: ACCENT, borderRadius: 999 }}
            >
              {expanded ? "Show less" : "Read more"}
            </Button>
          </Box>
        </Box>
      </Box>

      <ProjectLightbox
        project={project}
        open={lightboxIndex !== null}
        startIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
      />
    </motion.div>
  );
}
