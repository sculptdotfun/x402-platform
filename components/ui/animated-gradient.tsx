"use client";

import { useEffect, useRef } from "react";

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className = "" }: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const animate = () => {
      time += 0.001;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create animated gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width / window.devicePixelRatio,
        canvas.height / window.devicePixelRatio
      );

      // Animate colors
      const hue1 = (Math.sin(time) * 30 + 220) % 360;
      const hue2 = (Math.cos(time) * 30 + 250) % 360;

      gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, 0.3)`);
      gradient.addColorStop(0.5, `hsla(${hue2}, 70%, 60%, 0.2)`);
      gradient.addColorStop(1, `hsla(${hue1}, 70%, 60%, 0.3)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}