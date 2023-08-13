"use client";
import Nav from "@/components/Nav";
import { connectDB } from "@/utils/mongoose";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center bg-bgGray">
        <div className="w-full text-center">
          <button
            className="rounded-lg bg-white p-2 px-4"
            onClick={() => signIn("google")}
          >
            Login with google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-bgGray">
      <div className="flex items-center p-4 md:hidden">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="mr-6 flex grow justify-center">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
