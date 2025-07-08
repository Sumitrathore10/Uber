import { useContext } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../context/UserContext.jsx';


const UserRegister = () => {
const navigate = useNavigate();
const { user, setUser } = useContext(userContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post(`${import.meta.env.VITE_USER_URL}/register`,user,{ headers:{"Content-Type":"application/json"},withCredentials:true});
    if(res.status === 201 || res.data.success){
      setUser(user)
      navigate('/user/login');
      console.log("User registered successfully:", res.data.user);
    }
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data.message : error.message);
    }}
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
              Create a User Account
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
                    value={user.fullname.firstname}
                    onChange={(e)=>{setUser({...user,fullname:{...user.fullname,firstname:e.target.value}})}}
                    required
                    placeholder="John"
                    className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-800 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={user.fullname.lastname}
                    onChange={(e)=>{setUser({...user,fullname:{...user.fullname,lastname:e.target.value}})}}
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
                value={user.email}
                onChange={(e)=>{setUser({...user,email:e.target.value})}}
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
                  value={user.password}
                  onChange={(e)=>{setUser({...user,password:e.target.value})}}
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

              {/* Divider */}
              {/* <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div> */}

              {/* captain Register Link */}
              {/* <Link
                to="/captain/register"
                className="w-full h-10 bg-green-500 text-white flex justify-center items-center rounded-lg font-semibold text-sm hover:bg-orange-600 transition"
              >
                Register as Captain
              </Link> */}
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-3 text-xs text-gray-500">
        © 2025 Rydito. Your trusted platform to register, ride, and reach securely and smoothly, every single time
      </footer>
    </div>
  );
};
export default UserRegister;
