"use client";

import React, { useState } from "react";
import { AccordionItem } from "../types/flow";
import { useFlow } from "../context/FlowContext";
import { AnimatePresence, motion } from "framer-motion";

type Props = { accordion?: AccordionItem[] };

export const StageAccordion: React.FC<Props> = ({ accordion }) => {
  const { currentNodeId, setCurrentNodeId, getNextNodeId } = useFlow();
  const [openId, setOpenId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  if (!accordion || accordion.length === 0) return null;

  const handleToggle = (item: AccordionItem) => {
    const isOpening = openId !== item.id;
    setOpenId(isOpening ? item.id : null);

    if (isOpening && item.autoAdvanceOnOpen) {
      setCompleted((prev) => new Set(prev).add(item.id));
      const nextId = getNextNodeId(currentNodeId);
      if (nextId) {
        // Pequeña pausa para que el usuario vea que se abrió
        setTimeout(() => setCurrentNodeId(nextId), 350);
      }
    }
  };

  return (
    <div className="space-y-2">
      {accordion.map((item) => {
        const isOpen = openId === item.id;
        const isDone = completed.has(item.id);
        return (
          <div key={item.id} className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <button
              className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              onClick={() => handleToggle(item)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className={`text-sm ${isDone ? "text-emerald-600" : "text-slate-500"}`}>
                {isDone ? "Completado" : isOpen ? "Cerrar" : "Abrir"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-slate-700">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default StageAccordion;
