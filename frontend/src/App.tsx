import Main from './components/Main';
import { AppProvider } from './hooks/AppContext';

import { initializeApp } from 'firebase/app';
import Footer from './components/Footer';

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  projectId: process.env.VITE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <AppProvider>
      <Main />
      <Footer />
    </AppProvider>
  );
}

export default App;
