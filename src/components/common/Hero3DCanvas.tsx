// SAPTHA — Learn · Inspire · Together · Achieve
// Interactive 3D Prismatic Geometry & Constellation Particle Canvas

import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

export const Hero3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(6, 182, 212, ',   // Neon Cyan
      'rgba(168, 85, 247, ',  // Electric Purple
      'rgba(236, 72, 153, ',  // Hot Pink
      'rgba(59, 130, 246, ',  // Bright Blue
      'rgba(245, 158, 11, ',  // Golden Amber
      'rgba(16, 185, 129, ',  // Emerald Green
    ];

    const numPoints = Math.min(width > 768 ? 48 : 28, 55);
    const points: Point3D[] = [];
    const spread = Math.min(width, height) * 0.85;

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: (Math.random() - 0.5) * spread,
        y: (Math.random() - 0.5) * spread,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2.8 + 1.2,
        color: colors[i % colors.length],
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let rotY = 0;
    let rotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseX = x / (width / 2);
      mouseY = y / (height / 2);
      targetRotY = mouseX * 0.35;
      targetRotX = -mouseY * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const fov = 400;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation
      rotY += (targetRotY - rotY) * 0.04;
      rotX += (targetRotX - rotX) * 0.04;

      // Natural continuous ambient rotation
      const autoAngle = Date.now() * 0.0003;
      const totalRotY = rotY + autoAngle;

      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projectedPoints: { px: number; py: number; scale: number; p: Point3D }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Boundaries bounce
        const halfSpread = spread * 0.55;
        if (Math.abs(p.x) > halfSpread) p.vx *= -1;
        if (Math.abs(p.y) > halfSpread) p.vy *= -1;
        if (Math.abs(p.z) > 280) p.vz *= -1;

        // 3D rotation Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // 3D rotation X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const depth = z2 + fov;
        if (depth > 20) {
          const scale = fov / depth;
          const px = x1 * scale + width / 2;
          const py = y2 * scale + height / 2;
          projectedPoints.push({ px, py, scale, p });
        }
      }

      // Draw connecting lines with dynamic glowing gradients
      const maxDistance = width > 768 ? 130 : 90;
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.28 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = 0.9 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
          }
        }
      }

      // Draw glowing 3D nodes
      for (let i = 0; i < projectedPoints.length; i++) {
        const { px, py, scale, p } = projectedPoints[i];
        const radius = Math.max(1, p.size * scale);
        const alpha = Math.min(1, Math.max(0.2, (scale * 0.9)));

        // Halo
        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius * 3.5);
        grad.addColorStop(0, `${p.color}${alpha * 0.8})`);
        grad.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(px, py, radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80 dark:opacity-90"
      style={{ filter: 'contrast(1.1)' }}
      aria-hidden="true"
    />
  );
};
