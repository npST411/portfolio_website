import type { NavItem } from "../types";

// Element ids of each section, used for scroll navigation
export const SECTION_IDS = {
  about: "about",
  skill: "skill",
  project: "project",
  experience: "experience",
  contact: "contact",
} as const;

export const navItems: NavItem[] = [
  { label: "About Me", to: SECTION_IDS.about },
  { label: "Skills", to: SECTION_IDS.skill },
  { label: "Projects", to: SECTION_IDS.project },
  { label: "Experience", to: SECTION_IDS.experience },
  { label: "Contact", to: SECTION_IDS.contact },
];
