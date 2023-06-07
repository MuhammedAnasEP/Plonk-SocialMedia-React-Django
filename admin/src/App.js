import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import UsersListPage from './pages/UsersListPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route element = {<PrivateRoute/>}>
                <Route path='/users' element={<UsersListPage/>}/>
              </Route>
            </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
