import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import ImageCarousel from "./ImageCarousel";
import type { Project } from "../../types";

interface ProjectLightboxProps {
  project: Project;
  open: boolean;
  startIndex: number;
  onClose: () => void;
}

// Full-size view of a project's images; arrow keys also change the slide
const ProjectLightbox = ({ project, open, startIndex, onClose }: ProjectLightboxProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: { backgroundColor: "#111", borderRadius: 4, overflow: "hidden" },
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 1.5,
          }}
        >
          <Typography sx={{ color: "#fff", fontWeight: 700 }}>{project.title}</Typography>
          <IconButton aria-label="Close" onClick={onClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* key resets the carousel to the clicked image each time it opens */}
        <ImageCarousel
          key={`${project.id}-${startIndex}-${open}`}
          images={project.images}
          title={project.title}
          height={{ xs: "55vh", md: "75vh" }}
          fit="contain"
          background="#111"
          initialIndex={startIndex}
          keyboard={open}
        />
      </motion.div>
    </Dialog>
  );
};

export default ProjectLightbox;
