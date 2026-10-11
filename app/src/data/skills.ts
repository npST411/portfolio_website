import {
  AccessTime,
  Autorenew,
  EmojiObjects,
  Group,
  Psychology,
  RecordVoiceOver,
} from "@mui/icons-material";
import type { SoftSkill, TechnicalSkill } from "../types";

export const technicalSkills: TechnicalSkill[] = [
  { src: "/assets/Skills/html.png", alt: "HTML" },
  { src: "/assets/Skills/css-3.png", alt: "CSS" },
  { src: "/assets/Skills/js.png", alt: "JavaScript" },
  { src: "/assets/Skills/typescript.png", alt: "TypeScript" },
  { src: "/assets/Skills/react.png", alt: "React" },
  { src: "/assets/Skills/material_ui.png", alt: "Material UI" },
  { src: "/assets/Skills/programing.png", alt: "MySQL" },
  { src: "/assets/Skills/postgresql.svg", alt: "PostgreSQL" },
  { src: "/assets/Skills/docker.svg", alt: "Docker", size: 64 },
];

export const softSkills: SoftSkill[] = [
  { Icon: Group, label: "Teamwork" },
  { Icon: RecordVoiceOver, label: "Communication" },
  { Icon: Psychology, label: "Problem-Solving" },
  { Icon: Autorenew, label: "Adaptability" },
  { Icon: EmojiObjects, label: "Creativity" },
  { Icon: AccessTime, label: "Time Management" },
];
