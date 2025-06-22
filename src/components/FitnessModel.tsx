
import { useEffect, useRef } from 'react';

export const FitnessModel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wireframe human body points (simplified)
    const bodyPoints = {
      head: { x: 0, y: -80 },
      neck: { x: 0, y: -60 },
      leftShoulder: { x: -30, y: -50 },
      rightShoulder: { x: 30, y: -50 },
      leftElbow: { x: -50, y: -20 },
      rightElbow: { x: 50, y: -20 },
      leftHand: { x: -60, y: 10 },
      rightHand: { x: 60, y: 10 },
      chest: { x: 0, y: -30 },
      waist: { x: 0, y: 0 },
      leftHip: { x: -15, y: 20 },
      rightHip: { x: 15, y: 20 },
      leftKnee: { x: -20, y: 60 },
      rightKnee: { x: 20, y: 60 },
      leftFoot: { x: -25, y: 100 },
      rightFoot: { x: 25, y: 100 },
    };

    // Connections between points
    const connections = [
      ['head', 'neck'],
      ['neck', 'leftShoulder'],
      ['neck', 'rightShoulder'],
      ['leftShoulder', 'leftElbow'],
      ['rightShoulder', 'rightElbow'],
      ['leftElbow', 'leftHand'],
      ['rightElbow', 'rightHand'],
      ['neck', 'chest'],
      ['chest', 'waist'],
      ['waist', 'leftHip'],
      ['waist', 'rightHip'],
      ['leftHip', 'leftKnee'],
      ['rightHip', 'rightKnee'],
      ['leftKnee', 'leftFoot'],
      ['rightKnee', 'rightFoot'],
      ['leftShoulder', 'chest'],
      ['rightShoulder', 'chest'],
    ];

    let rotation = 0;
    let scale = 1;
    let autoRotate = true;

    // Mouse interaction
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      autoRotate = false;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        rotation += deltaX * 0.01;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    });

    canvas.addEventListener('mouseup', () => {
      isDragging = false;
      setTimeout(() => { autoRotate = true; }, 2000);
    });

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      scale += e.deltaY * -0.001;
      scale = Math.max(0.5, Math.min(2, scale));
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (autoRotate) {
        rotation += 0.005;
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Transform points
      const transformedPoints: { [key: string]: { x: number; y: number } } = {};
      
      Object.entries(bodyPoints).forEach(([key, point]) => {
        const rotatedX = point.x * Math.cos(rotation) - point.y * Math.sin(rotation);
        const rotatedY = point.x * Math.sin(rotation) + point.y * Math.cos(rotation);
        
        transformedPoints[key] = {
          x: centerX + rotatedX * scale * 2,
          y: centerY + rotatedY * scale * 2,
        };
      });

      // Draw connections
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 10;

      connections.forEach(([from, to]) => {
        const fromPoint = transformedPoints[from];
        const toPoint = transformedPoints[to];
        
        ctx.beginPath();
        ctx.moveTo(fromPoint.x, fromPoint.y);
        ctx.lineTo(toPoint.x, toPoint.y);
        ctx.stroke();
      });

      // Draw points
      ctx.shadowBlur = 15;
      Object.values(transformedPoints).forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#60a5fa';
        ctx.fill();
      });

      // Draw head circle
      const headPoint = transformedPoints['head'];
      ctx.beginPath();
      ctx.arc(headPoint.x, headPoint.y, 15 * scale, 0, Math.PI * 2);
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-gray-900 to-gray-800">
      <canvas 
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      <div className="absolute bottom-4 left-4 text-xs text-gray-500">
        <p>Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};
