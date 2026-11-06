import React from 'react';
import {AbsoluteFill, Composition, registerRoot, useCurrentFrame} from 'remotion';
import '@fontsource-variable/manrope';
import {FRAMES, ORBITS, orbitPosition} from './orbits.mjs';

function Orbit() {
  const frame = useCurrentFrame();
  const particles = ORBITS.map((orbit) => ({...orbit, ...orbitPosition(frame, orbit)}));

  return (
    <AbsoluteFill style={{background: '#ffffff', fontFamily: 'Manrope Variable, sans-serif'}}>
      <svg viewBox="0 0 800 450" width="800" height="450">
        <defs>
          <radialGradient id="lime" cx="32%" cy="25%" r="78%">
            <stop offset="0" stopColor="#e4ff9e"/>
            <stop offset="0.7" stopColor="#d3f36b"/>
            <stop offset="1" stopColor="#b6d951"/>
          </radialGradient>
          <radialGradient id="charcoal" cx="30%" cy="24%" r="80%">
            <stop offset="0" stopColor="#59614e"/>
            <stop offset="1" stopColor="#242b20"/>
          </radialGradient>
        </defs>
        {particles.map((orbit, i) => (
          <ellipse key={i} cx="400" cy="202" rx={orbit.rx} ry={orbit.ry}
            transform={`rotate(${orbit.tilt} 400 202)`} fill="none"
            stroke={i === 0 ? '#aab99a' : '#d9e1d0'} strokeWidth={i === 0 ? 1.8 : 1.3}/>
        ))}
        <text x="394" y="240" textAnchor="middle" fill="#20251c" stroke="#fff"
          strokeWidth="13" paintOrder="stroke" strokeLinejoin="round"
          style={{fontSize: 113, fontWeight: 800, letterSpacing: -7}}>orbit</text>
        {particles.map((particle, i) => (
          <circle key={i} cx={particle.x} cy={particle.y} r={particle.radius}
            fill={`url(#${particle.color})`}/>
        ))}
        <circle cx="400" cy="346" r="3" fill="#d3f36b"/>
        <text x="400" y="398" textAnchor="middle" fill="#647254"
          style={{fontSize: 22, fontWeight: 450, letterSpacing: 0.6}}>small thoughts, shared orbits.</text>
      </svg>
    </AbsoluteFill>
  );
}

registerRoot(() => <Composition id="Orbit" component={Orbit} durationInFrames={FRAMES} fps={24} width={800} height={450}/>);
