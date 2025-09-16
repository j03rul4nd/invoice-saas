import Navbar from "@/components/Navbar";
import Aurora from '@/components/aurora';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Aurora como fondo fijo */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <Navbar />
        {children}
      </div>
    </>
  );
}