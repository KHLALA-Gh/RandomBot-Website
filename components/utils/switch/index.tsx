export default function Switch({
  enable,
  onClick,
}: {
  enable: boolean;
  onClick?: () => any;
}) {
  return (
    <>
      <div
        onClick={onClick}
        className={
          "w-[63px] h-[26px] duration-300 relative rounded-full cursor-pointer " +
          (enable ? "bg-main" : "bg-red-600")
        }
      >
        <div
          className={
            `duration-300 w-[26px] h-[26px] rounded-full bg-white absolute drop-shadow-xl ` +
            (enable
              ? "translate-x-[-100%] left-[100%]"
              : "translate-x-0 left-0")
          }
        ></div>
      </div>
    </>
  );
}
