export default function Switch({
  enable,
  onClick,
  disabled,
}: {
  enable: boolean;
  onClick?: () => any;
  disabled?: boolean;
}) {
  return (
    <>
      <div
        onClick={onClick}
        className={
          "w-[63px] h-[26px] duration-300 relative rounded-full cursor-pointer " +
          (enable && !disabled ? "bg-main" : "bg-red-600") +
          (disabled ? " bg-[#565656] loading cursor-default" : "")
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
