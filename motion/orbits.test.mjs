import assert from 'node:assert/strict';
import test from 'node:test';
import {FRAMES, ORBITS, orbitPosition} from './orbits.mjs';

test('orbits join smoothly at the loop boundary and stay inside the frame', () => {
  for (const orbit of ORBITS) {
    const start = orbitPosition(0, orbit);
    const end = orbitPosition(FRAMES, orbit);
    assert(Math.hypot(start.x - end.x, start.y - end.y) < 1e-9);
    assert(Math.abs(start.tilt - end.tilt) < 1e-9);
    assert(Math.abs(start.radius - end.radius) < 1e-9);
    for (let frame = 0; frame < FRAMES; frame++) {
      const point = orbitPosition(frame, orbit);
      const next = orbitPosition(frame + 1, orbit);
      assert(point.x - point.radius > 0 && point.x + point.radius < 800);
      assert(point.y - point.radius > 0 && point.y + point.radius < 450);
      assert(Math.hypot(next.x - point.x, next.y - point.y) < 12);
    }
  }
});
