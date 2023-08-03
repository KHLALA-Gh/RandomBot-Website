"use client";
interface Props {
  searchParams: {
    id: string;
  };
}

export default function Page({ searchParams }: Props) {
  // const { server, error: err, isLoading } = useServer(searchParams.id);
  return (
    <>
      {/* {!err && <></>}
      {err && (
        <>
          <div className="w-full h-screen flex justify-center items-center">
            <div>
              <h1 className="text-2xl text-red-600">
                An errror occurred : {err}
              </h1>
              <Link href="/dashboard">
                <MainBtn className="bg-red-600 translate-x-[-50%] ms-[50%] mt-5">
                  Dashboard
                </MainBtn>
              </Link>
            </div>
          </div>
        </>
      )} */}
    </>
  );
}
