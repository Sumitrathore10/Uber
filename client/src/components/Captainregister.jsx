
import React , {useState}  from 'react'
import { Link } from 'react-router-dom'

const Captainregister = () => {
  const [captainRegister, setRegister] = useState({
    fullname: {
      firstname: "",
      lastname: ""
    },
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration data submitted:", captainRegister);
    setRegister({ fullname: { firstname: "", lastname: "" }, email: "", password: "" });
  }
  return (
    <div className="min-h-screen flex flex-col select-none bg-white">
    
          {/* Header */}
          <header className="px-4 py-3">
            <h1 className="text-4xl font-semibold text-black tracking-tight poppins">
              Rydito.
            </h1>
          </header>
    
          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-4 py-4 overflow-auto">
            <div className="w-full max-w-sm sm:max-w-md">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-2xl px-4 font-semibold text-black leading-tight poppins">
                  Create a Captain Account
                </h2>
                <div className="w-[50%] h-1 bg-black/35 rounded-full mx-auto mt-2"></div>
              </div>
    
              <div className="bg-white rounded-2xl p-6 ">
                <form onSubmit={handleSubmit} className="space-y-5 poppins">
    
                  {/* Full Name Fields */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-800 mb-1">First Name</label>
                      <input
                        type="text"
                        value={captainRegister.fullname.firstname}
                        onChange={(e)=>{setRegister({...captainRegister,fullname:{...captainRegister.fullname,firstname:e.target.value}})}}
                        required
                        placeholder="John"
                        className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-800 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={captainRegister.fullname.lastname}
                        onChange={(e)=>{setRegister({...captainRegister,fullname:{...captainRegister.fullname,lastname:e.target.value}})}}
                        required
                        placeholder="Doe"
                        className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                      />
                    </div>
                  </div>
    
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm text-gray-800 mb-1">Email</label>
                    <input
                    value={captainRegister.email}
                    onChange={(e)=>{setRegister({...captainRegister,email:e.target.value})}}
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                    />
                  </div>
    
                  {/* Password Field */}
                  <div>
                    <label className="block text-sm text-gray-800 mb-1">Password</label>
                    <input
                      type="password"
                      value={captainRegister.password}
                      onChange={(e)=>{setRegister({...captainRegister,password:e.target.value})}}
                      required
                      placeholder="password"
                      className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                    />
                  </div>
    
                  {/* Login Link */}
                  <p className="text-xs text-gray-600 text-center">
                    Already have an account?{' '}
                    <Link
                      to="/captain/login"
                      className="text-blue-600 font-semibold underline"
                    >
                      Login here
                    </Link>
                  </p>
    
                  {/* Register Button */}
                  <button
                    type="submit"
                    className="w-full h-12 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </main>
    
          {/* Footer */}
          <footer className="text-center py-3 px-3 text-xs text-gray-500">
           © 2025 Rydito. Join as a captain and start your journey towards safer, smarter, and more rewarding rides.
          </footer>
        </div>
  )
}

export default Captainregister