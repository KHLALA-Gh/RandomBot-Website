import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Session from "@/components/Session";
config.autoAddCss = false;
export const metadata = {
  title: "RandomBot",
  description: "Website for RandomBot configurations and docs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-main">
        <Session>{children}</Session>
      </body>
    </html>
  );
}
