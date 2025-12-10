import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';  
import RegisterPage from './pages/RegisterPage';
import RecordingStoragePage from './pages/RecordingStoragePage';
import TabPage from './pages/TabPage'

function App() {
  return (
    <div className='w-full h-screen'>
      <TabPage/>
    </div>
  );
}

export default App;