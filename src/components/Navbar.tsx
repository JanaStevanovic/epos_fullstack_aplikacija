import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Startup Validation
      </Link>

      <div className="flex gap-4">
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Početna
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-blue-600">
          Prijava
        </Link>
        <Link href="/register" className="text-gray-700 hover:text-blue-600">
          Registracija
        </Link>
      </div>
    </nav>
  );
}