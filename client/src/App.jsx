import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Userlogin from './components/Userlogin.jsx'
import UserRegister from './components/Userregister.jsx'
import First from './components/First.jsx'
import Captainlogin from './components/Captainlogin.jsx'
import Captainregister from './components/Captainregister.jsx'
import Home from './components/Home.jsx'
const App = () => {
  return (
    <Routes>
      <Route path='/user/login' element={<Userlogin/>}/>
      <Route path='/user/register' element={<UserRegister/>}/>
      <Route path='/' element={<First/>}/>
      <Route path='/captain/login' element={<Captainlogin/>}/>
      <Route path='/captain/register' element={<Captainregister/>}/>
      <Route path='/home' element={<Home/>}/>
      
    </Routes>
  )
}

export default App