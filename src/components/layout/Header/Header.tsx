import Privat from "@/components/ui/Button/Button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-900 flex items-center justify-between border-b border-slate-800 pb-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-100">
          Just{" "}
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            To Do
          </span>{" "}
          It ⚡
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Твій розумний таск-менеджер
        </p>
      </div>

      <nav>
        <ul
          className="flex
      
      items-center
      p-4
      gap-8
      text-white"
        >
          <li>
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tasks" className="hover:text-blue-400">
              Tasks
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-blue-400">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-400">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <Privat />
    </header>
  );
};

export default Header;
