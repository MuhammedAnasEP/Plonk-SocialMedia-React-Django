import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css' 
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContex';
import Saved from './pages/saved/Saved';
import Notifications from './pages/Notifications/Notifications';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <div>
      <BrowserRouter>
          <AuthProvider>
            <Routes>
                <Route element = {<PrivateRoute/>}>
                  <Route path='/' element = {<Home/>}/>
                  <Route path='/profile' element={<Profile/>}>
                    <Route path='posts' element={<Profile/>}/>
                    <Route path='friends' element={<Profile/>}/>
                    <Route path='about' element={<Profile/>}/>
                    <Route path='edit' element={<EditProfile/>}/>
                  </Route>
                </Route>
                <Route path='/login'  element = {<Login/>}/>
                <Route path="/signup" element = {<Signup/>}/>
                <Route path="/saved" element = {<Saved/>}/>
                <Route path="/notifications" element = {<Notifications/>}/>
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;