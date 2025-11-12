import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';

interface HarmonicVisualizerProps {
  isActive: boolean;
}

export const HarmonicVisualizer: React.FC<HarmonicVisualizerProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    let frame = 0;

    const animate = () => {
      ctx.fillStyle = '#F5F1E8';
      ctx.fillRect(0, 0, width, height);

      // Draw harmonic ratios as visual waves
      const ratios = [
        { ratio: 2/1, label: 'Octave (2:1)', color: '#e74c3c', y: height * 0.2 },
        { ratio: 3/2, label: 'Fifth (3:2)', color: '#3498db', y: height * 0.4 },
        { ratio: 4/3, label: 'Fourth (4:3)', color: '#f39c12', y: height * 0.6 },
        { ratio: 5/4, label: 'Major Third (5:4)', color: '#16a085', y: height * 0.8 }
      ];

      ratios.forEach(({ ratio, label, color, y }) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;

        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const amplitude = 30;
          const frequency = ratio * 0.02;
          const yPos = y + Math.sin((x + frame * 2) * frequency) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, yPos);
          } else {
            ctx.lineTo(x, yPos);
          }
        }
        ctx.stroke();

        // Draw label
        ctx.fillStyle = color;
        ctx.font = '12px serif';
        ctx.globalAlpha = 1;
        ctx.fillText(label, 10, y - 10);
      });

      // Draw golden ratio spiral overlay
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.3;
      
      const phi = (1 + Math.sqrt(5)) / 2;
      let angle = 0;
      let radius = 5;
      
      ctx.beginPath();
      for (let i = 0; i < 200; i++) {
        const x = width / 2 + radius * Math.cos(angle);
        const y = height / 2 + radius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        angle += 0.1;
        radius *= 1.007; // Approximation of golden spiral growth
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, [isActive]);

  if (!isActive) return null;

  return (
    <Card className="mt-4 shadow-medium animate-fade-in">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Music className="w-5 h-5 text-fresco-gold" />
          Pythagorean Harmony Visualizer
        </CardTitle>
        <CardDescription>
          Watch how mathematical ratios create visual harmony—the same principles Raphael used to compose the painting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="w-full h-auto border border-border rounded-lg bg-gradient-marble"
        />
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            These waves represent the musical intervals Pythagoras discovered. Simple whole-number ratios 
            produce harmony in sound—and Raphael applies the same ratios to create visual harmony in 
            the painting's composition. The golden spiral overlay shows how the entire composition follows 
            divine proportion.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
