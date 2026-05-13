import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const cyan = '#57c7ff';
const warm = '#f6c85f';
const cream = '#f7f2e9';
const ink = '#07090c';

export function HeroReel() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const intro = spring({ frame, fps, config: { damping: 22, stiffness: 82 } });
  const pulse = Math.sin(frame / 18) * 0.5 + 0.5;
  const sweep = interpolate(frame, [0, durationInFrames], [-360, 2200]);
  const gridOpacity = interpolate(frame, [0, 70, durationInFrames - 30], [0, 0.46, 0.22]);
  const titleOpacity = interpolate(frame, [28, 70, 252, 310], [0, 1, 1, 0]);
  const counter = Math.min(100, Math.round((frame / durationInFrames) * 100));

  return (
    <AbsoluteFill style={{ backgroundColor: ink, overflow: 'hidden', fontFamily: 'Inter, Arial, sans-serif' }}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 72% 44%, rgba(87,199,255,0.26), transparent 24%), linear-gradient(90deg, rgba(7,9,12,1) 0%, rgba(7,9,12,0.74) 48%, rgba(7,9,12,0.32) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage:
            'linear-gradient(rgba(247,242,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(247,242,233,0.08) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          transform: `translateX(${interpolate(frame, [0, durationInFrames], [0, -72])}px)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: -110,
          top: 0,
          width: 1040,
          height: 1080,
          background: 'linear-gradient(135deg, rgba(19,25,35,0.94), rgba(10,13,18,0.72))',
          clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)',
          transform: `translateX(${interpolate(intro, [0, 1], [160, 0])}px)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: sweep,
          top: 0,
          width: 260,
          height: 1080,
          background: 'linear-gradient(90deg, transparent, rgba(87,199,255,0.22), transparent)',
          transform: 'skewX(-16deg)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: 180,
          top: 168,
          width: 560,
          height: 354,
          border: '2px solid rgba(247,242,233,0.32)',
          padding: 36,
          opacity: interpolate(frame, [44, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            style={{
              height: 42,
              marginBottom: 38,
              background: row === 0 ? cyan : row === 1 ? warm : cream,
              width: `${interpolate(frame, [58 + row * 18, 118 + row * 18], [8, [70, 44, 88][row]], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}%`,
              opacity: row === 2 ? 0.92 : 1,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            right: 34,
            bottom: 34,
            width: 118,
            height: 118,
            borderRadius: '50%',
            border: `14px solid rgba(87,199,255,${0.55 + pulse * 0.28})`,
            borderRightColor: warm,
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 126,
          bottom: 128,
          color: cream,
          opacity: titleOpacity,
          transform: `translateY(${interpolate(intro, [0, 1], [42, 0])}px)`,
        }}
      >
        <div style={{ color: cyan, fontSize: 30, fontWeight: 800, textTransform: 'uppercase' }}>MOON19HT</div>
        <div style={{ marginTop: 26, fontSize: 138, fontWeight: 900, lineHeight: 0.88 }}>Builds in motion</div>
        <div style={{ marginTop: 34, width: 470, height: 5, background: `linear-gradient(90deg, ${cyan}, ${warm})` }} />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 176,
          bottom: 118,
          color: 'rgba(247,242,233,0.76)',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 0,
        }}
      >
        RENDER {String(counter).padStart(3, '0')}
      </div>
    </AbsoluteFill>
  );
}
