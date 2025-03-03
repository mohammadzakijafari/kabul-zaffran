import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../store/apis/usersApi';

const SignUp = () => {
    // initializing state variables for email and password
    let [user, setUser] = useState({ username: "", email: "", password: "" });
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // accessing data from redux store
    const [register, {isLoading, error}] = useRegisterMutation();

    //checks whether user is authenticated or not
    const { userInfo } = useSelector((state) => state.auth);
    useEffect(() => {
        if(userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    // getting user information from form
    const handleChange = (e) => {
        e.preventDefault();

        const value = e.target.value;
        setUser({...user, [e.target.name]: value });
    }
    
    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username || !user.email || !user.password) {
            console.error('Please provide username, email and password.');
            return;
        }

        try {
            const res = await register(user).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
            console.log(res.data.msg);
        }catch (err) {
            console.log(err?.data?.msg || err.error);
        }
    }


    // let [user, setUser] = useState({ username: "", email: "", password: "" });
    // const navigate = useNavigate();
    // handling user input change
    // const handleChange = (e) => {
    //     e.preventDefault();
    //     const value = e.target.value;
    //     // Update the state with the added value by the user
    //     setUser({...user, [e.target.name]: value });
    // }
    // handling user click to register
    // function handleSignUp (e) {
    //     e.preventDefault();
    //     axios.post(`${backendUrl}/users/register`, user)
    //         .then((res) => {
    //             alert("Sign Up Successful");
    //             navigate("/login");
    //         }
    //     )
    //     .catch((error) => {
    //         alert("Could not Sign Up");
    //     });
    // }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-medium text-red-600 hover:text-red-500"
                    >
                        Log in
                    </a>
                </p>
            </div>

            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <form className="space-y-6" action="#" method="POST">
                    {/* Username Input */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <div className="mt-1">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="name"
                                required
                                value={user.username}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

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

                    {/* Sign Up Button */}
                    <div>
                        <button
                            type="submit"
                            onClick={handleSignUp}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp