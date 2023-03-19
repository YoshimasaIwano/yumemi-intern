import './style/App.css';
import Main from './components/Main';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  projectId: process.env.VITE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
