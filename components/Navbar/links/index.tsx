import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function NavLinks({ session }: { session: Session | null }) {
  return (
    <>
      <div>
        <div className="items-center gap-10 lg:gap-20 lg:flex hidden">
          <Link
            href="/invite"
            className="text-main font-bold text-lg hover:text-white duration-300"
          >
            Invite
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
          {session && (
            <>
              <Link href="/dashboard">
                <div className="flex items-center gap-5">
                  <Image
                    src={session.user?.image || "/img/rnd.png"}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-full border-[2px] border-white"
                  />
                  <p>{session.user?.name}</p>
                </div>
              </Link>
            </>
          )}
          {!session && (
            <>
              <Link
                className="text-main font-bold text-lg hover:text-white duration-300"
                href="/login"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
