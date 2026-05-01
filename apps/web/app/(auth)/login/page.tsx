"use client";
import { loginUser, signupUser } from "@/lib/auth";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";

const Page = () => {
  const [mode, setMode] = useState("signup");
  const isLogin = mode === "login";

  const [error, setError] = useState("");

  const setUser = useAuthStore((s) => s.setUser);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, password } = form;

    if (isLogin) {
      if (!email || !password) {
        return setError("Please fill in all fields.");
      }
    } else {
      if (!firstName || !lastName || !email || !password) {
        return setError("Please fill in all fields.");
      }
    }
    try {
      if (isLogin) {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });
        setUser(res.user);
      } else {
        const fullName = `${form.firstName} ${form.lastName}`
          .replace(/\s+/g, " ")
          .trim();

        const payload = {
          name: fullName,
          email: form.email,
          password: form.password,
        };

        const res = await signupUser(payload);
        setUser(res.user);
        useAuthStore.getState().setAccessToken(res.accessToken);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:block w-1/2 bg-indigo-50"></div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full sm:w-sm 2xl:w-lg">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-[clamp(1.5rem,3vw,3rem)] font-semibold">
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>

              <p className="text-sm text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() => setMode(isLogin ? "signup" : "login")}
                  className="text-blue-500 hover:underline font-medium cursor-pointer"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {!isLogin && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="First Name"
                    className="flex-1 min-w-0 border border-gray-200 rounded-md px-4 py-2 text-sm"
                  />
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Last Name"
                    className="flex-1 min-w-0 border border-gray-200 rounded-md px-4 py-2 text-sm"
                  />
                </div>
              )}

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm"
              />

              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              className="bg-blue-500 py-3 text-sm rounded-md text-white w-full hover:bg-blue-600 transition cursor-pointer"
            >
              {isLogin ? "Login" : "Create account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
