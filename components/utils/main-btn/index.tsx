import React from "react";

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => any;
}

export default function MainBtn({
  className,
  children,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
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
