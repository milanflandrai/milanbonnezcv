import { BootSequence } from './components/OS/BootSequence';
import { Desktop } from './components/OS/Desktop';
import { SpotlightSearch } from './components/UI/SpotlightSearch';
import { useEasterEggs } from './hooks/useEasterEggs';

function App() {
  useEasterEggs();

  return (
    <>
      <BootSequence />
      <Desktop />
      <SpotlightSearch />
    </>
  );
}

export default App;
