import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
  return (
    <>
      <div>
        <Link href="/" className="flex items-center font-bold">
          <Image width={48} height={48} src="/img/rnd.png" alt="RandomBot" />
          <h1 className="ps-3 text-2xl">RandomBot</h1>
        </Link>
      </div>
    </>
  );
}
