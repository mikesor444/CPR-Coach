import "./globals.css";
import type { Metadata } from "next";
import { FlowProvider } from "./context/FlowContext";

export const metadata: Metadata = {
  title: "Coach SVB/BLS",
  description: "Asistente educativo para Soporte Vital Básico en formato interactivo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="bg-amber-100 text-amber-900 px-4 py-2 text-sm text-center font-semibold shadow-sm">
          Este material es solo para aprendizaje y no reemplaza la formación certificada en SVB/BLS ni la atención profesional.
        </div>
        <FlowProvider>{children}</FlowProvider>
      </body>
    </html>
  );
}
