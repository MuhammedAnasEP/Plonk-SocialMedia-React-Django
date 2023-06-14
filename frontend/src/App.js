import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css' 
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContex';
import Saved from './pages/saved/Saved';
import Notifications from './pages/notifications/Notifications'
import EditProfile from './components/profile/EditProfile'
import FriendProfile from './pages/friendProfile/friendProfile';
import Email from './pages/Email';

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
                    <Route path='following' element={<Profile/>}/>
                    <Route path='followers' element={<Profile/>}/>
                    <Route path='about' element={<Profile/>}/>
                    <Route path='edit' element={<EditProfile/>}/>
                  </Route>
                  <Route path='/friendprofile/:userId' element={<FriendProfile/>}/>
                  <Route path='/friendprofile/posts/:userId' element={<FriendProfile/>}/>
                  <Route path='/friendprofile/following/:userId' element={<FriendProfile/>}/>
                  <Route path='/friendprofile/followers/:userId' element={<FriendProfile/>}/>
                  <Route path='/friendprofile/about/:userId' element={<FriendProfile/>}/>
                  <Route path="/saved" element = {<Saved/>}/>
                  <Route path="/notifications" element = {<Notifications/>}/>
                  <Route path="/email/:newEmail" element={<Email/>}/>
                  {/* <Route path="/messages" element = {<Message/>}/>
                  <Route path="/messages/:sender/:receiver" element = {<Message/>}/> */}
                </Route>
                <Route path='/login'  element = {<Login/>}/>
                <Route path="/signup" element = {<Signup/>}/>
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;