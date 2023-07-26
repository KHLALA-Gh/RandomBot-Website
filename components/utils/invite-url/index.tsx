import Link from "next/link";

interface InviteProps {
  children?: React.ReactNode;
}

export default function Invite({ children }: InviteProps) {
  return <Link href="/invite">{children}</Link>;
}
