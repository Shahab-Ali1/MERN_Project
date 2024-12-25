import React, { useState } from "react";
import { useNavigate } from "react-router";
import { reload } from "../../Utils/Functions/Functions";
import { errorToast, warningToast } from "../../Utils/Toast/Toast";
import { loginService } from "../../Utils/Service";


const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({ email: "", pwd: "" });

    const handleFormData = (event) => {
        const { name, value } = event?.target;
        let oldForm = { ...formData }
        oldForm[name] = value
        setformData(oldForm)

    }

    const clickLogin = () => {
        if (!formData?.email || !formData?.pwd) {
            return warningToast("Email or Password cannot be empty");
        }
        let obj = {
            email: formData?.email,
            password: formData?.pwd
        }
        loginService("/users/login", obj)
            .then((response) => {
                if(response?.success){
                    localStorage.setItem("token", JSON.stringify(response.data));
                    navigate("/home");
                    reload();
                }
            }).catch((error) => {
                errorToast(error.message);
            })

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData?.email}
                            onChange={handleFormData}
                            className="w-full px-4 py-2 mt-1 text-sm text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="pwd"
                            value={formData?.pwd}
                            onChange={handleFormData}
                            className="w-full px-4 py-2 mt-1 text-sm text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a
                            href="#"
                            className="text-sm text-blue-600 hover:underline focus:outline-none"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <button
                        onClick={clickLogin}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </div>
                <p className="text-sm text-center text-gray-600">
                    Don’t have an account?{" "}
                    <a
                        href="#"
                        className="text-blue-600 hover:underline focus:outline-none"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
