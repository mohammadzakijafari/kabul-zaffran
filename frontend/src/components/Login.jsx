import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/apis/usersApi';
import { setCredentials } from '../store/apis/authApi';

const Login = () => {

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    let [user, setUser] = useState({ email: "", password: "" });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading, error}] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    console.log(`userInfo -------- ${userInfo}`);

    useEffect(() => { 
        if(userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const handleChange = (e) => {
        e.preventDefault();

        const value = e.target.value;
        setUser({...user, [e.target.name]: value });
    }
    
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            console.error('Please provide both email and password.');
            return;
        }

        
        try {
            const res = await login(user);
            
            // const res = await login(user).unwrap();
            let data = JSON.stringify(res);
            // console.log(`Data after stringify -------------- ${data}`);

            console.log(` ------------------ ${userInfo}`);
            dispatch(setCredentials(data));

            
            
            // console.log(`Response from backend ------- ${JSON.stringify(res)}`);
        }catch (err) {
            console.log(err?.data?.msg || err.error);
            console.log(err);
        }
    }
    // -----------------------------------------------------

    // let [user, setUser] = useState({ email: "", password: "" });
    // const navigate = useNavigate();
    // handling email and password change

    // const handleChange = (e) => {
    //     e.preventDefault();

    //     const value = e.target.value;
    //     setUser({...user, [e.target.name]: value });
    // }

    // handling login 
    // function handleLogin (e) {
    //     e.preventDefault();

    //     axios.post(`${backendUrl}/users/login`, user)
    //         .then((res) => {
    //             alert("Login Successful, Welcome");
    //             console.log(res.data);
    //             localStorage.setItem("token", res.data.token);
    //             navigate("/");
    //         }
    //     )
    //     .catch((error) => {
    //         alert("Could not Login");
    //     })
    // }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <form className="space-y-6" action="#" method="POST">
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={user.email}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={user.password}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-red-600 hover:text-red-500"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <div>
                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or
                            </span>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <div className="mt-6">
                        <a
                            href="/sign-up"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200"
                        >
                            New to Kabul Zaffron? Create account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login