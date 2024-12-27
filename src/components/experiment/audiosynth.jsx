import React, { useEffect, useRef } from "react";

const AudioSynth = ({
  isPlaying,
  pitch,
  aggressiveness,
  arpeggioPattern = [0, 4, 7],
  arpeggioSpeed = 8,
  attack,
  decay,
  sustain,
  release,
  onAnalyserUpdate,
}) => {
  const audioContextRef = useRef(null);
  const sineOscillatorRef = useRef(null);
  const sawtoothOscillatorRef = useRef(null);
  const analyserRef = useRef(null);
  const arpeggioIntervalRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      if (!audioContextRef.current) {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        audioContextRef.current = audioContext;
      }

      const audioContext = audioContextRef.current;

      // Create oscillators
      const sineOsc = audioContext.createOscillator();
      const sawOsc = audioContext.createOscillator();

      // Create a gain node for the envelope
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNodeRef.current = gainNode;

      // Create analyser node for visualization
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      // Connect oscillators to gain node
      sineOsc.connect(gainNode);
      sawOsc.connect(gainNode);

      // Apply ADSR envelope
      const applyEnvelope = (startTime) => {
        const sustainLevel = sustain;
        const attackEnd = startTime + attack;
        const decayEnd = attackEnd + decay;

        gainNode.gain.cancelScheduledValues(startTime);
        gainNode.gain.setValueAtTime(0, startTime); // Start at 0
        gainNode.gain.linearRampToValueAtTime(1, attackEnd); // Attack
        gainNode.gain.linearRampToValueAtTime(sustainLevel, decayEnd); // Decay
        gainNode.gain.setValueAtTime(sustainLevel, decayEnd); // Sustain
      };

      const releaseEnvelope = (stopTime) => {
        const releaseEnd = stopTime + release;

        gainNode.gain.cancelScheduledValues(stopTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, stopTime); // Sustain level
        gainNode.gain.linearRampToValueAtTime(0, releaseEnd); // Release
      };

      // Start oscillators
      sineOsc.type = "sine";
      sawOsc.type = "sawtooth";
      sineOsc.start();
      sawOsc.start();

      // Set up arpeggiator
      let noteIndex = 0;
      const intervalTime = 1000 / arpeggioSpeed;
      arpeggioIntervalRef.current = setInterval(() => {
        const noteOffset = arpeggioPattern[noteIndex % arpeggioPattern.length];
        const arpeggiatedPitch = pitch * Math.pow(2, noteOffset / 12);

        sineOsc.frequency.setValueAtTime(
          arpeggiatedPitch,
          audioContext.currentTime
        );
        sawOsc.frequency.setValueAtTime(
          arpeggiatedPitch,
          audioContext.currentTime
        );

        applyEnvelope(audioContext.currentTime);
        noteIndex++;
      }, intervalTime);

      // Connect gain node to analyser and destination
      gainNode.connect(analyser);
      analyser.connect(audioContext.destination);

      sineOscillatorRef.current = sineOsc;
      sawtoothOscillatorRef.current = sawOsc;
    }

    return () => {
      if (sineOscillatorRef.current) {
        releaseEnvelope(audioContextRef.current.currentTime);
        sineOscillatorRef.current.stop(
          audioContextRef.current.currentTime + release
        );
        sineOscillatorRef.current.disconnect();
      }
      if (sawtoothOscillatorRef.current) {
        sawtoothOscillatorRef.current.stop(
          audioContextRef.current.currentTime + release
        );
        sawtoothOscillatorRef.current.disconnect();
      }
      if (arpeggioIntervalRef.current)
        clearInterval(arpeggioIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [
    isPlaying,
    pitch,
    aggressiveness,
    arpeggioPattern,
    arpeggioSpeed,
    attack,
    decay,
    sustain,
    release,
  ]);

  return <div></div>;
};

export default AudioSynth;
