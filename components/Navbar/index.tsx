"use client";

import Link from "next/link";
import NavLinks from "./links";
import NavLogo from "./logo";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import MobileLinks from "./links/mobile";
export default function NavBar() {
  const [showLinks, setShowLinks] = useState<boolean>(false);
  return (
    <>
      <div
        className={
          "sticky z-[100] navbar ps-6 pr-6 md:ps-14 md:pr-14 lg:ps-32 lg:pr-32 pt-10 pb-10 flex justify-between items-center w-full " +
          (showLinks ? " bg-[#000000b0]" : "")
        }
      >
        <NavLogo />
        <NavLinks />
        <div className="sm:hidden block mr-5 relative">
          <FontAwesomeIcon
            icon={faChevronDown}
            className="cursor-pointer"
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          />
        </div>
      </div>
      {showLinks && <MobileLinks />}
    </>
  );
}
