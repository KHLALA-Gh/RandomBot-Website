import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface InputProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  max?: number;
  min?: number;
}

export default function Input({
  name,
  placeholder,
  onChange,
  value,
  type,
  className,
  max,
  min,
}: InputProps) {
  return (
    <>
      <div
        className={
          "bg-arr rounded-md p-5 flex md:justify-between items-center md:flex-row flex-col md:gap-0 gap-3"
        }
      >
        <h1>{name}</h1>
        <input
          value={value || ""}
          onChange={onChange}
          type={type || "text"}
          className={
            "outline-none border-2 border-black rounded-md focus:border-main bg-black text-sm p-2 " +
            (className ? className : "")
          }
          placeholder={placeholder || ""}
          max={max}
          min={min}
        />
      </div>
    </>
  );
}
