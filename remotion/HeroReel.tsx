import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const cyan = '#57c7ff';
const warm = '#f6c85f';
const cream = '#f7f2e9';
const ink = '#07090c';

const signalBeats = ['Systems', 'Automation', 'Motion'] as const;
const loopBeats = ['Prototype', 'Verify', 'Ship'] as const;

export function HeroReel() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const intro = spring({ frame, fps, config: { damping: 22, stiffness: 82 } });
  const pulse = Math.sin(frame / 18) * 0.5 + 0.5;
  const sweep = interpolate(frame, [0, durationInFrames], [-360, 2200]);
  const gridOpacity = interpolate(frame, [0, 70, durationInFrames - 30], [0, 0.28, 0.16]);
  const titleOpacity = interpolate(frame, [28, 70, 260, 318], [0, 1, 1, 0]);
  const signalProgress = interpolate(frame, [42, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const loopProgress = interpolate(frame, [142, 292], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const counter = Math.min(100, Math.round((frame / durationInFrames) * 100));

  return (
    <AbsoluteFill style={{ backgroundColor: ink, overflow: 'hidden', fontFamily: 'Inter, Arial, sans-serif' }}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 74% 42%, rgba(87,199,255,0.22), transparent 25%), linear-gradient(90deg, rgba(7,9,12,1) 0%, rgba(7,9,12,0.82) 48%, rgba(7,9,12,0.4) 100%)',
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
          background: 'linear-gradient(90deg, transparent, rgba(87,199,255,0.16), transparent)',
          transform: 'skewX(-16deg)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: 180,
          top: 168,
          width: 560,
          height: 430,
          border: '2px solid rgba(247,242,233,0.26)',
          padding: 36,
          opacity: interpolate(frame, [44, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        {signalBeats.map((label, row) => (
          <div
            key={row}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 54,
              marginBottom: 26,
              opacity: interpolate(signalProgress, [row / 3, (row + 0.3) / 3, 1], [0.28, 1, row === 2 ? 1 : 0.74], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <div
              style={{
                width: `${interpolate(frame, [58 + row * 18, 118 + row * 18], [8, [72, 56, 86][row]], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}%`,
                height: 3,
                background: row === 0 ? cyan : row === 1 ? warm : cream,
                opacity: 0.82,
              }}
            />
            <div
              style={{
                marginLeft: 22,
                color: row === 0 ? cyan : row === 1 ? warm : cream,
                fontSize: 30,
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              {label}
            </div>
          </div>
        ))}

        <div
          style={{
            position: 'absolute',
            left: 36,
            right: 36,
            bottom: 34,
            display: 'flex',
            justifyContent: 'space-between',
            color: 'rgba(247,242,233,0.78)',
            fontSize: 24,
            fontWeight: 800,
            textTransform: 'uppercase',
          }}
        >
          {loopBeats.map((label, index) => (
            <span
              key={label}
              style={{
                opacity: interpolate(loopProgress, [index / 3, (index + 0.3) / 3, 1], [0.26, 1, 0.72], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                color: index === 1 ? cyan : index === 2 ? warm : 'rgba(247,242,233,0.82)',
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            right: 34,
            bottom: 92,
            width: 118,
            height: 118,
            borderRadius: '50%',
            border: `14px solid rgba(87,199,255,${0.42 + pulse * 0.22})`,
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
        <div style={{ marginTop: 26, fontSize: 128, fontWeight: 900, lineHeight: 0.88 }}>Build loops in motion</div>
        <div style={{ marginTop: 28, color: 'rgba(247,242,233,0.7)', fontSize: 34, fontWeight: 760 }}>
          Systems / Automation / Motion
        </div>
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
