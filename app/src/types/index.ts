import type { SvgIconComponent } from "@mui/icons-material";

export interface NavItem {
  label: string;
  to: string;
}

export interface ProjectImage {
  src: string;
  caption: string;
  // CSS object-position; defaults to "top" so page headers stay in view
  position?: string;
}

export interface Project {
  id: number;
  title: string;
  // Year(s) the project was built, shown as a badge on the card
  year: string;
  date: string;
  avatar: string;
  images: ProjectImage[];
  shortDescription: string;
  details: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
}

export interface TechnicalSkill {
  src: string;
  alt: string;
  // Icon size in px inside its circle; for logos with extra built-in padding
  size?: number;
}

export interface SoftSkill {
  Icon: SvgIconComponent;
  label: string;
}

export interface SocialLink {
  Icon: SvgIconComponent;
  href: string;
  color: string;
}

export interface ContactItem {
  Icon: SvgIconComponent;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}
