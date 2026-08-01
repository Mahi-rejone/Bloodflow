"use client";
import { useLoginMutation } from "@/redux/feature/auth/authApi";
import { setCredentials } from "@/redux/feature/authSlice";
import { decodeToken } from "@/utils/decodeJwt";
import { DropletsIcon, LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { useDispatch } from "react-redux";
type TUser ={
  id: string
  email: string
  role: string
}
export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const [login, {isLoading, error}] = useLoginMutation()

  const handleSubmit = async (e: any) => {
    
    try {
      setLoading(true);
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const result = await login({email, password}).unwrap()
      if(result.success){
        setLoading(false)
        const userData = decodeToken(result.data) as TUser;
        dispatch(
          setCredentials({
            user: {
              id: userData.id,
              email: userData.email,
              role: userData.role,
            },
            accessToken: result.data
          }),
        );

      }
   
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-dark relative items-center justify-center overflow-hidden">
        <Image
          className="absolute inset-0 object-cover w-full h-full opacity-10"
          src="/assets/login_bg.png"
          alt="BloodFlow Login"
          fill
          priority
          sizes="50vw"
        />

        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white mb-5">
            Welcome Back to BloodFlow!
          </h2>

          <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
            Connecting donors with patients and helping save lives through every
            donation.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-app-bg">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-app-border">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <DropletsIcon className="text-app-primary" size={34} />

              <span className="text-3xl font-bold text-app-primary">
                BloodFlow
              </span>
            </Link>

            <h1 className="text-3xl font-bold text-app-text mb-2">Sign In</h1>

            <p className="text-app-text-light">
              Don't have an account?
              <Link
                href="/register"
                className="ml-2 text-app-primary font-semibold hover:text-app-primary-dark hover:underline transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-app-text mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <MailIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
                  size={20}
                />

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-app-text mb-2"
              >
                Password
              </label>

              <div className="relative">
                <LockIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
                  size={20}
                />

                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-app-primary hover:text-app-primary-dark hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-app-primary hover:bg-app-primary-dark text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
