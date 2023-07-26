interface ButtonProps {
  className?: string;
  children?: JSX.Element | string;
}

export default function MainBtn({ className, children }: ButtonProps) {
  return (
    <button
      className={
        "bg-main ps-16 pr-16 pt-2 pb-2 text-black rounded-md font-bold hover:scale-105 duration-200 " +
        (className || "")
      }
    >
      {children}
    </button>
  );
}
