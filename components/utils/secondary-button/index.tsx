interface SecondaryButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function SecondaryButton({
  className,
  children,
}: SecondaryButtonProps) {
  return (
    <button
      className={
        "border-2 border-main ps-10 pr-10 pt-2 pb-2 text-main rounded-md font-bold hover:scale-105 duration-200 " +
        className
      }
    >
      {children}
    </button>
  );
}
