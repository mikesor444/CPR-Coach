"use client";

import React from "react";
import { Option } from "../types/flow";
import { useFlow } from "../context/FlowContext";

type Props = { options?: Option[] };

const variantClasses: Record<NonNullable<Option["variant"]>, string> = {
  primary:
    "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.25)]",
  secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300",
};

export const DecisionButtons: React.FC<Props> = ({ options }) => {
  const { setCurrentNodeId } = useFlow();
  if (!options || options.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-3 sm:mt-6">
      {options.map((opt) => (
        <button
          key={opt.label}
          className={`w-full rounded-2xl px-4 py-4 text-lg font-extrabold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition ${variantClasses[opt.variant || "secondary"] || ""} min-h-[52px]`}
          onClick={() => setCurrentNodeId(opt.nextId)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default DecisionButtons;
