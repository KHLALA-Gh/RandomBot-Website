import Image from "next/image";
import Link from "next/link";
import MainBtn from "../utils/main-btn";
import "@/public/css/global.css";
interface DiscordServerProps {
  img: string;
  name: string;
  id: string;
}

export default function DiscordServer({ name, img, id }: DiscordServerProps) {
  return (
    <>
      <div className="bg-[#35373C] rounded-lg overflow-hidden">
        <div className="h-[200px] relative overflow-hidden">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(10px)",
              inset: "0",
            }}
          ></div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full overflow-hidden">
            <Image src={img} alt={name} width={128} height={128} />
          </div>
        </div>
        <div className="sm:p-7 p-3">
          <h1 className="text-xl">{name}</h1>
          <Link href={`/dashboard/server?id=${id}`}>
            <MainBtn className="mt-7">configure</MainBtn>
          </Link>
        </div>
      </div>
    </>
  );
}
