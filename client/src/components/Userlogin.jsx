import axios from 'axios'
import  { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context/UserContext.jsx'
import toast from 'react-hot-toast'


const Userlogin = () => {

  const navigate = useNavigate();

  const {user, setUser} = useContext(userContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_USER_URL}/login`, user,{headers:{
        "Content-Type": "application/json"
      },withCredentials:true})
      if(res.status === 201 || res.data.success){
        setUser(user)
        localStorage.setItem('token',res.data.token)
        toast.success(`${res.data.user.fullname.firstname} logged in successfully`)
        navigate('/home')
        setUser({
          fullname: {
            firstname: "",
            lastname: ""
          },
          email: "",
          password: ""
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error during login");
    }
    
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
              Log In to Continue Your Journey
            </h2> 
            <div className="w-[80%] h-1 bg-black/35 rounded-full mx-auto mt-2"></div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-5 poppins">
              {/* Email Field */}
              <div>
                <label className="block text-sm text-gray-800 mb-1">
                  What's your email
                </label>
                <input 
                value={user.email}
                onChange={(e)=>{
                  setUser({...user,email:e.target.value})
                }}
                  type="email"
                  required
                  className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none "
                  placeholder="example@gmail.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm  text-gray-800 mb-1">
                  What's your password
                </label>
                <input 
                  type="password"
                  value={user.password}
                  onChange={(e)=>{
                    setUser({...user,password:e.target.value})
                  }}
                  required
                  placeholder="password"
                  className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none "
                />
              </div>

              {/* Sign Up Link */}
              <p className="text-xs text-gray-600 text-center">
                Don't have an account?{' '}
                <Link 
                  to="/user/register"
                  className="text-blue-600 font-semibold underline"
                >
                  Create an Account
                </Link>
              </p>

              {/* Login Button */}
              <button 
                type="submit"
                className="w-full h-12 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition"
              >
                Login
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>

              {/* Captain Login */}
              <Link
                to="/captain/login"
                className="w-full h-12 bg-green-500 text-white flex justify-center items-center rounded-lg font-semibold text-sm hover:bg-orange-600 transition"
              >
                Sign in as Captain
              </Link>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center pb-3 text-xs text-gray-500">
        © 2025 Rydito. Log in to book rides, track captains, and travel comfortably—your journey starts here.
      </footer>
    </div>
  )
}

export default Userlogin
