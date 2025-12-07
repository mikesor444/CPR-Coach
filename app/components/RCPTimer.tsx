"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecoveryPosition from "./RecoveryPosition";
import { useRCPLogger } from "../hooks/useRCPLogger";

type Phase = "compressions" | "breaths" | "pulse-check" | "recovery";

const RCPTimer: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("compressions");
  const [cycle, setCycle] = useState(1);
  const [beat, setBeat] = useState(1);
  const [breathStep, setBreathStep] = useState(1);
  const [pulseCountdown, setPulseCountdown] = useState(10);
  const beatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const metronomeRef = useRef<HTMLAudioElement | null>(null);
  const alertRef = useRef<HTMLAudioElement | null>(null);
  const hasLoggedStart = useRef(false);

  const { log, addLog } = useRCPLogger();

  useEffect(() => {
    if (!hasLoggedStart.current) {
      addLog("Inicio de compresiones");
      hasLoggedStart.current = true;
    }
  }, [addLog]);

  useEffect(() => {
    if (phase === "compressions") addLog(`Inicio del ciclo ${cycle}`);
    if (phase === "breaths") addLog(`Inicio de insuflaciones (ciclo ${cycle})`);
    if (phase === "pulse-check") addLog("Comprobación de pulso");
  }, [phase, cycle, addLog]);

  useEffect(() => {
    if (phase !== "compressions") return;
    if (beatIntervalRef.current) clearInterval(beatIntervalRef.current);

    beatIntervalRef.current = setInterval(() => {
      setBeat((prev) => {
        if (prev >= 30) {
          setPhase("breaths");
          return 30;
        }
        metronomeRef.current?.play().catch(() => undefined);
        return prev + 1;
      });
    }, 600);

    return () => {
      if (beatIntervalRef.current) clearInterval(beatIntervalRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "breaths") return;
    setBreathStep(1);
    if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);

    breathIntervalRef.current = setInterval(() => {
      setBreathStep((prev) => {
        if (prev >= 4) {
          if (cycle < 5) {
            setCycle((c) => c + 1);
            setBeat(1);
            setPhase("compressions");
          } else {
            setPhase("pulse-check");
            setPulseCountdown(10);
          }
          return 4;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    };
  }, [phase, cycle]);

  useEffect(() => {
    if (phase !== "pulse-check") return;
    if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);

    pulseIntervalRef.current = setInterval(() => {
      setPulseCountdown((prev) => {
        if (prev <= 1) {
          addLog("Sin pulso tras chequeo, reiniciando ciclos de RCP");
          setCycle(1);
          setBeat(1);
          setPhase("compressions");
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current);
    };
  }, [phase, addLog]);

  const handleReturnOfCirculation = (reason: string) => {
    addLog(reason);
    setPhase("recovery");
  };

  const neonCard = (
    <div className="relative mx-auto w-full max-w-3xl rounded-3xl border border-emerald-500/40 bg-black px-5 py-7 text-center text-white shadow-[0_0_30px_rgba(16,185,129,0.25)] sm:px-6 sm:py-8">
      <p className="mb-2 text-xs text-emerald-300">Modo RCP educativo</p>
      <h2 className="text-3xl font-black tracking-tight text-emerald-200">INICIA COMPRESIONES</h2>
      <p className="text-sm uppercase text-sky-300">Ritmo recomendado 100 comp/min</p>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-sky-300">
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-200">
            Ciclo {cycle} / 5
          </span>
          <span className="rounded-full bg-sky-500/20 px-3 py-1 text-sm font-semibold">
            Fase: {phase === "compressions" ? "Compresiones" : phase === "breaths" ? "Ventilaciones" : "Chequeo de pulso"}
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {phase === "compressions" && (
            <motion.div
              key="compressions"
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1.05, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="grid h-44 w-44 place-items-center rounded-full border-4 border-emerald-500/70 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                <motion.span
                  key={beat}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 0.15 }}
                  className="text-6xl font-black text-emerald-200"
                >
                  {beat}
                </motion.span>
              </div>
              <p className="mt-3 text-sm text-emerald-200">Cuenta las compresiones en voz alta</p>
            </motion.div>
          )}

          {phase === "breaths" && (
            <motion.div
              key="breaths"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center"
            >
              <div className="grid h-44 w-44 place-items-center rounded-full border-4 border-sky-400/70 bg-sky-500/10 shadow-[0_0_40px_rgba(56,189,248,0.35)]">
                <span className="text-5xl font-black text-sky-200">{breathStep}</span>
              </div>
              <p className="mt-3 text-sm text-sky-200">
                {breathStep % 2 === 1 ? "Insufla aire lento" : "Deja que el pecho baje"}
              </p>
            </motion.div>
          )}

          {phase === "pulse-check" && (
            <motion.div
              key="pulse-check"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center"
            >
              <div className="grid h-44 w-44 place-items-center rounded-full border-4 border-amber-400/70 bg-amber-500/10 shadow-[0_0_40px_rgba(251,191,36,0.35)]">
                <span className="text-5xl font-black text-amber-200">{pulseCountdown}</span>
              </div>
              <p className="mt-3 text-sm text-amber-200">BUSCA PULSO CENTRAL</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {phase === "pulse-check" ? (
            <button
              onClick={() => handleReturnOfCirculation("Pulso encontrado en chequeo")}
              className="rounded-xl border border-emerald-400 bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              He encontrado pulso
            </button>
          ) : (
            <button
              onClick={() => handleReturnOfCirculation("La persona se mueve o respira mejor")}
              className="rounded-xl border border-emerald-400 bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              La persona se mueve o vuelve a respirar
            </button>
          )}
          {phase === "pulse-check" && (
            <button
              onClick={() => {
                addLog("Sin pulso tras chequeo, reiniciando ciclos de RCP");
                setCycle(1);
                setBeat(1);
                setPhase("compressions");
              }}
              className="rounded-xl border border-slate-500 bg-slate-800 px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              No hay pulso, seguir RCP
            </button>
          )}
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div className="flex flex-col items-center gap-2 text-xs text-slate-400">
          <div className="h-24 w-24 rounded-full border border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-slate-900 flex items-center justify-center">
            <svg width="60" height="60" viewBox="0 0 120 120" className="text-emerald-300">
              <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="4" fill="none" />
              <path
                d="M60 25c-14 0-24 11-24 24 0 14 10 25 24 25s24-11 24-25c0-13-10-24-24-24zm0 40c-8 0-15-6-15-16 0-8 7-15 15-15s15 7 15 15c0 10-7 16-15 16z"
                fill="currentColor"
                opacity="0.8"
              />
              <rect x="54" y="70" width="12" height="25" rx="4" fill="currentColor" opacity="0.8" />
            </svg>
          </div>
          <p>Visualiza manos firmes en el centro del pecho.</p>
        </div>
      </div>
    </div>
  );

  if (phase === "recovery") {
    return (
      <div className="space-y-4">
        <RecoveryPosition log={log} addLog={addLog} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {neonCard}
      <div className="rounded-xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-xs text-emerald-200">
        <p className="font-semibold text-sky-200">Registro de acciones</p>
        <div className="mt-2 max-h-40 space-y-1 overflow-y-auto pr-2">
          {log.map((entry, idx) => (
            <div key={`${entry.time}-${idx}`} className="flex items-center justify-between rounded bg-slate-900/60 px-2 py-1">
              <span className="text-emerald-300">{entry.time}</span>
              <span className="text-slate-200">{entry.event}</span>
            </div>
          ))}
          {log.length === 0 && <p className="text-slate-400">Los eventos aparecerán aquí.</p>}
        </div>
        <p className="mt-3 text-[11px] text-amber-200">
          Este material es solo para aprendizaje y no reemplaza la formación certificada en SVB/BLS ni la atención profesional.
        </p>
      </div>

      <audio ref={metronomeRef} src="/sounds/metronome.mp3" preload="auto" />
      <audio ref={alertRef} src="/sounds/alert.mp3" preload="auto" />
    </div>
  );
};

export default RCPTimer;
