import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Userlogin from './components/Userlogin'
import Userregister from './components/Userregister'
import First from './components/First'
import Captainlogin from './components/Captainlogin'
import Captainregister from './components/Captainregister'
const App = () => {
  return (
    <Routes>
      <Route path='/user/login' element={<Userlogin/>}/>
      <Route path='/user/register' element={<Userregister/>}/>
      <Route path='/' element={<First/>}/>
      <Route path='/captain/login' element={<Captainlogin/>}/>
      <Route path='/captain/register' element={<Captainregister/>}/>
    </Routes>
  )
}

export default App