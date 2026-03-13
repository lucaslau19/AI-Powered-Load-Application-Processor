import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BreeFlow - Fast, Fair Funding",
  description: "AI-powered loan application processing by Bree",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <nav className="bg-nav">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-white">
              BreeFlow
            </a>
            <div className="flex gap-4 text-sm">
              <a href="/apply" className="text-white/70 hover:text-white transition-colors">
                Apply
              </a>
              <a href="/admin" className="text-white/70 hover:text-white transition-colors">
                Admin
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
