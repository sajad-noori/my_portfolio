
import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const PARTICLES = [
  { angle: 0, distance: 24, size: 5, color: "#a78bfa" },
  { angle: 90, distance: 24, size: 4, color: "#22d3ee" },
  { angle: 180, distance: 24, size: 5, color: "#f472b6" },
  { angle: 270, distance: 24, size: 4, color: "#facc15" },
];

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, {
    stiffness: 500,
    damping: 32,
    mass: 0.45,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 500,
    damping: 32,
    mass: 0.45,
  });

  useEffect(() => {
    // Skip custom cursor on touch devices.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);

      const target = event.target;
      setHovering(
        target instanceof Element &&
          Boolean(
            target.closest(
              'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
            )
          )
      );
    };

    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [mouseX, mouseY]);

  // Keep the native cursor on touch devices.
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 180ms ease",
        overflow: "hidden",
      }}
    >
      {/* Soft neon aura */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 100 : 68,
          height: hovering ? 100 : 68,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.20) 0%, rgba(34,211,238,0.09) 38%, transparent 72%)",
          filter: "blur(5px)",
          transition: "width 250ms ease, height 250ms ease",
        }}
      />

      {/* Rotating neon orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: hovering ? 3 : 6,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 54 : 38,
          height: hovering ? 54 : 38,
          borderRadius: "50%",
          border: "1px solid rgba(167,139,250,0.55)",
          borderTopColor: "#22d3ee",
          borderRightColor: "rgba(244,114,182,0.8)",
          boxShadow: "0 0 12px rgba(139,92,246,0.2)",
          transition: "width 220ms ease, height 220ms ease",
        }}
      />

      {/* Floating orbit particles */}
      {PARTICLES.map((particle, index) => (
        <motion.div
          key={particle.angle}
          animate={{
            rotate: 360,
            scale: hovering ? [1, 1.5, 1] : [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: hovering ? 1.8 : 3.5,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1.2 + index * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            x: smoothX,
            y: smoothY,
            width: hovering ? 62 : 46,
            height: hovering ? 62 : 46,
            marginLeft: hovering ? -31 : -23,
            marginTop: hovering ? -31 : -23,
            transition: "width 220ms ease, height 220ms ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
          />
        </motion.div>
      ))}

      {/* Bright central core */}
      <motion.div
        animate={{
          scale: clicking ? 0.45 : hovering ? 1.35 : [1, 1.15, 1],
        }}
        transition={{
          scale: clicking
            ? { duration: 0.1 }
            : { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: "#ffffff",
          boxShadow:
            "0 0 6px #fff, 0 0 14px #a78bfa, 0 0 28px rgba(34,211,238,0.9)",
        }}
      />

      {/* Small click indicator */}
      {clicking && (
        <motion.div
          initial={{ scale: 0.2, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
            width: 28,
            height: 28,
            border: "2px solid #22d3ee",
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;
