import React, { useRef, useEffect, useState } from "react";

const WaveAnimation = ({
  isPlaying,
  pitch,
  aggressiveness,
  vibration,
  vibrationDepth,
}) => {
  const canvasRef = useRef(null);

  const pixelsPerSecond = 100; // Defines how many pixels represent one second
  const frequency = vibration * 2 * Math.PI;
  const speed = vibration / 10; // Adjust speed scaling factor to control wave movement

  const [startTime, setStartTime] = useState(0);

  useEffect(() => {}, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const drawWave = (currentTime) => {
      let elapsedTime = 0;
      if (isPlaying) {
        elapsedTime = currentTime - startTime;
      } else {
        setStartTime(currentTime);
      }

      // Increment phase to make the wave move horizontally

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set y-center based on pitch (moves the straight line up and down)
      const yCenter = canvas.height / 2 - pitch / 10;

      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        // Default: a straight line
        let y = yCenter;

        // Apply vibration: Only modify the straight line when vibration is applied
        if (vibration > 0 && vibrationDepth > 0) {
          // Calculate vibrato using only time, not x
          const vibrato =
            // Math.sin(frequency * elapsedTime + x / pixelsPerSecond) *
            Math.sin(
              Math.PI / -2 +
                (frequency * elapsedTime) / 1000 +
                x / pixelsPerSecond
            ) * vibrationDepth;
          y += vibrato; // Add vibrato to the y position
        }

        ctx.lineTo(x, y);
      }

      // Softness effect based on aggressiveness
      const alphaValue = 0.25 + aggressiveness / 2; // As aggressiveness increases, the alpha decreases
      ctx.strokeStyle = `rgba(0, 0, 0, ${alphaValue})`; // Adjust the transparency (alpha)
      ctx.lineWidth = 11 - 10 * aggressiveness; // Adjust line thickness for softness
      ctx.stroke();

      // Keep animating
      animationFrameId = requestAnimationFrame(drawWave);
    };

    // Start animation
    drawWave(startTime);

    // Cleanup function to stop animation
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    frequency,
    isPlaying,
    pitch,
    vibration,
    vibrationDepth,
    aggressiveness,
    speed, // Add speed as a dependency
  ]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={400}></canvas>
    </div>
  );
};

export default WaveAnimation;
