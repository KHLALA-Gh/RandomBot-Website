import Switch from "@/components/utils/switch";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Command({
  enable,
  name,
  update,
}: Command & { update: (enable: boolean) => void }) {
  const searchParams = useSearchParams();
  return (
    <>
      <div className="border-2 border-main p-5 flex justify-between mb-5 rounded-md">
        <Link
          href={`/dashboard/server/commands/${name}?id=${searchParams.get(
            "id"
          )}`}
        >
          <h1 className="text-main sm:text-[16px] text-[14px]">{name}</h1>
        </Link>
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
