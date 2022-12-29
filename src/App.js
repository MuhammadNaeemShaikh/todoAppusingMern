import './App.css';
import Register from './component/register/Register'
import Login from './component/login/Login'
import Welcome from './component/welcome/Welcome'
import {  BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return ( 
    <div className = "App" >
      <BrowserRouter > 
         <Routes> 
           <Route path="/" element={<Login/>}></Route> 
           <Route path="signup" element={<Register/>}></Route>
           <Route path="welcome" element={<Welcome/>}></Route>
         </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

