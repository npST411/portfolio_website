import * as React from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AnimatePresence, motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import type { ProjectImage } from "../../types";
import { ACCENT, ON_ACCENT, SURFACE_RAISED } from "../../theme/colors";

interface ImageCarouselProps {
  images: ProjectImage[];
  title: string;
  // A number, a CSS value, or a responsive object such as { xs: 230, md: 420 }
  height: number | string | Partial<Record<"xs" | "sm" | "md" | "lg" | "xl", number | string>>;
  fit?: "cover" | "contain";
  initialIndex?: number;
  onImageClick?: (index: number) => void;
  onIndexChange?: (index: number) => void;
  keyboard?: boolean;
  // Shows behind the image while it loads and around it with fit="contain"
  background?: string;
}

// Slides in from the side the user is moving towards
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.04,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
  }),
};

// How hard a swipe has to be before it changes the slide
const SWIPE_THRESHOLD = 8000;

const arrowStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  color: "#fff",
  backgroundColor: "rgba(0,0,0,0.45)",
  backdropFilter: "blur(4px)",
  opacity: { xs: 1, md: 0 },
  transition: "opacity 0.3s, background-color 0.3s",
  "&:hover": { backgroundColor: ACCENT, color: ON_ACCENT },
} as const;

const ImageCarousel = ({
  images,
  title,
  height,
  fit = "cover",
  initialIndex = 0,
  onImageClick,
  onIndexChange,
  keyboard = false,
  background = SURFACE_RAISED,
}: ImageCarouselProps) => {
  const [[index, direction], setSlide] = React.useState<[number, number]>([initialIndex, 0]);
  const wasDragged = React.useRef(false);
  const count = images.length;

  const paginate = React.useCallback(
    (step: number) => {
      const next = (index + step + count) % count;
      onIndexChange?.(next);
      setSlide([next, step]);
    },
    [index, count, onIndexChange]
  );

  const goTo = (target: number) => {
    if (target === index) return;
    onIndexChange?.(target);
    setSlide([target, target > index ? 1 : -1]);
  };

  React.useEffect(() => {
    if (!keyboard) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") paginate(1);
      if (event.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keyboard, paginate]);

  const handleDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -SWIPE_THRESHOLD) paginate(1);
    else if (swipe > SWIPE_THRESHOLD) paginate(-1);
  };

  const current = images[index];

  return (
    <Box
      sx={{
        position: "relative",
        height,
        overflow: "hidden",
        backgroundColor: background,
        userSelect: "none",
        "&:hover .carousel-arrow": { opacity: 1 },
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={current.src}
          src={current.src}
          alt={`${title}: ${current.caption}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 32 },
            opacity: { duration: 0.25 },
            scale: { duration: 0.4 },
          }}
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragStart={() => (wasDragged.current = true)}
          onDragEnd={handleDragEnd}
          onClick={() => {
            if (!wasDragged.current) onImageClick?.(index);
            wasDragged.current = false;
          }}
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: fit,
            objectPosition: current.position ?? "top",
            cursor: count > 1 ? "grab" : onImageClick ? "zoom-in" : "default",
          }}
        />
      </AnimatePresence>

      {/* Dark fade along the bottom keeps the caption and dots readable on light screenshots */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 80,
          zIndex: 1,
          background: "linear-gradient(transparent, rgba(0,0,0,0.55))",
          pointerEvents: "none",
        }}
      />

      {/* Caption: names the part of the project in this image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.caption}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            left: 12,
            bottom: 34,
            zIndex: 2,
            padding: "4px 12px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            pointerEvents: "none",
          }}
        >
          {current.caption}
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 2,
              px: 1.2,
              py: 0.3,
              borderRadius: 999,
              fontSize: 12,
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.55)",
              pointerEvents: "none",
            }}
          >
            {index + 1} / {count}
          </Box>

          <IconButton
            className="carousel-arrow"
            aria-label="Previous image"
            onClick={() => paginate(-1)}
            sx={{ ...arrowStyle, left: 8 }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            className="carousel-arrow"
            aria-label="Next image"
            onClick={() => paginate(1)}
            sx={{ ...arrowStyle, right: 8 }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Dots: the active one stretches into a pill */}
          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              gap: 0.8,
            }}
          >
            {images.map((image, i) => (
              <motion.button
                key={image.src}
                aria-label={`Show image ${i + 1}: ${image.caption}`}
                onClick={() => goTo(i)}
                animate={{
                  width: i === index ? 22 : 8,
                  backgroundColor: i === index ? ACCENT : "rgba(255,255,255,0.6)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  height: 8,
                  padding: 0,
                  border: "none",
                  borderRadius: 999,
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ImageCarousel;
