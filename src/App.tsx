import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Signals } from './components/Signals';
import { Toolchain } from './components/Toolchain';
import { WorkRhythm } from './components/WorkRhythm';
import { profile } from './content/profile';
import { toolchain } from './content/toolchain';

export default function App() {
  return (
    <main>
      <Hero profile={profile} />
      <Signals signals={profile.signals} />
      <Projects projects={profile.projects} />
      <Toolchain toolchain={toolchain} />
      <WorkRhythm rhythm={profile.rhythm} contact={profile.contact} />
    </main>
  );
}
