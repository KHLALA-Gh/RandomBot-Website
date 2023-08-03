interface ButtonProps {
  className?: string;
  children?: JSX.Element | string;
  disabled?: boolean;
}

export default function MainBtn({
  className,
  children,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={
        "ps-16 pr-16 pt-2 pb-2 text-black rounded-md font-bold hover:scale-105 duration-200 " +
        (disabled ? "bg-transparent " : "bg-main ") +
        (className || "")
      }
    >
      {children}
    </button>
  );
}
