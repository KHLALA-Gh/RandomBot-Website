import Image from "next/image";
interface Props {
  searchParams: {
    id: string;
  };
}

export default function Page({ searchParams }: Props) {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col">
        <Image src={"/img/rnd_rock.png"} alt="-_^" width={128} height={128} />
        <h1 className="text-center mt-5">
          this page will be available in 1.0.0 RandomBot version
        </h1>
      </div>
    </>
  );
}
