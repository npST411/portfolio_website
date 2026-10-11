import { EmailOutlined, LocationOnOutlined, PhoneOutlined } from "@mui/icons-material";
import type { ContactItem } from "../types";

// From the header of Napat_Saetieo_Resume.pdf. The street address is left out on
// purpose: the site is public, so only the district is shown.
export const contactItems: ContactItem[] = [
  {
    Icon: EmailOutlined,
    label: "Email",
    value: "napat.st4112@gmail.com",
    href: "mailto:napat.st4112@gmail.com",
    copyable: true,
  },
  {
    Icon: PhoneOutlined,
    label: "Phone",
    value: "+66 96 358 8736",
    href: "tel:+66963588736",
    copyable: true,
  },
  {
    Icon: LocationOnOutlined,
    label: "Location",
    value: "Yan Nawa, Bangkok, Thailand",
  },
];
