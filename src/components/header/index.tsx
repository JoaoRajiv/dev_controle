"use client";
import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
export function Header() {
  const { status, data } = useSession();

  const handleLogin = async () => {
    await signIn();
  };
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="w-full flex items-center px-2 py-4 bf-white h-20 shadow-md">
      <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-wide duration-200">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex align-center gap-4 px-2 items-center">
            <p className="text-gray-500 line-height:0 hidden sm:block">
              Olá <span className="">{data.user.name}</span>
            </p>

            <Link href="/dashboard">
              {data.user.image ? (
                <Image
                  src={data.user.image}
                  width={50}
                  height={50}
                  className="rounded-lg"
                  alt="User avatar"
                  quality={100}
                />
              ) : (
                <FiUser size={26} color="#4b5563" />
              )}
            </Link>
            <button onClick={handleLogout}>
              <FiLogOut size={26} className="text-red-500" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
