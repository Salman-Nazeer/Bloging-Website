import React from "react";
import { Link, useNavigation } from "react-router-dom";
import { Login as authLogin } from "../Store/Features/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../Services/auth_services";

const signup = () => {
  const navegate = useNavigation();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.CreateAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        dispatch(authLogin(userData));
        navegate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              lable="Full Name:"
              palceholder="Enter your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              lable="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(value) ||
                    "Email address must be a valid addres",
                },
              })}
            />
            <Input
              lable="Password"
              type="password"
              palceholder="Enter your Password"
              {...register("passward", {
                required: true,
              })}
            />
            <button type="submit" className="w-full">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signup;
