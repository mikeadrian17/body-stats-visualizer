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
        canvas.height = rect.height - 40;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Realistic male human body wireframe points
    const bodyPoints = {
      // Head (more defined male structure)
      headTop: { x: 0, y: -130, z: 0 },
      headFront: { x: 0, y: -115, z: 12 },
      headBack: { x: 0, y: -115, z: -12 },
      headLeftSide: { x: -12, y: -115, z: 0 },
      headRightSide: { x: 12, y: -115, z: 0 },
      jawLeft: { x: -8, y: -95, z: 8 },
      jawRight: { x: 8, y: -95, z: 8 },
      chin: { x: 0, y: -90, z: 10 },
      
      // Neck (broader male neck)
      neckTop: { x: 0, y: -85, z: 0 },
      neckBottom: { x: 0, y: -75, z: 0 },
      neckLeft: { x: -6, y: -80, z: 0 },
      neckRight: { x: 6, y: -80, z: 0 },
      
      // Shoulders (wider male shoulders)
      leftShoulder: { x: -38, y: -70, z: 0 },
      rightShoulder: { x: 38, y: -70, z: 0 },
      leftShoulderBack: { x: -35, y: -68, z: -8 },
      rightShoulderBack: { x: 35, y: -68, z: -8 },
      leftShoulderFront: { x: -35, y: -68, z: 8 },
      rightShoulderFront: { x: 35, y: -68, z: 8 },
      
      // Arms (muscular definition)
      leftUpperArm: { x: -50, y: -45, z: 0 },
      rightUpperArm: { x: 50, y: -45, z: 0 },
      leftElbow: { x: -55, y: -20, z: 0 },
      rightElbow: { x: 55, y: -20, z: 0 },
      leftForearm: { x: -50, y: 5, z: 0 },
      rightForearm: { x: 50, y: 5, z: 0 },
      leftWrist: { x: -45, y: 25, z: 0 },
      rightWrist: { x: 45, y: 25, z: 0 },
      leftHand: { x: -42, y: 35, z: 0 },
      rightHand: { x: 42, y: 35, z: 0 },
      
      // Chest (defined pectorals)
      chestCenter: { x: 0, y: -55, z: 5 },
      leftChest: { x: -18, y: -55, z: 8 },
      rightChest: { x: 18, y: -55, z: 8 },
      leftPec: { x: -25, y: -60, z: 5 },
      rightPec: { x: 25, y: -60, z: 5 },
      
      // Torso (V-taper male physique)
      leftRib: { x: -28, y: -35, z: 0 },
      rightRib: { x: 28, y: -35, z: 0 },
      leftWaist: { x: -20, y: -10, z: 0 },
      rightWaist: { x: 20, y: -10, z: 0 },
      waistCenter: { x: 0, y: -10, z: 0 },
      
      // Abs (six-pack definition)
      upperAbsLeft: { x: -8, y: -45, z: 8 },
      upperAbsRight: { x: 8, y: -45, z: 8 },
      midAbsLeft: { x: -8, y: -30, z: 8 },
      midAbsRight: { x: 8, y: -30, z: 8 },
      lowerAbsLeft: { x: -8, y: -15, z: 8 },
      lowerAbsRight: { x: 8, y: -15, z: 8 },
      
      // Back (latissimus dorsi and trapezius)
      leftTrap: { x: -15, y: -65, z: -8 },
      rightTrap: { x: 15, y: -65, z: -8 },
      leftLat: { x: -35, y: -40, z: -5 },
      rightLat: { x: 35, y: -40, z: -5 },
      leftBackLower: { x: -25, y: -20, z: -5 },
      rightBackLower: { x: 25, y: -20, z: -5 },
      spineUpper: { x: 0, y: -50, z: -8 },
      spineMid: { x: 0, y: -30, z: -8 },
      spineLower: { x: 0, y: -10, z: -8 },
      
      // Hips (male hip structure)
      leftHip: { x: -18, y: 10, z: 0 },
      rightHip: { x: 18, y: 10, z: 0 },
      hipCenter: { x: 0, y: 10, z: 0 },
      
      // Legs (muscular male legs)
      leftUpperLeg: { x: -20, y: 35, z: 0 },
      rightUpperLeg: { x: 20, y: 35, z: 0 },
      leftQuad: { x: -22, y: 45, z: 5 },
      rightQuad: { x: 22, y: 45, z: 5 },
      leftHamstring: { x: -18, y: 45, z: -5 },
      rightHamstring: { x: 18, y: 45, z: -5 },
      leftKnee: { x: -22, y: 70, z: 0 },
      rightKnee: { x: 22, y: 70, z: 0 },
      leftCalf: { x: -20, y: 95, z: -2 },
      rightCalf: { x: 20, y: 95, z: -2 },
      leftShin: { x: -22, y: 95, z: 2 },
      rightShin: { x: 22, y: 95, z: 2 },
      leftAnkle: { x: -20, y: 120, z: 0 },
      rightAnkle: { x: 20, y: 120, z: 0 },
      leftFoot: { x: -20, y: 125, z: 8 },
      rightFoot: { x: 20, y: 125, z: 8 },
    };

    // Realistic human body connections
    const connections = [
      // Head structure
      ['headTop', 'headLeftSide'], ['headTop', 'headRightSide'],
      ['headLeftSide', 'jawLeft'], ['headRightSide', 'jawRight'],
      ['jawLeft', 'chin'], ['jawRight', 'chin'],
      ['headFront', 'chin'], ['headBack', 'neckTop'],
      
      // Neck
      ['chin', 'neckTop'], ['neckTop', 'neckBottom'],
      ['neckLeft', 'neckRight'], ['neckBottom', 'chestCenter'],
      
      // Shoulders and arms
      ['neckBottom', 'leftShoulder'], ['neckBottom', 'rightShoulder'],
      ['leftShoulder', 'leftShoulderBack'], ['leftShoulder', 'leftShoulderFront'],
      ['rightShoulder', 'rightShoulderBack'], ['rightShoulder', 'rightShoulderFront'],
      ['leftShoulder', 'leftUpperArm'], ['rightShoulder', 'rightUpperArm'],
      ['leftUpperArm', 'leftElbow'], ['rightUpperArm', 'rightElbow'],
      ['leftElbow', 'leftForearm'], ['rightElbow', 'rightForearm'],
      ['leftForearm', 'leftWrist'], ['rightForearm', 'rightWrist'],
      ['leftWrist', 'leftHand'], ['rightWrist', 'rightHand'],
      
      // Chest and torso
      ['leftShoulder', 'leftPec'], ['rightShoulder', 'rightPec'],
      ['leftPec', 'leftChest'], ['rightPec', 'rightChest'],
      ['leftChest', 'chestCenter'], ['rightChest', 'chestCenter'],
      ['leftChest', 'leftRib'], ['rightChest', 'rightRib'],
      ['leftRib', 'leftWaist'], ['rightRib', 'rightWaist'],
      ['leftWaist', 'waistCenter'], ['rightWaist', 'waistCenter'],
      
      // Abs definition
      ['chestCenter', 'upperAbsLeft'], ['chestCenter', 'upperAbsRight'],
      ['upperAbsLeft', 'midAbsLeft'], ['upperAbsRight', 'midAbsRight'],
      ['midAbsLeft', 'lowerAbsLeft'], ['midAbsRight', 'lowerAbsRight'],
      ['upperAbsLeft', 'upperAbsRight'], ['midAbsLeft', 'midAbsRight'],
      ['lowerAbsLeft', 'lowerAbsRight'], ['lowerAbsLeft', 'waistCenter'],
      ['lowerAbsRight', 'waistCenter'],
      
      // Back structure
      ['neckTop', 'leftTrap'], ['neckTop', 'rightTrap'],
      ['leftTrap', 'spineUpper'], ['rightTrap', 'spineUpper'],
      ['leftShoulderBack', 'leftLat'], ['rightShoulderBack', 'rightLat'],
      ['leftLat', 'leftBackLower'], ['rightLat', 'rightBackLower'],
      ['spineUpper', 'spineMid'], ['spineMid', 'spineLower'],
      ['leftBackLower', 'spineLower'], ['rightBackLower', 'spineLower'],
      
      // Hips and legs
      ['waistCenter', 'hipCenter'], ['leftWaist', 'leftHip'], ['rightWaist', 'rightHip'],
      ['leftHip', 'leftUpperLeg'], ['rightHip', 'rightUpperLeg'],
      ['leftUpperLeg', 'leftQuad'], ['rightUpperLeg', 'rightQuad'],
      ['leftUpperLeg', 'leftHamstring'], ['rightUpperLeg', 'rightHamstring'],
      ['leftQuad', 'leftKnee'], ['rightQuad', 'rightKnee'],
      ['leftHamstring', 'leftKnee'], ['rightHamstring', 'rightKnee'],
      ['leftKnee', 'leftCalf'], ['rightKnee', 'rightCalf'],
      ['leftKnee', 'leftShin'], ['rightKnee', 'rightShin'],
      ['leftCalf', 'leftAnkle'], ['rightCalf', 'rightAnkle'],
      ['leftShin', 'leftAnkle'], ['rightShin', 'rightAnkle'],
      ['leftAnkle', 'leftFoot'], ['rightAnkle', 'rightFoot'],
      
      // Cross connections for structural integrity
      ['leftChest', 'rightRib'], ['rightChest', 'leftRib'],
      ['leftRib', 'rightWaist'], ['rightRib', 'leftWaist'],
    ];

    let rotationY = 0;
    let rotationX = 0;
    let scale = 1;

    // Mouse interaction
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
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
    });

    canvas.addEventListener('mouseleave', () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      scale += e.deltaY * -0.001;
      scale = Math.max(0.5, Math.min(2.5, scale));
    });

    // Get muscle group color based on stats
    const getMuscleColor = (muscleGroup: keyof FitnessStats) => {
      const percentage = stats[muscleGroup];
      if (percentage >= 85) return '#f97316'; // orange-500
      if (percentage >= 70) return '#fb923c'; // orange-400
      if (percentage >= 50) return '#fdba74'; // orange-300
      return '#fed7aa'; // orange-200
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Transform points with 3D rotation
      const transformedPoints: { [key: string]: { x: number; y: number; z: number } } = {};
      
      Object.entries(bodyPoints).forEach(([key, point]) => {
        // Apply Y rotation (horizontal spinning)
        let x = point.x * Math.cos(rotationY) - point.z * Math.sin(rotationY);
        let z = point.x * Math.sin(rotationY) + point.z * Math.cos(rotationY);
        let y = point.y;
        
        // Apply X rotation (vertical tilting)
        const newY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
        z = y * Math.sin(rotationX) + z * Math.cos(rotationX);
        y = newY;
        
        transformedPoints[key] = {
          x: centerX + x * scale * 1.2,
          y: centerY + y * scale * 1.2,
          z: z
        };
      });

      // Sort connections by Z depth for proper rendering
      const sortedConnections = [...connections].sort((a, b) => {
        const avgZA = (transformedPoints[a[0]].z + transformedPoints[a[1]].z) / 2;
        const avgZB = (transformedPoints[b[0]].z + transformedPoints[b[1]].z) / 2;
        return avgZB - avgZA;
      });

      // Draw connections with stat-based coloring
      sortedConnections.forEach(([from, to]) => {
        const fromPoint = transformedPoints[from];
        const toPoint = transformedPoints[to];
        
        // Determine color based on muscle group
        let color = '#60a5fa';
        let lineWidth = 1.5;
        
        // Chest/arms (bench press)
        if (['Chest', 'Pec', 'upperAbs', 'UpperArm'].some(p => from.includes(p) || to.includes(p))) {
          color = getMuscleColor('benchPress');
          lineWidth = 2;
        }
        // Legs (squat)
        else if (['Leg', 'Quad', 'Hamstring', 'Knee', 'Calf'].some(p => from.includes(p) || to.includes(p))) {
          color = getMuscleColor('squat');
          lineWidth = 2;
        }
        // Back (deadlift)
        else if (['Back', 'Lat', 'Trap', 'spine'].some(p => from.includes(p) || to.includes(p))) {
          color = getMuscleColor('deadlift');
          lineWidth = 2;
        }
        
        // Calculate depth-based opacity
        const avgZ = (fromPoint.z + toPoint.z) / 2;
        const opacity = Math.max(0.4, 1 - Math.abs(avgZ) * 0.008);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.globalAlpha = opacity;

        ctx.beginPath();
        ctx.moveTo(fromPoint.x, fromPoint.y);
        ctx.lineTo(toPoint.x, toPoint.y);
        ctx.stroke();
      });

      // Draw points
      ctx.globalAlpha = 1;
      Object.entries(transformedPoints).forEach(([key, point]) => {
        let color = '#60a5fa';
        let size = 2;
        
        // Highlight key muscle groups
        if (['Chest', 'Pec'].some(p => key.includes(p))) {
          color = getMuscleColor('benchPress');
          size = 3;
        } else if (['Quad', 'Hamstring', 'Knee'].some(p => key.includes(p))) {
          color = getMuscleColor('squat');
          size = 3;
        } else if (['Back', 'Lat', 'Trap'].some(p => key.includes(p))) {
          color = getMuscleColor('deadlift');
          size = 3;
        }
        
        const opacity = Math.max(0.6, 1 - Math.abs(point.z) * 0.008);
        ctx.globalAlpha = opacity;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [stats]);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-slate-900 to-slate-950">
      <canvas 
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      <div className="absolute bottom-4 left-4 text-xs text-orange-200/60">
        <p>Drag to rotate 360° • Scroll to zoom • Colors show performance</p>
      </div>
      <div className="absolute top-4 right-4 text-xs text-orange-200/60">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>85%+ Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded"></div>
            <span>70%+ Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-300 rounded"></div>
            <span>50%+ Performance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
