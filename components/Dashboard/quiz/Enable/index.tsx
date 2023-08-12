"use client";
import Switch from "@/components/utils/switch";

export default function QuizEnable({
  enable,
  name,
  update,
}: {
  name: string;
  enable: boolean;
  update: (enable: boolean) => any;
}) {
  return (
    <>
      <div className="border-2 border-main p-5 flex justify-between mb-5 rounded-md">
        <h1 className="text-main sm:text-[16px] text-[14px]">{name}</h1>
        <Switch
          onClick={() => {
            update(!enable);
          }}
          enable={enable}
        />
      </div>
    </>
  );
}
