"use client";

import React, { useEffect, useState } from "react";
import { ILogin } from "@/types/user.types";
import { useLayout } from "@/context/LayoutContext";
import { handleApiError, NotificationMessage } from "@/lib/toastMessage";
import { useLoader } from "@/context/LoaderContext";
import { useAuth } from "@/context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { NOTIFICATION } from "@/config/notification.message";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Common/Button/Button";
import { userlogin, verifyOtp } from "@/services/api/auth/auth";
import Link from "next/link";
import { authService } from "@/services/auth/Auth";

export const Login = () => {
  const [inputValue, setInputValue] = useState<ILogin>({
    phone: "",
  });
  const { setShowHeader, setShowFooter } = useLayout();
  const { showLoader, hideLoader, loading } = useLoader();
  const router = useRouter();
  const { login, googleLogin } = useAuth();

  // handle layout
  useEffect(() => {
    setShowHeader(true);
    setShowFooter(false);
    return () => {
      setShowHeader(false);
      setShowFooter(true);
    };
  }, []);

  // handle input change
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // handle login
  const handleLogin = async () => {
    if (!inputValue.phone) {
      NotificationMessage("Please fill all fields", "error");
      return;
    }
    try {
      showLoader();
      authService.login()
      const payload = {
        phone: inputValue.phone,
        extension: "+91"
      }
      const res = await userlogin(payload);
      if (!res) {
        NotificationMessage("Invalid login response", "error");
        return;
      }
      const verify = await verifyOtp('LcMZR0UAAAAALgPMcgHwga7gY5p8QMg1Hj-bmUv');
      console.log(verify)
      login(res);
      NotificationMessage(NOTIFICATION.LOGIN_SUCCESS, "success");
      // router.push('/profile')
    } catch (error) {
      handleApiError(error);
    } finally {
      hideLoader();
      setInputValue({
        phone: "",
      });
    }
  };

  const oauthHandler = (res: any) => {
    if (!res?.credential) {
      NotificationMessage(NOTIFICATION.LOGIN_FAILED, "error");
      return;
    }
    googleLogin(res);
    NotificationMessage(NOTIFICATION.LOGIN_SUCCESS, "success");
    router.push('/profile')
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
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
              Enter Email/Mobile number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Email or Mobile number"
              value={inputValue.phone}
              onChange={handleChangeInput}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          {/* <div>
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
          </div> */}

          {/* Login Button */}
          <Button
            loading={loading}
            text="Get OTP"
            loadingText="Logging in..."
            onClick={handleLogin}
          />


          <div className="flex justify-center items-center">
            <span className="mx-2 text-gray-500">OR</span>
          </div>

          <div className="google-wrapper flex items-center justify-center">
            <GoogleLogin
              onSuccess={(res) => oauthHandler(res)}
              onError={() => NotificationMessage("Login Failed", "error")}
            />
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link href='/register' className="text-blue-600 cursor-pointer font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
