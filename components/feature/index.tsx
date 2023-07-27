import Link from "next/link";
import MainBtn from "../utils/main-btn";
import SecondaryButton from "../utils/secondary-button";
import Image from "next/image";

interface FeatureProps {
  img: string;
  title: string;
  description: string;
  buttonLink?: string;
  buttonType?: "Secondary" | "Main";
  buttonContent?: string;
  direction: "left" | "right";
}

export default function Feature({
  title,
  img,
  description,
  buttonLink,
  direction,
  buttonType,
  buttonContent,
}: FeatureProps) {
  const arr: JSX.Element[] = [
    <div key={0} className="p-16 flex items-center">
      <div>
        <h1 className="text-[32px]">{title}</h1>
        <p className="text-sleep mt-3">{description}</p>
        {(!buttonType || buttonType === "Main") && (
          <Link href={buttonLink || "/invite"} className="mt-10">
            <MainBtn className="mt-10">{buttonContent || "Invite"}</MainBtn>
          </Link>
        )}
        {buttonType === "Secondary" && (
          <Link href={buttonLink || "/invite"}>
            <SecondaryButton className="mt-10">
              {buttonContent || "Invite"}
            </SecondaryButton>
          </Link>
        )}
      </div>
    </div>,
    <div key={1} className="flex justify-center">
      <Image
        src={img}
        alt="Feature"
        width={570}
        height={450}
        className="w-auto h-auto"
      />
    </div>,
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-16 mt-36">
        {direction === "left" &&
          arr.map((e) => {
            return e;
          })}
        {direction === "right" &&
          arr.reverse().map((e) => {
            return e;
          })}
      </div>
    </>
  );
}
