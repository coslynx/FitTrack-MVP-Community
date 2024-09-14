import Link from "next/link";
import { useSession } from "next-auth/react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-800">FitTrack</h1>
        </Link>
        <nav className="flex gap-4">
          {session ? (
            <>
              <Link href="/dashboard">
                <a className="text-gray-700 font-medium hover:text-gray-900">
                  Dashboard
                </a>
              </Link>
              <Link href="/profile">
                <a className="text-gray-700 font-medium hover:text-gray-900">
                  Profile
                </a>
              </Link>
              <Link href="/logout">
                <a className="text-gray-700 font-medium hover:text-gray-900">
                  Logout
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="text-gray-700 font-medium hover:text-gray-900">
                  Login
                </a>
              </Link>
              <Link href="/signup">
                <a className="text-gray-700 font-medium hover:text-gray-900">
                  Signup
                </a>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;