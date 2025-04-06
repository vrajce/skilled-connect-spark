import React, { useEffect, useRef } from 'react';

interface Bee {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

const BeeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bees = useRef<Bee[]>([]);
  const animationFrameId = useRef<number | null>(null);
  
  // Initialize bees
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const createBees = () => {
      const numberOfBees = window.innerWidth < 768 ? 5 : 12;
      bees.current = [];
      
      for (let i = 0; i < numberOfBees; i++) {
        bees.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 6 + 4,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05
        });
      }
    };
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createBees();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation loop
    const render = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw bees
      bees.current.forEach(bee => {
        // Update position
        bee.x += bee.speedX;
        bee.y += bee.speedY;
        bee.rotation += bee.rotationSpeed;
        
        // Bounce off edges
        if (bee.x < 0 || bee.x > canvas.width) bee.speedX *= -1;
        if (bee.y < 0 || bee.y > canvas.height) bee.speedY *= -1;
        
        // Draw bee
        ctx.save();
        ctx.translate(bee.x, bee.y);
        ctx.rotate(bee.rotation);
        
        // Body
        ctx.fillStyle = '#FFC107';
        ctx.beginPath();
        ctx.ellipse(0, 0, bee.size * 1.5, bee.size, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Stripes
        ctx.fillStyle = '#212121';
        ctx.beginPath();
        ctx.rect(-bee.size * 0.8, -bee.size * 0.6, bee.size * 0.5, bee.size * 1.2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.rect(bee.size * 0.1, -bee.size * 0.6, bee.size * 0.5, bee.size * 1.2);
        ctx.fill();
        
        // Wings
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.ellipse(0, -bee.size * 0.7, bee.size, bee.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
      
      animationFrameId.current = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 opacity-30"
    />
  );
};

export default BeeBackground; 