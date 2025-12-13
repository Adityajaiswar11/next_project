"use client";

import React, { useEffect, useState } from "react";
import { ILogin } from "@/types/login";
import { login } from "@/services/auth/Auth";
import { toast } from "sonner";
import { useLayout } from "@/context/LayoutContext";

export const Login = () => {
  const [inputValue, setInputValue] = useState<ILogin>({
    username: "",
    password: "",
  });
  const { setShowHeader } = useLayout();

  useEffect(() => {
    setShowHeader(true);

    return () => {
      setShowHeader(false);
    };
  }, []);

  const [loading, setLoading] = useState(false);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!inputValue.username || !inputValue.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await login(inputValue);
    } catch (error) {
      // error handled globally by axios + sonner
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Login to your account
        </p>

        <div className="mt-6 space-y-4">
          {/* username */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={inputValue.username}
              onChange={handleChangeInput}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={inputValue.password}
              onChange={handleChangeInput}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer font-medium">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
