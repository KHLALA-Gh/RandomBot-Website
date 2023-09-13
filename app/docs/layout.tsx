import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RandomBot documentation",
  description: "Read RandomBot documentation",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
