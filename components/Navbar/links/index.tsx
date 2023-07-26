import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <div>
        <div className="items-center gap-10 lg:gap-20 sm:flex hidden">
          <Link
            href="/"
            className="text-main font-bold text-lg hover:text-white duration-300"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-main font-bold text-lg hover:text-white duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/docs"
            className="text-main font-bold text-lg hover:text-white duration-300"
          >
            Docs
          </Link>
          <Link
            href="/about"
            className="text-main font-bold text-lg hover:text-white duration-300"
          >
            About
          </Link>
        </div>
      </div>
    </>
  );
}
