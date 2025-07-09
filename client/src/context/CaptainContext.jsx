import React, {useState, createContext } from 'react'

export const captainContext = createContext()

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: ""
    },
    email: "",
    password: "",
    vehical: {
      color: "",
      plate: "",
      capacity :"",
      vehicalType: ""
    }
  })
  
  return (
    <captainContext.Provider value={{captain, setCaptain }}>
        {children}
    </captainContext.Provider>
  )
}

export default CaptainContext