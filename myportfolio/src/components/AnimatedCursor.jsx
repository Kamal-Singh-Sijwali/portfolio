import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth trailing
  const cursorX = useSpring(mouseX, {
    stiffness: 500,
    damping: 35,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
   <>
    <motion.div
      className="cursor-ring"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    />

    <motion.div
      className="cursor-dot"
      style={{
        translateX: mouseX,
        translateY: mouseY,
      }}
    />
   </>
  );
}