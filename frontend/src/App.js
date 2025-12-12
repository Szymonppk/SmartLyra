import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';  
import RegisterPage from './pages/RegisterPage';
import RecordingStoragePage from './pages/RecordingStoragePage';
import TabPage from './pages/TabPage'
import ProfilePage from './pages/ProfilePage';
function App() {
  return (
    <div className='w-full h-screen'>
      <ProfilePage/>
    </div>
  );
}

export default App;