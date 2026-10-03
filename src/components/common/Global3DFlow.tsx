// SAPTHA — Learn · Inspire · Together · Achieve
// Interactive 3D Flowing Universe Ambient Canvas (Runs across all pages)

import React, { useEffect, useRef } from 'react';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  phase: number;
}

export const Global3DFlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    const colors = [
      'rgba(6, 182, 212, ',   // Neon Cyan
      'rgba(168, 85, 247, ',  // Electric Purple
      'rgba(236, 72, 153, ',  // Neon Rose
      'rgba(59, 130, 246, ',  // Deep Electric Blue
      'rgba(245, 158, 11, ',  // Golden Amber
      'rgba(16, 185, 129, ',  // Emerald
    ];

    const particleCount = Math.min(width > 1024 ? 65 : 35, 75);
    const particles: Particle3D[] = [];
    const spreadX = width * 1.2;
    const spreadY = height * 1.2;
    const spreadZ = 700;

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ;
      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2.2 + 1.2,
        color: colors[i % colors.length],
        phase: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentRotY = 0;
    let currentRotX = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const halfW = width / 2;
      const halfH = height / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
      targetRotY = mouseX * 0.28;
      targetRotX = -mouseY * 0.28;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const fov = 450;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      currentRotY += (targetRotY - currentRotY) * 0.035;
      currentRotX += (targetRotX - currentRotX) * 0.035;

      // Natural flowing ambient rotation
      const autoRot = time * 0.00015;
      const totalRotY = currentRotY + autoRot;

      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      const projected: { px: number; py: number; scale: number; p: Particle3D }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D flowing harmonic wave motion
        p.phase += 0.012;
        p.x = p.baseX + Math.sin(p.phase) * 35;
        p.y = p.baseY + Math.cos(p.phase * 0.8) * 35;
        p.z = p.baseZ + Math.sin(p.phase * 0.5) * 45;

        p.baseX += p.vx;
        p.baseY += p.vy;
        p.baseZ += p.vz;

        // Wrap around boundaries
        if (p.baseX > spreadX / 2) p.baseX = -spreadX / 2;
        if (p.baseX < -spreadX / 2) p.baseX = spreadX / 2;
        if (p.baseY > spreadY / 2) p.baseY = -spreadY / 2;
        if (p.baseY < -spreadY / 2) p.baseY = spreadY / 2;
        if (p.baseZ > spreadZ / 2) p.baseZ = -spreadZ / 2;
        if (p.baseZ < -spreadZ / 2) p.baseZ = spreadZ / 2;

        // 3D Camera Rotation Matrix
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const depth = z2 + fov;
        if (depth > 15) {
          const scale = fov / depth;
          const px = x1 * scale + width / 2;
          const py = y2 * scale + height / 2;

          if (px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
            projected.push({ px, py, scale, p });
          }
        }
      }

      // Constellation Lines with depth fading
      const connectionDist = width > 768 ? 120 : 80;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.16 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
            ctx.lineWidth = 0.8 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
          }
        }
      }

      // Draw Glowing Particles
      for (let i = 0; i < projected.length; i++) {
        const { px, py, scale, p } = projected[i];
        const r = Math.max(1, p.size * scale);
        const alpha = Math.min(0.85, Math.max(0.15, scale * 0.7));

        // Soft Radial Glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r * 4);
        grad.addColorStop(0, `${p.color}${alpha * 0.7})`);
        grad.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(px, py, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40 dark:opacity-60 transition-opacity"
      aria-hidden="true"
    />
  );
};
