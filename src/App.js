import React from 'react';
// import './App.css';
import CombinedComponent from './Comp/CombinedComponent';
import { BrowserRouter ,  Route, Routes} from 'react-router-dom';
import SingIn from './Comp/SingIn';
import LogIn from './Comp/LogIn';
import ProtectedRoute from './Comp/ProtectedRoute';
import Logout from './Comp/Logout';
import Chat from './Comp/Chat';


function App() {
  return (
   <div className='app'>
    <BrowserRouter>
   
    <Routes>
<Route path='/' element={<SingIn/>}></Route>
<Route path='/login' element={<LogIn/>}></Route>
<Route path='/*' element={<LogIn/>}></Route>




<Route element={<ProtectedRoute/>}>

<Route path='/a' element={<h1> Jai Shree Ram</h1>}></Route>
<Route path='/logout' element={<Logout/>}></Route>
<Route path='/chatapp' element={<CombinedComponent/>}></Route>
<Route path='/livechat' element={<Chat />} />

</Route>

   
</Routes>
    </BrowserRouter>


   </div>
    
    
   
    
  );
}

export default App;
