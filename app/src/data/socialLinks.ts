import { Facebook, GitHub, LinkedIn } from "@mui/icons-material";
import type { SocialLink } from "../types";

export const socialLinks: SocialLink[] = [
  {
    Icon: LinkedIn,
    href: "https://www.linkedin.com/in/napat-sae-tieo-4822b1362/",
    color: "#0a66c2",
  },
  {
    Icon: GitHub,
    href: "https://github.com/npST411",
    // GitHub's black mark would vanish on the dark page
    color: "#F0F3F6",
  },
  {
    Icon: Facebook,
    href: "https://web.facebook.com/bewooy.oorye/",
    color: "#1877f2",
  },
];
