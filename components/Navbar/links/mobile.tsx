import Link from "next/link";
import "../style.css";
import { Session } from "next-auth";
export default function MobileLinks({ session }: { session: Session | null }) {
  return (
    <>
      <div className="bg-[#000000b0] z-10 w-full links-anim absolute lg:hidden">
        <Link
          href="/invite"
          className="text-main font-bold text-lg ps-5 pr-5 pb-3 pt-2 block text-center"
        >
          Invite
        </Link>
        <Link
          href="/dashboard"
          className="text-main font-bold text-lg ps-5 pr-5 pb-3 pt-2 block text-center"
        >
          DashBoard
        </Link>
        <Link
          href="/docs"
          className="text-main font-bold text-lg ps-5 pr-5 pb-3 pt-2 block text-center"
        >
          Docs
        </Link>
        <Link
          href="/login"
          className="text-main font-bold text-lg ps-5 pr-5 pb-3 pt-2 block text-center"
        >
          Login
        </Link>
      </div>
    </>
  );
}
