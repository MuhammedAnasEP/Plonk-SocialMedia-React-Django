import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css' 
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/signup" element = {<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;