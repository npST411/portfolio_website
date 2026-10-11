import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { scroller } from "react-scroll";
import { navItems, SECTION_IDS } from "../../data/navigation";
import { ACCENT, BORDER, TEXT } from "../../theme/colors";

const MotionAppBar = motion.create(AppBar);

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS.about);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // While a menu click is scrolling the page, keep the bar visible
  const autoScrollUntil = useRef(0);

  // Hide the bar when scrolling down, bring it back when scrolling up
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    if (Date.now() < autoScrollUntil.current) return setHidden(false);
    setHidden(latest > previous && latest > 200);
  });

  // Highlight the section that sits in the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    navItems.forEach(({ to }) => {
      const section = document.getElementById(to);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleScrollTo = (to: string) => {
    autoScrollUntil.current = Date.now() + 900;
    scroller.scrollTo(to, {
      smooth: true,
      duration: 600,
    });
    setActiveSection(to);
    handleMenuClose();
  };

  return (
    <MotionAppBar
      position="fixed"
      elevation={4}
      initial={{ y: -90, opacity: 0 }}
      // Hidden: slide past the top edge, including the gap above the bar
      animate={{ y: hidden && !anchorEl ? -140 : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      sx={{
        // Floating pill centred at the top instead of a full-width bar
        top: { xs: 10, md: 16 },
        left: 0,
        right: 0,
        mx: "auto",
        width: "calc(100% - 24px)",
        maxWidth: 1000,
        borderRadius: 999,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
        border: `1px solid ${BORDER}`,
        // Slimmer and more solid once the page has scrolled
        backgroundColor: scrolled ? "rgba(22, 27, 34, 0.95)" : "rgba(22, 27, 34, 0.75)",
        backdropFilter: "blur(8px)",
        padding: scrolled ? "0px" : "4px 0px",
        transition: "padding 0.3s ease, background-color 0.3s ease",
      }}
    >
      <Box sx={{ px: { xs: 2.5, md: 4 } }}>
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleScrollTo(SECTION_IDS.about)}
            sx={{ flexGrow: 1, fontWeight: "bold", color: ACCENT, cursor: "pointer" }}
          >
            <span style={{ color: TEXT }}>PORT</span>FOLIO
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 4 }}>
            {navItems.map(({ label, to }) => {
              const isActive = activeSection === to;

              return (
                <Button
                  key={to}
                  onClick={() => handleScrollTo(to)}
                  sx={{
                    fontSize: "16px",
                    textTransform: "none",
                    position: "relative",
                    color: isActive ? ACCENT : TEXT,
                    fontWeight: isActive ? "bold" : "normal",
                    transition: "color 0.3s",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      left: 0,
                      bottom: -4,
                      backgroundColor: "rgba(255,255,255,0.5)",
                      transition: "width 0.3s ease-in-out",
                      borderRadius: 1,
                    },
                    "&:hover::after": {
                      width: isActive ? "0%" : "100%",
                    },
                  }}
                >
                  {label}
                  {isActive && (
                    // Shared layoutId makes the underline slide between items
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -4,
                        height: 2,
                        borderRadius: 1,
                        background: ACCENT,
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", lg: "none" }, ml: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ color: TEXT }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {navItems.map(({ label, to }) => (
                <MenuItem
                  key={to}
                  onClick={() => handleScrollTo(to)}
                  selected={activeSection === to}
                  sx={{
                    fontWeight: activeSection === to ? "bold" : "normal",
                  }}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </MotionAppBar>
  );
};

export default NavBar;
