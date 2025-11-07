import { useState } from "react";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
//import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faBuilding, faLocation } from "@fortawesome/free-solid-svg-icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { UserDataContext } from "../context/userContext";
import { useContext } from "react";
import { ClipLoader } from "react-spinners";

// Import the loader component
const Register = () => {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  // const [otpStep, setOtpStep] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  //const { storeTokenLocalStorage } = useAuth();

  //const backendUrl=import.meta.env.CLIENT_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newUser = {
        username,
        city,
        state,
        email,
        phone,
        password,
        // otp: otpStep,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Registration successful!");
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
      // Reset form
      setUsername("");
      setCity("");
      setState("");
      setPhone("");
      setEmail("");
      setPassword("");
      // setOtpStep("");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full max-w-md mx-auto mt-6 text-center border-2 rounded-2xl py-10 lg:py-12 px-6 lg:px-10 shadow-2xl"
      >
        <div className="flex flex-col gap-6">
          <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
            <input
              type="text"
              name="Firstname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
              className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
            />
            <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>Username</span>
            </label>
          </div>

          <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
            <input
              type="text"
              name="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder=""
              className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
            />
            <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
              <span>
                <FontAwesomeIcon icon={faLocation} />
              </span>
              <span>City</span>
            </label>
          </div>

          <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
            <input
              type="text"
              name="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder=""
              className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
            />
            <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
              <span>
                <FontAwesomeIcon icon={faBuilding} />
              </span>
              <span>State</span>
            </label>
          </div>

          <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
            <input
              type="text"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
            />
            <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span>Email</span>
            </label>
          </div>

          <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
            <input
              type="text"
              name="Phone no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=" "
              className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
            />
            <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
              <span>
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <span>Phone no.</span>
            </label>
          </div>

          <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
            <input
              type="text"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
            />
            <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
              <span>
                <FontAwesomeIcon icon={faLock} />
              </span>
              <span>Password</span>
            </label>
          </div>
</div>
//otp step
          {/* <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
            <input
              type="text"
              name=""
              value={otpStep}
              onChange={(e) => setOtpStep(e.target.value)}
              placeholder=" "
              className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
            />
            <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
              <span>
                <FontAwesomeIcon icon={faListOl} />
              </span>
              <span>OTP</span>
            </label>
          </div>
        </div> */}
        <button
          type="submit"
          className="py-2 px-4 rounded-full mt-6 font-medium text-white w-1/2 mx-auto  block  bg-gradient-to-r from-blue-700 to-sky-300   transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            </div>
          ) : (
            "Register Now"
          )}
        </button>
        <p className="text-center mt-4 text-gray-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-sky-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/auth";
// //import { toast } from "react-toastify";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser, faMobile, faBuilding, faListOl, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons'
// import { RotatingLines } from "react-loader-spinner";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// const Register = ({ setIsLoggedIn }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     username: "",
//     rollno: "",
//     department: "B.Tech Computer Science Engineering",
//     semester: "1",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const { storeTokenInLS } = useAuth();

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`${backendUrl}/api/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.msg || "Registration successful!");
//         navigate("/login");
//       } else {
//         const errorMessage = data.errors
//           ? data.errors.map((e) => e.message).join(", ")
//           : data.message;
//         toast.error(errorMessage || "Registration failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       toast.error("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-2 w-full max-w-md mx-auto mt-6 text-center border-2 rounded-3xl py-10 lg:py-12 px-6 lg:px-10 shadow-2xl"
//     >
//       <div className="grid grid-cols-2 gap-6">
//         {/* Username */}
//         <div className="relative h-11 w-full col-span-2 md:col-span-1">
//           <input
//             type="text"
//             name="username"
//             value={user.username}
//             onChange={handleInput}
//             required
//             className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all focus:border-2 focus:border-[#ed1f26]"
//           />
//           <label className="absolute left-3 -top-1.5 text-[12px] font-medium text-gray-800">
//             <FontAwesomeIcon icon={faUser} /> Username
//           </label>
//         </div>

//         {/* Roll No */}
//         <div className="relative h-11 w-full col-span-2 md:col-span-1">
//           <input
//             type="text"
//             name="rollno"
//             value={user.rollno}
//             onChange={handleInput}
//             required
//             className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all focus:border-2 focus:border-[#ed1f26]"
//           />
//           <label className="absolute left-3 -top-1.5 text-[12px] font-medium text-gray-800">
//             <FontAwesomeIcon icon={faMobile} /> Roll No.
//           </label>
//         </div>

//         {/* Department */}
//         <div className="relative h-11 w-full col-span-2">
//           <select
//             name="department"
//             value={user.department}
//             onChange={handleInput}
//             required
//             className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all focus:border-2 focus:border-[#ed1f26]"
//           >
//             <option value="B.Tech Computer Science Engineering">
//               B.Tech Computer Science Engineering
//             </option>
//             <option value="B.Tech Electronics and Communication Engineering">
//               B.Tech Electronics and Communication Engineering
//             </option>
//             <option value="B.Tech Mechanical Engineering">
//               B.Tech Mechanical Engineering
//             </option>
//           </select>
//           <label className="absolute left-3 -top-1.5 text-[12px] font-medium text-gray-800">
//             <FontAwesomeIcon icon={faBuilding} /> Department
//           </label>
//         </div>

//         {/* Semester */}
//         <div className="relative h-11 w-full col-span-2 md:col-span-1">
//           <select
//             name="semester"
//             value={user.semester}
//             onChange={handleInput}
//             required
//             className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all focus:border-2 focus:border-[#ed1f26]"
//           >
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//               <option key={sem} value={sem}>
//                 {sem}
//               </option>
//             ))}
//           </select>
//           <label className="absolute left-3 -top-1.5 text-[12px] font-medium text-gray-800">
//             <FontAwesomeIcon icon={faListOl} /> Semester
//           </label>
//         </div>

//         {/* Phone */}
//         <div className="relative h-11 w-full col-span-2 md:col-span-1">
//           <input
//             type="text"
//             name="phone"
//             value={user.phone}
//             onChange={handleInput}
//             required
//             className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all focus:border-2 focus:border-[#ed1f26]"
//           />
//           <label className="absolute left-3 -top-1.5 text-[12px] font-medium text-gray-800">
//             <FontAwesomeIcon icon={faPhone} /> Phone
//           </label>
//         </div>

//         {/* Email */}
//         <div className="relative h-11 w-full col-span-2">
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleInput}
//             required
//             className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all focus:border-2 focus:border-[#ed1f26]"
//           />
//           <label className="absolute left-3 -top-1.5 text-[12px] font-medium text-gray-800">
//             <FontAwesomeIcon icon={faEnvelope} /> Email
//           </label>
//         </div>

//         {/* Password */}
//         <div className="relative h-11 w-full col-span-2">
//           <input
//             type="password"
//             name="password"
//             value={user.password}
//             onChange={handleInput}
//             required
//             className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all focus:border-2 focus:border-[#ed1f26]"
//           />
//           <label className="absolute left-3 -top-1.5 text-[12px] font-medium text-gray-800">
//             <FontAwesomeIcon icon={faLock} /> Password
//           </label>
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="py-2 px-4 rounded-full mt-6 font-medium text-white w-1/2 mx-auto block bg-gradient-to-r from-purple-500 to-red-500 transition-transform duration-200 hover:scale-105 active:scale-95"
//       >
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <RotatingLines
//               strokeColor="white"
//               strokeWidth="5"
//               animationDuration="0.75"
//               width="24"
//               visible={true}
//             />
//           </div>
//         ) : (
//           "Register Now"
//         )}
//       </button>

//       <p className="text-center mt-4 text-gray-600">
//         Already registered?{" "}
//         <Link
//           to="/login"
//           className="text-[#ed1f26] font-semibold hover:underline"
//         >
//           Login
//         </Link>
//       </p>
//     </form>
//   );
// };

// export default Register;
