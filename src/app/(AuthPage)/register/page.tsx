"use client";

import { useAppSelector } from "@/redux/hooks";
import {
  DropletsIcon,
  UserIcon,
  LockIcon,
  MailIcon,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      username,
      email,
      password,
      role: "USER", 
      profile: {
        blood_group: bloodGroup,
        phone_number: phoneNumber,
        district,
        town,
      },
    };

    // TODO: replace with real fetch("/api/auth/register", { method: "POST", body: JSON.stringify(payload) })
    console.log(payload);

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-dark relative items-center justify-center overflow-hidden">
        <Image
          className="absolute inset-0 object-cover w-full h-full opacity-10"
          src="/assets/login_bg.png"
          alt="BloodFlow Register"
          fill
          priority
          sizes="50vw"
        />

        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white mb-5">
            Join BloodFlow Today!
          </h2>

          <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
            Become a donor, connect with those in need, and help save lives
            through every contribution.
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

            <h1 className="text-3xl font-bold text-app-text mb-2">
              Create Account
            </h1>

            <p className="text-app-text-light">
              Already have an account?
              <Link
                href="/login"
                className="ml-2 text-app-primary font-semibold hover:text-app-primary-dark hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-app-text mb-2"
              >
                Username
              </label>

              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
                  size={20}
                />

                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
                />
              </div>
            </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
                />
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label
                htmlFor="bloodGroup"
                className="block text-sm font-medium text-app-text mb-2"
              >
                Blood Group
              </label>

              <div className="relative">
                <DropletsIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
                  size={20}
                />

                <select
                  id="bloodGroup"
                  required
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all bg-white appearance-none"
                >
                  <option value="" disabled>
                    Select your blood group
                  </option>
                  {BLOOD_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-app-text mb-2"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
                  size={20}
                />

                <input
                  id="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full pl-11 pr-4 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
                />
              </div>
            </div>

            {/* District + Town */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-app-text mb-2"
                >
                  District
                </label>

                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
                    size={20}
                  />

                  <input
                    id="district"
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Dhaka"
                    className="w-full pl-11 pr-3 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="town"
                  className="block text-sm font-medium text-app-text mb-2"
                >
                  Town
                </label>

                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-light"
                    size={20}
                  />

                  <input
                    id="town"
                    type="text"
                    required
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    placeholder="e.g. Mirpur"
                    className="w-full pl-11 pr-3 py-3 border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-app-primary hover:bg-app-primary-dark text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
