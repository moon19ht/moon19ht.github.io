import { Composition } from 'remotion';
import { HeroReel } from './HeroReel';

export function RemotionRoot() {
  return (
    <Composition
      id="Moon19htHero"
      component={HeroReel}
      durationInFrames={330}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
