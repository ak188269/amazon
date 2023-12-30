"use client";
import React, { useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import { register } from "@/services/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/providers/UserProvider";
const page = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    confirm_password: "",
  });
  const notify = useToast();
  const router = useRouter();
  const returnUrl = useSearchParams().get('returnUrl');
  const {setUser} = useUser();
  const handleChange = (e) => {
    setDetails((details) => {
      return {
        ...details,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (details.password !== details.confirm_password) {
      notify("Password and confirm password  not same", "error");
      return;
    }
    const { name, email, password } = details;
    const [response, error] = await register(name, email, password);
    if (error) {
      notify(error.message, "error");
      return;
    }
    console.log("data" , response);
    setUser(response.data);
    notify(response.message, "success");

    if (returnUrl) router.replace(returnUrl);
    else router.replace("/");
  };
  return (
    <div className={`flex flex-col items-center p-3 gap-3`}>
      {/* ------- Logo part --------- */}
      <Link href={"/"} className="flex justify-center">
        <span className={`${styles.amazon_logo}`}>
          {/* ------- in this background image of amazon will be added ----------- */}
        </span>
        <span className="mb-2">.in</span>
      </Link>

      {/* --------- form part ---------- */}
      <form
        onSubmit={handleRegister}
        onChange={handleChange}
        className={`p-4 border-[1.5px] flex flex-col gap-3 min-w-[310px] w-[60%] lg:w-[40%] max-w-[350px] rounded-lg`}
      >
        <h1 className="text-2xl font-[600]">Create Account</h1>

        <div className={`flex flex-col gap-1 text-sm`}>
          <label htmlFor="name" className="font-semibold text-xs">
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="First and last name"
            className={`p-1 px-2 border border-[#787878] rounded outline-none`}
          />
        </div>

        <div className={`flex flex-col gap-1 text-sm`}>
          <label htmlFor="email" className="font-semibold text-xs">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Valid email"
            className={`p-1 px-2 outline-none border border-[#787878] rounded`}
          />
        </div>

        <div className={`flex flex-col gap-1 text-sm`}>
          <label htmlFor="number" className="font-semibold text-xs">
            Mobile number (optional){" "}
          </label>
          <input
            type="text"
            name="number"
            placeholder="Mobile number"
            id="number"
            className={`p-1 px-2 outline-none border border-[#787878] rounded`}
          />
        </div>

        <div className={`flex flex-col gap-1 text-sm`}>
          <label htmlFor="password" className="font-semibold text-xs">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="At least 6 characters"
            className={`p-1 px-2 outline-none border border-[#787878] rounded`}
          />
        </div>
        <div className={`flex flex-col gap-1 text-sm`}>
          <label htmlFor="confirm_password" className="font-semibold text-xs">
            Confirm password
          </label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className={`p-1 px-2 outline-none border border-[#787878] rounded`}
            placeholder="Confirm password"
          />
        </div>

        <button className={`bg-[#FFD814] p-2 rounded-lg text-sm mt-1`}>
          Register
        </button>

        <hr />
        <span className="text-sm">
          Already have an account ?{" "}
          <Link href="/login" className={"text-[#3bace0]"}>
            {" "}
            Sign in
          </Link>
        </span>
      </form>
    </div>
  );
};

export default page;
