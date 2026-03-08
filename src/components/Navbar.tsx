"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Startup Validation
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Početna
        </Link>
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-blue-600">
          Prijava
        </Link>
        <Link href="/register" className="text-gray-700 hover:text-blue-600">
          Registracija
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}