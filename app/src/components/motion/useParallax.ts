import type { RefObject } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

// Maps how far `target` has scrolled through the viewport onto [from, to].
// Default offset: 0 when the element's top enters the bottom of the screen,
// 1 when its bottom leaves the top. With reduced motion it always returns 0,
// so derive scale/opacity from a 0-based range (e.g. 1 - v) instead of passing 1 here.
export function useParallax(
  target: RefObject<HTMLElement>,
  from: number,
  to: number,
  offset: ScrollOffset = ["start end", "end start"]
): MotionValue<number> {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset });
  return useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [from, to]);
}
