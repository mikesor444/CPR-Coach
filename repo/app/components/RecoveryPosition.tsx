"use client";

import React, { useEffect, useRef, useState } from "react";
import { LogEntry } from "../hooks/useRCPLogger";

type Props = {
  log: LogEntry[];
  addLog: (event: string) => void;
};

const RecoveryPosition: React.FC<Props> = ({ log, addLog }) => {
  const [seconds, setSeconds] = useState(120);
  const [checkCycle, setCheckCycle] = useState(1);
  const alertRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    addLog("Inicio de fase de recuperación (pulso presente)");
  }, [addLog]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          alertRef.current?.play().catch(() => undefined);
          addLog(`Recordatorio: volver a tomar pulso (ciclo ${checkCycle})`);
          setCheckCycle((c) => c + 1);
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [addLog, checkCycle]);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Recuperación</p>
        <h2 className="text-3xl font-black text-emerald-900">Posición de recuperación</h2>
        <p className="mt-3 text-lg text-emerald-900">
          Coloca a la persona de lado, con la pierna superior flexionada para estabilizar. Inclina la cabeza hacia atrás para que la vía aérea quede
          libre y permite que la saliva o vómito drenen fuera de la boca. Vigila respiración y nivel de respuesta en todo momento.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-emerald-900">
          <li>Asegura que el cuello quede alineado y la boca ligeramente hacia abajo.</li>
          <li>Afloja prendas apretadas y mantiene el cuerpo abrigado.</li>
          <li>Si hay sospecha de trauma, mueve lo mínimo imprescindible mientras proteges la vía aérea.</li>
        </ul>
        <div className="mt-6 flex items-center gap-4">
          <div className="rounded-2xl border border-emerald-300 bg-white px-5 py-3 text-center shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">Siguiente chequeo de pulso</p>
            <p className="text-4xl font-black text-emerald-900 tabular-nums">
              {minutes}:{secs}
            </p>
            <p className="text-xs text-emerald-600">Se reinicia en bucle</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-900 shadow-sm">
            <p className="font-semibold text-emerald-700">Ciclo de chequeos</p>
            <p className="text-emerald-900">Recordatorio #{checkCycle}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-sm font-semibold text-slate-800">Registro de eventos</p>
        <div className="mt-2 max-h-40 space-y-1 overflow-y-auto pr-2 text-sm text-slate-700">
          {log.map((entry, idx) => (
            <div key={`${entry.time}-${idx}`} className="flex items-center justify-between rounded bg-slate-100 px-2 py-1">
              <span className="text-slate-500">{entry.time}</span>
              <span className="text-slate-900">{entry.event}</span>
            </div>
          ))}
          {log.length === 0 && <p className="text-slate-500">El registro aparecerá aquí.</p>}
        </div>
        <p className="mt-3 text-xs text-amber-700">
          Este material es solo para aprendizaje y no reemplaza la formación certificada en SVB/BLS ni la atención profesional.
        </p>
      </div>

      <audio ref={alertRef} src="/sounds/alert.mp3" preload="auto" />
    </div>
  );
};

export default RecoveryPosition;
