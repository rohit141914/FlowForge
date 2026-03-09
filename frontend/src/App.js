import { useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { keepBackendAlive } from './keepAlive';
import './app.css';

function App() {
  useEffect(() => {
    const id = keepBackendAlive();
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app-root">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
