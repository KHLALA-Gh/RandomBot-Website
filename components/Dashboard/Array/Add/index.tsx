import SecondaryButton from "@/components/utils/secondary-button";
import "./style.css";
import MainBtn from "@/components/utils/main-btn";
type DataType = "roles" | "members" | "permissions";

type Props<DataT extends DataType> = {
  title: string;
  description?: string;
  data: DataT extends "roles"
    ? Role[]
    : DataT extends "members"
    ? Member[]
    : (keyof typeof PermissionFlagsBits)[];
  type: DataT;
  init: DataT extends "roles" | "members"
    ? string[]
    : keyof typeof PermissionFlagsBits;
  onClickElement: (id: string) => any;
  onCancel: () => any;
  onClickOk: () => any;
};

export default function Add<DataT extends DataType>({
  title,
  description,
  data,
  type,
  init,
  onClickElement,
  onCancel,
  onClickOk,
}: Props<DataT>) {
  return (
    <>
      <div className="border-[1px] border-main pt-7 ps-12 pr-12 bg-black z-[10000] absolute top-[50%] left-[50%] w-[340px] sm:w-[450px] rounded-[20px] h-[600px] translate-x-[-50%] translate-y-[-50%] flex flex-col pb-10">
        <div>
          <h1 className="text-[36px]">{title}</h1>
          <p className="text-sleep text-[16px] mt-3">{description}</p>
        </div>
        <div className="overflow-y-scroll flex-grow flex flex-col gap-3 op mt-16">
          {type === "roles" &&
            (data as Role[])?.map((role: Role, i) => {
              return (
                <div
                  onClick={() => onClickElement(role.id)}
                  key={i}
                  className={
                    "bg-[#1F1F1F] rounded-md p-5 flex gap-5 cursor-pointer " +
                    (init.indexOf(role.id) !== -1 ? "border-2 border-main" : "")
                  }
                >
                  <div
                    style={{
                      backgroundColor: `#${
                        role.color ? role.color?.toString(16) : "99aab5"
                      }`,
                    }}
                    className={`w-5 h-5 rounded-full`}
                  ></div>
                  <h1>{role.name}</h1>
                </div>
              );
            })}
          {type === "members" &&
            (data as Member[])?.map((member, i) => {
              return (
                <div
                  onClick={() => onClickElement(member?.user?.id)}
                  key={i}
                  className={
                    "bg-[#1F1F1F] rounded-md p-5 flex gap-5 cursor-pointer items-center " +
                    (init.indexOf(member?.user?.id) !== -1
                      ? "border-2 border-main"
                      : "")
                  }
                >
                  <div
                    style={{
                      backgroundImage: `url(${
                        member?.user?.avatar
                          ? `https://cdn.discordapp.com/avatars/${member?.user?.id}/${member?.user?.avatar}.png`
                          : "/img/dc_df.png"
                      })`,
                      backgroundSize: "cover",
                    }}
                    className={`w-7 h-7 rounded-full`}
                  ></div>
                  <h1>{member?.user?.username}</h1>
                </div>
              );
            })}
          {type === "permissions" &&
            (data as (keyof typeof PermissionFlagsBits)[])?.map(
              (permission, i) => {
                return (
                  <div
                    onClick={() => onClickElement(permission)}
                    key={i}
                    className={
                      "bg-[#1F1F1F] rounded-md p-5 flex gap-5 cursor-pointer items-center " +
                      (init.indexOf(permission) !== -1
                        ? "border-2 border-main"
                        : "")
                    }
                  >
                    <h1>{permission}</h1>
                  </div>
                );
              }
            )}
        </div>
        <div className="flex justify-center gap-5 mt-5 scale-75">
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
          <MainBtn onClick={onClickOk}>Ok</MainBtn>
        </div>
      </div>
    </>
  );
}
