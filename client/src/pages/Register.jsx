// import { useState } from "react";
// import React from 'react'
// import { useNavigate, Link } from "react-router-dom";
// // import { useAuth } from "../store/auth";
// import { toast } from "react-toastify";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { faMobile } from '@fortawesome/free-solid-svg-icons'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
// import { faListOl } from '@fortawesome/free-solid-svg-icons'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import { faPhone } from '@fortawesome/free-solid-svg-icons'
// import { faLock } from '@fortawesome/free-solid-svg-icons'

// // import { RotatingLines } from "react-loader-spinner"; // Import the loader component
//  const Register = () => {
//   const [user, setUser] = useState({
//     username: "",
//     rollno: "",
//     department: "B.Tech Computer Science Engineering",
//     semester: "1",
//     email: "",
//     phone: "",
//     password: "",
//     otp: "",
//     userId: "" 
//   });

// //   const handleInput = (e) => {
// //     const { name, value } = e.target;
// //     setUser((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // Display a loading spinner or some indication that the request is in progress
// //     setLoading(true);
  
//   //   
//    };
  
  
//   return (
//     <>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md mx-auto mt-6  text-center border-2 rounded-3xl py-10 lg:py-12 px-6 lg:px-10 shadow-2xl ">
//       {/* {!otpStep ?*/} ( 
//         <>
//         <div className="grid grid-cols-2 gap-6">

//           <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
//             <input
//               type="text"
//               name="First Name"
//               value={user.username}
//               placeholder=""
//               className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
//               required
//             />
//             <label
//               className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]"
//             >
//               <span><FontAwesomeIcon icon={faUser} /></span><span>Username</span>
//             </label>
//           </div>


//           <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1" >
//             <input
//               type="text"
//               name="rollno"
//               value={user.rollno}
//               placeholder=""
//               className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
//               required
//             />
//             <label
//               className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]"
//             >
//               <span><FontAwesomeIcon icon={faMobile} /></span><span>Roll No.</span>
//             </label>
//           </div>

//           <div className="relative h-11 w-full col-start-1 col-span-2 ">
//             <select
//               name="department"
//               value={user.department}
//               onChange={handleInput}
//               placeholder=""
//               className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
//               required
//             >
//               <option value="B.Tech Computer Science Engineering">B.Tech Computer Science Engineering</option>
//               <option value="B.Tech Electronics and Communication Engineering">B.Tech Electronics and Communication Engineering</option>
//               <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
//             </select>

//             <label
//               className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]"
//             >
//               <span><FontAwesomeIcon icon={faBuilding} /></span><span>Department</span>
//             </label>
//           </div>




//           <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
           
//               <span><FontAwesomeIcon icon={faListOl} /></span><span>Semester</span>
//           </div>

          

//           <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1 ">
//             <input
//               type="text"
//               name="phone"
//               value={user.phone}
//               placeholder=""
//               className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
//               required
//             />

//             <label
//               className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]"
//             >
//               <span><FontAwesomeIcon icon={faPhone} /></span><span>Phone</span>
//             </label>
//           </div>

//           <div className="relative h-11 w-full col-start-1 col-span-2 ">
//             <input
//               type="email"
//               name="email"
//               value={email}
//               placeholder=""
//               className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
//               required
//             />

//             <label
//               className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]"
//             >
//               <span><FontAwesomeIcon icon={faEnvelope} /></span><span>Email</span>
//             </label>
//           </div>



//           <div className="relative h-11 w-full col-start-1 col-span-2">
//             <input
//               type="password"
//               name="password"
//               value={password}
//               placeholder=""
//               className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
//               required
//             />


//             <label
//               className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2  select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]"
//             >
//               <span><FontAwesomeIcon icon={faLock} /></span><span>Password</span>
//             </label>


//           </div>
//         </div>

//         <button
//           type="submit"
//           className="py-2 px-4 rounded-full mt-6 font-medium text-white w-1/2 mx-auto  block  bg-gradient-to-r from-purple-500 to-red-500   transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
//           disabled={loading} // Disable button while loading
//         >
//         </button>
//         </>
//       );
// }
// }

// export default Register;
import React from 'react'
import { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const [User,setUser]=useState({
     FirstName: "",
     LastName: "",
     Gender: "",
     Email: "",
     PhoneNumber: "",
     Adress:'' 

})
const handleInput = (e) => {
   const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault();

  }
  return (
    <div>
      <form className="flex flex-col gap-2 w-full max-w-md mx-auto mt-6  text-center border-2 rounded-3xl py-10 lg:py-12 px-6 lg:px-10 shadow-2xl ">
        <div className="grid grid-cols-2 gap-6">
        <div className="relative h-11 w-full col-start-1 col-span-2 md:col-span-1">
          <input type="text" 
          value={User.FirstName}
           name="firstname" id="" className='' placeholder='FirstName' />
          <input type="text"
          value={User.LastName} 
          name="Lastname" id="" placeholder='LastName'/>
          <input type="email"
          value={User.Email} name="" id=""  placeholder='Enter Email'/>
          <input
          value={User.Gender} type="radio" name="" id="" placeholder='select Gender' />
          <input type='text' name=""
          value={User.Adress} id="" placeholder='Enter address' />
          <input type="text" name=""
          value={User.PhoneNumber} id="" placeholder='enter Ph. number' />
          <button onClick={handleSubmit} className='h-15 w-60 border-b-2 bg-sky-500 text-white font-extrabold'>submit now</button>
        </div>

         </div>
      </form> 
      
    </div>
  )
}

export default Register