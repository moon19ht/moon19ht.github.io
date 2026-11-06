export const FRAMES = 192;
export const ORBITS = [
  {rx: 276, ry: 93, tilt: -18, phase: 0.48, speed: 1, radius: 20, color: 'lime'},
  {rx: 232, ry: 104, tilt: 30, phase: 2.7, speed: -1, radius: 12, color: 'charcoal'},
  {rx: 188, ry: 127, tilt: -48, phase: 4.2, speed: 1, radius: 8, color: 'lime'},
];

export function orbitPosition(frame, orbit) {
  const cycle = (frame / FRAMES) * Math.PI * 2;
  const angle = cycle * orbit.speed + orbit.phase;
  const tilt = orbit.tilt + Math.sin(cycle) * 6;
  const radians = (tilt / 180) * Math.PI;
  const x = orbit.rx * Math.cos(angle);
  const y = orbit.ry * Math.sin(angle);
  return {
    x: 400 + x * Math.cos(radians) - y * Math.sin(radians),
    y: 202 + x * Math.sin(radians) + y * Math.cos(radians),
    tilt,
    radius: orbit.radius * (1 + Math.sin(angle) * 0.12),
  };
}
