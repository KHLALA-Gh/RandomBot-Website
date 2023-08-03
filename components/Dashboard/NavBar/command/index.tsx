import Switch from "@/components/utils/switch";

export default function Command({
  enable,
  name,
  update,
}: Command & { update: (enable: boolean) => void }) {
  return (
    <>
      <div className="border-2 border-main p-5 flex justify-between mb-5 rounded-md">
        <h1 className="text-main">{name}</h1>
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
