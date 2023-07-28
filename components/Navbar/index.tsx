"use client";

import NavLinks from "./links";
import NavLogo from "./logo";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import MobileLinks from "./links/mobile";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
export default function NavBar() {
  const [showLinks, setShowLinks] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <>
      <div
        className={
          "sticky z-[100] navbar ps-6 pr-6 md:ps-14 md:pr-14 lg:ps-32 lg:pr-32 pt-10 pb-10 flex justify-between items-center w-full " +
          (showLinks ? " bg-[#000000b0]" : "")
        }
      >
        <NavLogo />
        <NavLinks session={session} />
        <div className="lg:hidden flex items-center gap-5 mr-5 relative">
          {session && (
            <div className="block lg:hidden">
              <Link href={"/dashboard"}>
                <Image
                  src={session?.user?.image || "/img/rnd.png"}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white"
                />
              </Link>
            </div>
          )}
          <FontAwesomeIcon
            icon={faChevronDown}
            className="cursor-pointer"
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          />
        </div>
      </div>
      {showLinks && <MobileLinks session={session} />}
    </>
  );
}
