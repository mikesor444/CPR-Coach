"use client";

import React, { useState } from "react";
import { useFlow } from "../context/FlowContext";
import { AnimatePresence, motion } from "framer-motion";

const MobileNav: React.FC = () => {
  const { flow, history, visited, goBack, reset, setCurrentNodeId } = useFlow();
  const [open, setOpen] = useState(false);
  const visitedList = Array.from(visited).map((id) => flow.nodes[id]);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
          <button
            onClick={goBack}
            disabled={history.length === 0}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-800 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={reset}
            className="flex-1 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm font-semibold text-amber-800"
          >
            Reiniciar
          </button>
          <button
            onClick={() => setOpen(true)}
            className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white"
          >
            Mapa del flujo
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 max-h-[60vh] rounded-t-2xl bg-white p-4"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Nodos visitados</p>
                  <p className="text-xs text-slate-500">Toca para saltar</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-800"
                >
                  Cerrar
                </button>
              </div>
              <div className="max-h-[46vh] space-y-2 overflow-y-auto">
                {visitedList.map((node) => (
                  <button
                    key={node.id}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-800"
                    onClick={() => {
                      setCurrentNodeId(node.id);
                      setOpen(false);
                    }}
                  >
                    {node.title}
                  </button>
                ))}
                {visitedList.length === 0 && (
                  <p className="text-sm text-slate-500">Aún no hay nodos en el historial.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
