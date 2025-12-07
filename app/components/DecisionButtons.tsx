"use client";

import React from "react";
import { Option } from "../types/flow";
import { useFlow } from "../context/FlowContext";

type Props = { options?: Option[] };

const variantClasses: Record<NonNullable<Option["variant"]>, string> = {
  primary: "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500",
  secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300",
};

export const DecisionButtons: React.FC<Props> = ({ options }) => {
  const { setCurrentNodeId } = useFlow();
  if (!options || options.length === 0) return null;

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {options.map((opt) => (
        <button
          key={opt.label}
          className={`w-full rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition ${variantClasses[opt.variant || "secondary"] || ""}`}
          onClick={() => setCurrentNodeId(opt.nextId)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default DecisionButtons;
