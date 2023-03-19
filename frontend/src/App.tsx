import Main from './components/Main';
import { AppProvider } from './hooks/AppContext';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  projectId: process.env.VITE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

export default App;
