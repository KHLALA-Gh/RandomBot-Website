import Switch from "@/components/utils/switch";

export default function LoadingCommand() {
  return (
    <>
      <div className="border-2 border-main p-5 flex justify-between mb-5 rounded-md">
        <h1 className="text-main w-[75%] h-[20px] loading rounded-md"></h1>
        <Switch onClick={() => {}} enable={false} disabled />
      </div>
    </>
  );
}
