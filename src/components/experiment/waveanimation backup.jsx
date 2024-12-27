import React, { useRef, useEffect, useState } from "react";

const WaveAnimation = ({
  isPlaying,
  pitch,
  aggressiveness,
  richness,
  vibration,
  vibrationDepth,
}) => {
  const canvasRef = useRef(null);
  const [amplitude, setAmplitude] = useState(50); // Controls the wave's amplitude
  const [phase, setPhase] = useState(0); // The phase will change over time for animation

  const frequency = pitch / 10000;
  const speed = pitch / 100000;

  // Function to calculate a sine wave value
  const calculateSineWave = (x, frequency, phase) => {
    return Math.sin(frequency * x + phase);
  };

  // Function to calculate a triangle wave value
  const calculateTriangleWave = (x, frequency, phase) => {
    return 2 * Math.abs(((x / Math.PI + phase) % 2) - 1) - 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x++) {
        // Calculate sine and triangle wave values
        const sineValue = calculateSineWave(x, frequency, phase);
        const triangleValue = calculateTriangleWave(x, frequency, phase);

        // Interpolate between sine and triangle wave based on aggressiveness
        const interpolatedValue =
          sineValue * (1 - aggressiveness) + triangleValue * aggressiveness;

        // Adjust Y position based on the interpolated wave value
        const y = canvas.height / 2 + amplitude * interpolatedValue;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#000"; // Set the color of the wave
      ctx.lineWidth = 2;
      ctx.stroke();

      // Increment phase to make the wave move horizontally
      if (isPlaying) {
        setPhase((prevPhase) => prevPhase + speed);
      }

      // Keep animating
      animationFrameId = requestAnimationFrame(drawWave);
    };

    // Start animation
    drawWave();

    // Cleanup function to stop animation
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [frequency, amplitude, speed, phase, isPlaying, aggressiveness]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={400}></canvas>
    </div>
  );
};

export default WaveAnimation;
