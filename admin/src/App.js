import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import UsersListPage from './pages/UsersListPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/users' element={<UsersListPage/>}/>
          </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
