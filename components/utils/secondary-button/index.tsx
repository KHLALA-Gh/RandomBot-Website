interface SecondaryButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => any;
}

export default function SecondaryButton({
  className,
  children,
  onClick,
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        "border-2 border-main ps-10 pr-10 pt-2 pb-2 text-main rounded-md font-bold hover:scale-105 duration-200 " +
        className
      }
    >
      {children}
    </button>
  );
}
