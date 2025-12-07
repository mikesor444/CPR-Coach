"use client";

import React, { useState } from "react";
import { useFlow } from "../context/FlowContext";
import { motion, AnimatePresence } from "framer-motion";

export const TOCSidebar: React.FC = () => {
  const { flow, currentNodeId, setCurrentNodeId, visited } = useFlow();
  const [isOpen, setIsOpen] = useState(false);

  const nodeEntries = Object.values(flow.nodes);
  const progress = Math.round((visited.size / nodeEntries.length) * 100);

  const list = (
    <ul className="space-y-2">
      {nodeEntries.map((node) => {
        const active = node.id === currentNodeId;
        return (
          <li key={node.id}>
            <button
              onClick={() => setCurrentNodeId(node.id)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                active ? "bg-emerald-100 text-emerald-700" : "bg-white hover:bg-slate-100 text-slate-800"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {node.title}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <div className="hidden lg:block w-full max-w-[18rem] shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Progreso</p>
          <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-slate-700 mt-1">{progress}% de nodos vistos</p>
        </div>
        {list}
      </div>

      <div className="fixed bottom-4 right-4 z-30 lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-emerald-600 px-4 py-3 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Mapa del flujo
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-4 shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Mapa del flujo</p>
                  <p className="text-xs text-slate-500">Progreso {progress}%</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-800"
                >
                  Cerrar
                </button>
              </div>
              {list}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TOCSidebar;
