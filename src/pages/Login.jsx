// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";



// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const navigate = useNavigate();
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setErrorMsg('');

//   if (!email || !password) {
//     setErrorMsg('Both fields are required');
//     return;
//   }

//   try {
//     const res = await axios.post('http://localhost:3000/api/auth/login', {
//       email,
//       password,
//     }); // 🍪 Cookies are sent and received automatically

//     console.log(res.data.message); // Login successful

//     // Optionally fetch user data or redirect
//     navigate('/'); // or wherever you want
//   } catch (err) {
//     setErrorMsg(err.response?.data?.message || 'Login failed');
//   }
// };


//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         {errorMsg && (
//           <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border rounded-md"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border rounded-md"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Log In
//           </button>
//         </form>

//         <div className="text-sm text-center mt-4 space-y-1">
//           <p>
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-blue-600 hover:underline">
//               Sign up
//             </Link>
//           </p>
//           <p>
//             <Link
//               to="/forgot-password"
//               className="text-blue-600 hover:underline"
//             >
//               Forgot your password?
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true); // Set loading to true on submit

        if (!email || !password) {
            setErrorMsg('Both fields are required');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password,
            }, {
                // 💡 FIX: This is the crucial part. It tells the browser to
                // send and receive the authentication cookie.
                withCredentials: true, 
            }); 

            console.log("Login successful. Navigating to homepage.");
            navigate('/');
        } catch (err) {
            console.error("Login failed:", err.response?.data?.message || err.message);
            setErrorMsg(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false); // Ensure loading is set to false after the request finishes
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {errorMsg && (
                    <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <div className="text-sm text-center mt-4 space-y-1">
                    <p>
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <p>
                        <Link
                            to="/forgot-password"
                            className="text-blue-600 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
