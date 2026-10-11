import * as React from "react";
import { Box, Container } from "@mui/material";
import ProjectCard from "./ProjectCard";
import SectionTitle from "../../components/common/SectionTitle";
import Reveal from "../../components/motion/Reveal";
import { projects } from "../../data/projects";
import { SECTION_IDS } from "../../data/navigation";

export default function Projects() {
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  const handleExpandClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box
      id={SECTION_IDS.project}
      sx={{ paddingTop: 12, paddingBottom: 10 }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow="Selected work"
          title="PROJECTS"
          subtitle="Things I've built, newest first. Click a screenshot to see it full size, or Read more for the details."
          align="left"
        />

        {/* First project spans the full width, the rest sit two per row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 4,
            // Cards in a row share one height so their buttons line up
            alignItems: "stretch",
          }}
        >
          {projects.map((project, i) => (
            <Box
              key={project.id}
              sx={{ gridColumn: i === 0 ? { xs: "auto", sm: "1 / -1" } : "auto", minWidth: 0 }}
            >
              <Reveal delay={i === 0 ? 0 : ((i - 1) % 2) * 0.15} style={{ height: "100%" }}>
                <ProjectCard
                  project={project}
                  expanded={expandedId === project.id}
                  onExpand={handleExpandClick}
                  featured={i === 0}
                />
              </Reveal>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
