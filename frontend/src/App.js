import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';  
import RegisterPage from './pages/RegisterPage';
import RecordingStoragePage from './pages/RecordingStoragePage';
import TabPage from './pages/TabPage'
import ProfilePage from './pages/ProfilePage';

function App() {
  return (

      <BrowserRouter>
        <div className='w-full h-screen'>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/recordings' element={<RecordingStoragePage/>}/>
            <Route path='/tabs' element={<TabPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    
  );
}

export default App;