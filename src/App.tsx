import { Hero } from './components/Hero';
import { Signals } from './components/Signals';
import { WorkRhythm } from './components/WorkRhythm';
import { profile } from './content/profile';

export default function App() {
  return (
    <main>
      <Hero profile={profile} />
      <Signals signals={profile.signals} />
      <WorkRhythm rhythm={profile.rhythm} contact={profile.contact} />
    </main>
  );
}
