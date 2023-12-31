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
    <div key={0} className="md:p-16 p-7 flex items-center w-full">
      <div className="w-full">
        <h1 className="text-[32px] text-center lg:text-left">{title}</h1>
        <p className="text-sleep mt-3 text-center lg:text-left">
          {description}
        </p>
        {(!buttonType || buttonType === "Main") && (
          <Link href={buttonLink || "/invite"} className="mt-10">
            <MainBtn className="mt-10 lg:w-auto w-full">
              {buttonContent || "Invite"}
            </MainBtn>
          </Link>
        )}
        {buttonType === "Secondary" && (
          <Link href={buttonLink || "/invite"}>
            <SecondaryButton className="mt-10 lg:w-auto w-full">
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
      <div className="grid lg:hidden grid-cols-1 gap-16 mt-36">
        {arr.reverse().map((e) => {
          return e;
        })}
      </div>
      <div className="lg:grid hidden grid-cols-2 gap-16 mt-36 ">
        {direction === "left" &&
          arr.reverse().map((e) => {
            return e;
          })}
        {direction === "right" &&
          arr.map((e) => {
            return e;
          })}
      </div>
    </>
  );
}
