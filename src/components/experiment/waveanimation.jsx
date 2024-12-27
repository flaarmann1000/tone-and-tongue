import React, { useRef, useEffect, useState } from "react";

const CircularWaveAnimation = ({
  isPlaying,
  pitch,
  aggressiveness,
  vibration,
  vibrationDepth,
}) => {
  const canvasRef = useRef(null);

  const pixelsPerSecond = 100; // Defines how many pixels represent one second
  const frequency = vibration * 2 * Math.PI;
  const sineFrequency = 5; // Number of hills and valleys along the circle

  const [startTime, setStartTime] = useState(0);

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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Determine the radius of the circle based on pitch (higher pitch = smaller radius)
      const radius = 200 - pitch / 10; // Adjust the scaling factor to match the visual scale you want

      // Center of the circle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Number of points around the circle
      const numPoints = 360;

      ctx.beginPath();

      // Step in angles for the circle
      const angleStep = (2 * Math.PI) / numPoints;

      for (let i = 0; i <= numPoints; i++) {
        const angle = i * angleStep; // Calculate the angle for each point

        // Apply a sine wave with 5 hills and valleys along the circle
        let modulatedRadius = radius;
        if (vibration > 0 && vibrationDepth > 0) {
          const sineWave =
            Math.sin(sineFrequency * angle + elapsedTime / 1000) *
            vibrationDepth;
          modulatedRadius += sineWave;
        }

        const x = centerX + modulatedRadius * Math.cos(angle); // X coordinate for the point
        const y = centerY + modulatedRadius * Math.sin(angle); // Y coordinate for the point

        if (i === 0) {
          ctx.moveTo(x, y); // Move to the first point
        } else {
          ctx.lineTo(x, y); // Draw lines between points
        }
      }

      // Close the circle
      ctx.closePath();

      // Softness effect based on aggressiveness
      const alphaValue = 0.25 + aggressiveness / 2; // Adjust transparency
      ctx.strokeStyle = `rgba(0, 0, 0, ${alphaValue})`;
      ctx.lineWidth = 11 - 10 * aggressiveness; // Adjust line thickness for softness
      ctx.stroke();

      // Keep animating
      animationFrameId = requestAnimationFrame(drawWave);
    };

    // Start animation
    drawWave(startTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [frequency, isPlaying, pitch, vibration, vibrationDepth, aggressiveness]);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={400}></canvas>
    </div>
  );
};

export default CircularWaveAnimation;
