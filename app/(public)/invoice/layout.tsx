import type { Metadata } from "next";
import Aurora from '@/components/aurora';

export const metadata: Metadata = {
  title: "Public Invoice View",
  description: "View public invoices securely",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Aurora como fondo fijo */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.9}
        />
      </div>
      
      {/* Contenido principal SIN navbar */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}