import React, { useState } from "react";
import AudioSynth from "./audiosynth";
import WaveAnimation from "./waveanimation";

const SynthController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pitch, setPitch] = useState(440);
  const [aggressiveness, setAggressiveness] = useState(0);
  const [arpeggioPattern, setArpeggioPattern] = useState([0, 4, 7]);
  const [arpeggioSpeed, setArpeggioSpeed] = useState(8);
  const [attack, setAttack] = useState(0.1);
  const [decay, setDecay] = useState(0.2);
  const [sustain, setSustain] = useState(0.5);
  const [release, setRelease] = useState(0.3);
  const [analyserData, setAnalyserData] = useState(null);

  return (
    <div>
      <WaveAnimation analyserData={analyserData} />
      <br />
      <label>Pitch (Hz):</label>
      <input
        type="range"
        min="100"
        max="1000"
        value={pitch}
        onChange={(e) => setPitch(Number(e.target.value))}
      />
      {pitch} Hz
      <br />
      <label>Aggressiveness (Sine to Sawtooth):</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={aggressiveness}
        onChange={(e) => setAggressiveness(Number(e.target.value))}
      />
      {aggressiveness}
      <br />
      <label>Arpeggio Speed (Notes/sec):</label>
      <input
        type="range"
        min="1"
        max="20"
        value={arpeggioSpeed}
        onChange={(e) => setArpeggioSpeed(Number(e.target.value))}
      />
      {arpeggioSpeed}
      <br />
      <label>Arpeggio Pattern (Semitones):</label>
      <input
        type="text"
        value={arpeggioPattern.join(",")}
        onChange={(e) =>
          setArpeggioPattern(e.target.value.split(",").map(Number))
        }
      />
      <br />
      <label>Attack (s):</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.01"
        value={attack}
        onChange={(e) => setAttack(Number(e.target.value))}
      />
      {attack}s
      <br />
      <label>Decay (s):</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.01"
        value={decay}
        onChange={(e) => setDecay(Number(e.target.value))}
      />
      {decay}s
      <br />
      <label>Sustain (level):</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={sustain}
        onChange={(e) => setSustain(Number(e.target.value))}
      />
      {sustain}
      <br />
      <label>Release (s):</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.01"
        value={release}
        onChange={(e) => setRelease(Number(e.target.value))}
      />
      {release}s
      <br />
      {!isPlaying ? (
        <button onClick={() => setIsPlaying(true)}>Play</button>
      ) : (
        <button onClick={() => setIsPlaying(false)}>Stop</button>
      )}
      <AudioSynth
        isPlaying={isPlaying}
        pitch={pitch}
        aggressiveness={aggressiveness}
        arpeggioPattern={arpeggioPattern}
        arpeggioSpeed={arpeggioSpeed}
        attack={attack}
        decay={decay}
        sustain={sustain}
        release={release}
        onAnalyserUpdate={setAnalyserData}
      />
    </div>
  );
};

export default SynthController;
