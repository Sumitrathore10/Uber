import React from 'react'
import { Link } from 'react-router-dom'

const First = () => {
  return (
    <div className='flex flex-col bg-top w-screen bg-contain bg-no-repeat bg-[url("https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww")] bg-black poppins justify-between h-screen'>
    <div className='text-4xl font-semibold ml-5 mt-4 text-white select-none'>Rydito.</div>
    <div className='bg-white h-[22%] shadow-lg p-3 pt-5 pb-9 flex flex-col gap-4 w-full'>
<p className='select-none font-semibold text-2xl nowrap'>Start Getting into Rydito</p>
<Link to='/user/login' className='w-full select-none rounded-lg p-3 flex justify-center items-center bg-black text-white'>Continue</Link>
    </div>
    </div>
  )
}

export default First