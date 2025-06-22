
import { useEffect, useRef, useState } from 'react';

interface FitnessStats {
  benchPress: number;
  squat: number;
  sprint: number;
  deadlift: number;
}

export const FitnessModel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats] = useState<FitnessStats>({
    benchPress: 90, // percentage to goal
    squat: 90,
    sprint: 75,
    deadlift: 90
  });

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
        canvas.height = rect.height - 40; // Account for controls text
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Detailed wireframe human body points (based on reference image)
    const bodyPoints = {
      // Head
      headTop: { x: 0, y: -120 },
      headFrontTop: { x: 0, y: -115 },
      headFrontBottom: { x: 0, y: -95 },
      headLeft: { x: -12, y: -107 },
      headRight: { x: 12, y: -107 },
      chin: { x: 0, y: -85 },
      
      // Neck
      neckTop: { x: 0, y: -85 },
      neckBottom: { x: 0, y: -75 },
      
      // Shoulders
      leftShoulder: { x: -35, y: -70 },
      rightShoulder: { x: 35, y: -70 },
      leftShoulderBack: { x: -30, y: -68 },
      rightShoulderBack: { x: 30, y: -68 },
      
      // Arms
      leftUpperArm: { x: -45, y: -45 },
      rightUpperArm: { x: 45, y: -45 },
      leftElbow: { x: -50, y: -20 },
      rightElbow: { x: 50, y: -20 },
      leftForearm: { x: -45, y: 5 },
      rightForearm: { x: 45, y: 5 },
      leftHand: { x: -40, y: 25 },
      rightHand: { x: 40, y: 25 },
      
      // Torso
      chestCenter: { x: 0, y: -55 },
      leftChest: { x: -20, y: -55 },
      rightChest: { x: 20, y: -55 },
      leftRib: { x: -25, y: -35 },
      rightRib: { x: 25, y: -35 },
      waistCenter: { x: 0, y: -10 },
      leftWaist: { x: -18, y: -10 },
      rightWaist: { x: 18, y: -10 },
      
      // Abs (for bench press visualization)
      upperAbs: { x: 0, y: -45 },
      midAbs: { x: 0, y: -30 },
      lowerAbs: { x: 0, y: -15 },
      
      // Hips
      leftHip: { x: -15, y: 10 },
      rightHip: { x: 15, y: 10 },
      
      // Legs (for squat/deadlift visualization)
      leftUpperLeg: { x: -18, y: 35 },
      rightUpperLeg: { x: 18, y: 35 },
      leftKnee: { x: -20, y: 65 },
      rightKnee: { x: 20, y: 65 },
      leftLowerLeg: { x: -18, y: 90 },
      rightLowerLeg: { x: 18, y: 90 },
      leftFoot: { x: -20, y: 115 },
      rightFoot: { x: 20, y: 115 },
      
      // Back muscles (for deadlift)
      leftBackUpper: { x: -25, y: -50 },
      rightBackUpper: { x: 25, y: -50 },
      leftBackLower: { x: -20, y: -20 },
      rightBackLower: { x: 20, y: -20 },
    };

    // Enhanced connections for detailed wireframe
    const connections = [
      // Head structure
      ['headTop', 'headLeft'],
      ['headTop', 'headRight'],
      ['headLeft', 'chin'],
      ['headRight', 'chin'],
      ['headFrontTop', 'headFrontBottom'],
      ['chin', 'neckTop'],
      
      // Neck to shoulders
      ['neckTop', 'neckBottom'],
      ['neckBottom', 'leftShoulder'],
      ['neckBottom', 'rightShoulder'],
      ['neckBottom', 'chestCenter'],
      
      // Shoulder structure
      ['leftShoulder', 'leftShoulderBack'],
      ['rightShoulder', 'rightShoulderBack'],
      ['leftShoulder', 'leftChest'],
      ['rightShoulder', 'rightChest'],
      
      // Arms
      ['leftShoulder', 'leftUpperArm'],
      ['rightShoulder', 'rightUpperArm'],
      ['leftUpperArm', 'leftElbow'],
      ['rightUpperArm', 'rightElbow'],
      ['leftElbow', 'leftForearm'],
      ['rightElbow', 'rightForearm'],
      ['leftForearm', 'leftHand'],
      ['rightForearm', 'rightHand'],
      
      // Torso structure
      ['chestCenter', 'leftChest'],
      ['chestCenter', 'rightChest'],
      ['leftChest', 'leftRib'],
      ['rightChest', 'rightRib'],
      ['leftRib', 'leftWaist'],
      ['rightRib', 'rightWaist'],
      ['leftWaist', 'waistCenter'],
      ['rightWaist', 'waistCenter'],
      
      // Abs definition
      ['chestCenter', 'upperAbs'],
      ['upperAbs', 'midAbs'],
      ['midAbs', 'lowerAbs'],
      ['lowerAbs', 'waistCenter'],
      
      // Hips
      ['waistCenter', 'leftHip'],
      ['waistCenter', 'rightHip'],
      ['leftWaist', 'leftHip'],
      ['rightWaist', 'rightHip'],
      
      // Legs
      ['leftHip', 'leftUpperLeg'],
      ['rightHip', 'rightUpperLeg'],
      ['leftUpperLeg', 'leftKnee'],
      ['rightUpperLeg', 'rightKnee'],
      ['leftKnee', 'leftLowerLeg'],
      ['rightKnee', 'rightLowerLeg'],
      ['leftLowerLeg', 'leftFoot'],
      ['rightLowerLeg', 'rightFoot'],
      
      // Back structure
      ['leftShoulderBack', 'leftBackUpper'],
      ['rightShoulderBack', 'rightBackUpper'],
      ['leftBackUpper', 'leftBackLower'],
      ['rightBackUpper', 'rightBackLower'],
      ['leftBackLower', 'leftHip'],
      ['rightBackLower', 'rightHip'],
      
      // Cross connections for grid pattern
      ['leftChest', 'rightRib'],
      ['rightChest', 'leftRib'],
      ['leftRib', 'rightWaist'],
      ['rightRib', 'leftWaist'],
    ];

    let rotationX = 0;
    let rotationY = 0;
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
      canvas.style.cursor = 'grabbing';
    });

    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;

        rotationY += deltaX * 0.01;
        rotationX += deltaY * 0.01;
        
        // Limit vertical rotation
        rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX));
        
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    });

    canvas.addEventListener('mouseup', () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
      setTimeout(() => { autoRotate = true; }, 3000);
    });

    canvas.addEventListener('mouseleave', () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      scale += e.deltaY * -0.001;
      scale = Math.max(0.3, Math.min(2, scale));
    });

    // Get muscle group color based on stats
    const getMuscleColor = (muscleGroup: keyof FitnessStats) => {
      const percentage = stats[muscleGroup];
      if (percentage >= 85) return '#00ff00'; // Green for high performance
      if (percentage >= 70) return '#ffff00'; // Yellow for medium
      if (percentage >= 50) return '#ff8800'; // Orange for low
      return '#ff0000'; // Red for very low
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (autoRotate && !isDragging) {
        rotationY += 0.003;
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Transform points with 3D rotation
      const transformedPoints: { [key: string]: { x: number; y: number; z: number } } = {};
      
      Object.entries(bodyPoints).forEach(([key, point]) => {
        // Apply Y rotation (horizontal spinning)
        let x = point.x * Math.cos(rotationY) - 0 * Math.sin(rotationY);
        let z = point.x * Math.sin(rotationY) + 0 * Math.cos(rotationY);
        let y = point.y;
        
        // Apply X rotation (vertical tilting)
        const newY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
        z = y * Math.sin(rotationX) + z * Math.cos(rotationX);
        y = newY;
        
        transformedPoints[key] = {
          x: centerX + x * scale * 1.5,
          y: centerY + y * scale * 1.5,
          z: z
        };
      });

      // Sort points by Z depth for proper rendering
      const sortedConnections = [...connections].sort((a, b) => {
        const avgZA = (transformedPoints[a[0]].z + transformedPoints[a[1]].z) / 2;
        const avgZB = (transformedPoints[b[0]].z + transformedPoints[b[1]].z) / 2;
        return avgZB - avgZA; // Draw far things first
      });

      // Draw connections with stat-based coloring
      sortedConnections.forEach(([from, to]) => {
        const fromPoint = transformedPoints[from];
        const toPoint = transformedPoints[to];
        
        // Determine color based on muscle group
        let color = '#60a5fa'; // Default blue
        let lineWidth = 1.5;
        
        // Chest/arms (bench press)
        if (['leftChest', 'rightChest', 'chestCenter', 'upperAbs', 'leftUpperArm', 'rightUpperArm'].some(p => from.includes(p) || to.includes(p))) {
          color = getMuscleColor('benchPress');
          lineWidth = 2;
        }
        // Legs (squat)
        else if (['leftUpperLeg', 'rightUpperLeg', 'leftKnee', 'rightKnee', 'leftLowerLeg', 'rightLowerLeg'].some(p => from.includes(p) || to.includes(p))) {
          color = getMuscleColor('squat');
          lineWidth = 2;
        }
        // Back (deadlift)
        else if (['leftBackUpper', 'rightBackUpper', 'leftBackLower', 'rightBackLower'].some(p => from.includes(p) || to.includes(p))) {
          color = getMuscleColor('deadlift');
          lineWidth = 2;
        }
        
        // Calculate depth-based opacity
        const avgZ = (fromPoint.z + toPoint.z) / 2;
        const opacity = Math.max(0.3, 1 - Math.abs(avgZ) * 0.01);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.globalAlpha = opacity;
        ctx.shadowColor = color;
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.moveTo(fromPoint.x, fromPoint.y);
        ctx.lineTo(toPoint.x, toPoint.y);
        ctx.stroke();
      });

      // Draw points
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 8;
      Object.entries(transformedPoints).forEach(([key, point]) => {
        let color = '#60a5fa';
        let size = 2;
        
        // Highlight key muscle groups
        if (['leftChest', 'rightChest', 'chestCenter'].includes(key)) {
          color = getMuscleColor('benchPress');
          size = 3;
        } else if (['leftKnee', 'rightKnee', 'leftUpperLeg', 'rightUpperLeg'].includes(key)) {
          color = getMuscleColor('squat');
          size = 3;
        } else if (['leftBackUpper', 'rightBackUpper'].includes(key)) {
          color = getMuscleColor('deadlift');
          size = 3;
        }
        
        const opacity = Math.max(0.5, 1 - Math.abs(point.z) * 0.01);
        ctx.globalAlpha = opacity;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.fill();
      });

      // Draw head wireframe
      const headPoint = transformedPoints['headTop'];
      ctx.globalAlpha = Math.max(0.5, 1 - Math.abs(headPoint.z) * 0.01);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(headPoint.x, headPoint.y + 15, 18 * scale, 0, Math.PI * 2);
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [stats]);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-gray-900 to-gray-800">
      <canvas 
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        <p>Drag to rotate • Scroll to zoom • Colors show performance</p>
      </div>
      <div className="absolute top-4 right-4 text-xs text-gray-400">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>85%+ Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>70%+ Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>50%+ Performance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
