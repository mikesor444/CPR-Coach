"use client";

import React from "react";
import { Node } from "../types/flow";
import StageAccordion from "./StageAccordion";
import DecisionButtons from "./DecisionButtons";
import RCPTimer from "./RCPTimer";
import RecoveryPositionWrapper from "./RecoveryPositionWrapper";

type Props = { node: Node };

export const FlowNodeView: React.FC<Props> = ({ node }) => {
  if (node.view === "rcp-timer") {
    return <RCPTimer />;
  }

  if (node.view === "recovery") {
    return <RecoveryPositionWrapper />;
  }

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">{node.title}</h2>
        {node.body && <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{node.body}</p>}
      </div>
      {node.accordion && <StageAccordion accordion={node.accordion} />}
      {node.question && <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">{node.question}</p>}
      <DecisionButtons options={node.options} />
      {node.slideHint && <p className="text-sm text-slate-500">{node.slideHint}</p>}
      <p className="text-[11px] leading-snug text-amber-700">
        Este material es solo para aprendizaje y no reemplaza la formación certificada en SVB/BLS ni la atención profesional.
      </p>
    </div>
  );
};

export default FlowNodeView;
