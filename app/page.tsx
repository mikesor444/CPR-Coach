import SlideDeck from "./components/SlideDeck";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-emerald-600 to-sky-600 px-6 py-10 text-white shadow-lg">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">Entrenamiento guiado</p>
            <h1 className="text-3xl font-black lg:text-4xl">Soporte Vital Básico interactivo</h1>
            <p className="mt-2 max-w-3xl text-lg text-emerald-50">
              Explora el árbol de decisiones, sigue el metrónomo para RCP y repasa la posición de recuperación. Todo en un solo flujo educativo.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
            Recuerda llamar al 911 y pedir un AED ante cualquier sospecha de paro.
          </div>
        </div>
      </header>
      <SlideDeck />
    </div>
  );
}
