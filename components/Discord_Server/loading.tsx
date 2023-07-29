import MainBtn from "../utils/main-btn";
import "@/public/css/global.css";

export default function DiscordServerLoading() {
  return (
    <>
      <div className="bg-[#35373C] rounded-lg overflow-hidden">
        <div className="h-[200px] relative overflow-hidden loading">
          <div className="h-full w-full"></div>
        </div>
        <div className="sm:p-7 p-3">
          <h1 className="text-xl"></h1>
          <MainBtn className="mt-7 loading">configure</MainBtn>
        </div>
      </div>
    </>
  );
}
