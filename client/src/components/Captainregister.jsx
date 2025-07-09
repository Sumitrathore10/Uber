import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { captainContext } from "../context/CaptainContext";
import toast from "react-hot-toast";
import axios from "axios";

const Captainregister = () => {
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(captainContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_CAPTAIN_URL}/register`,
        captain,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 201 || res.data.success) {
        setCaptain(captain);
        localStorage.setItem("token", res.data.token);
        toast.success(
          `${res.data.captain.fullname.firstname} registered successfully`
        );
        navigate("/captain/login");
        setCaptain({
          fullname: {
            firstname: "",
            lastname: "",
          },
          email: "",
          password: "",
          vehical: {
            color: "",
            plate: "",
            capacity: "",
            vehicalType: "",
          },
        });
      }
    } catch (error) {
      console.error(error);
      console.log("Payload:", captain); // Log the payload being sent
      toast.error(`${error.response?.data?.message || "Registration failed"}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col select-none bg-white">
      <header className="px-4 py-3">
        <h1 className="text-4xl font-semibold text-black tracking-tight poppins">
          Rydito.
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-4 overflow-auto">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-black leading-tight poppins">
              Create a Captain Account
            </h2>
            <div className="w-[50%] h-1 bg-black/35 rounded-full mx-auto mt-2"></div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-5 poppins">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm text-gray-800 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={captain.fullname.firstname}
                    onChange={(e) =>
                      setCaptain({
                        ...captain,
                        fullname: {
                          ...captain.fullname,
                          firstname: e.target.value,
                        },
                      })
                    }
                    required
                    placeholder="John"
                    className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-800 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={captain.fullname.lastname}
                    onChange={(e) =>
                      setCaptain({
                        ...captain,
                        fullname: {
                          ...captain.fullname,
                          lastname: e.target.value,
                        },
                      })
                    }
                    required
                    placeholder="Doe"
                    className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-800 mb-1">Email</label>
                <input
                  value={captain.email}
                  onChange={(e) =>
                    setCaptain({ ...captain, email: e.target.value })
                  }
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-800 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={captain.password}
                  onChange={(e) =>
                    setCaptain({ ...captain, password: e.target.value })
                  }
                  required
                  placeholder="password"
                  className="w-full h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                />
              </div>

              <div>
                <h3 className="text-lg text-black mb-2">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={captain.vehical.color}
                    onChange={(e) =>
                      setCaptain({
                        ...captain,
                        vehical: { ...captain.vehical, color: e.target.value },
                      })
                    }
                    required
                    placeholder="Vehicle Color"
                    className="h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                  />

                  <input
                    type="text"
                    value={captain.vehical.plate}
                    onChange={(e) =>
                      setCaptain({
                        ...captain,
                        vehical: { ...captain.vehical, plate: e.target.value },
                      })
                    }
                    required
                    placeholder="Vehicle Plate"
                    className="h-12 bg-[#eeeeee] uppercase placeholder:lowercase rounded-lg px-4 text-sm outline-none"
                  />

                  <input
                    type="number"
                    min={1}
                    value={captain.vehical.capacity}
                    onChange={(e) =>
                      setCaptain({
                        ...captain,
                        vehical: {
                          ...captain.vehical,
                          capacity: Number(e.target.value),
                        },
                      })
                    }
                    required
                    placeholder="Capacity"
                    className="h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                  />

                  <select
                    value={captain.vehical.vehicalType}
                    onChange={(e) =>
                      setCaptain({
                        ...captain,
                        vehical: {
                          ...captain.vehical,
                          vehicalType: e.target.value.toLocaleLowerCase(),
                        },
                      })
                    }
                    required
                    className="h-12 bg-[#eeeeee] rounded-lg px-4 text-sm outline-none"
                  >
                    <option value="" disabled>
                      Vehicle Type
                    </option>
                    <option value="Car">Car</option>
                    <option value="Auto">Auto</option>
                    <option value="Motorcycle">Motorcycle</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <Link
                  to="/captain/login"
                  className="text-blue-600 font-semibold underline"
                >
                  Login here
                </Link>
              </p>

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

      <footer className="text-center py-3 px-3 text-xs text-gray-500">
        © 2025 Rydito. Join as a captain and start your journey towards safer,
        smarter, and more rewarding rides.
      </footer>
    </div>
  );
};

export default Captainregister;
