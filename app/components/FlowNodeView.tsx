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
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">{node.title}</h2>
        {node.body && <p className="mt-3 text-lg text-slate-700">{node.body}</p>}
      </div>
      {node.accordion && <StageAccordion accordion={node.accordion} />}
      {node.question && <p className="text-xl font-semibold text-slate-900">{node.question}</p>}
      <DecisionButtons options={node.options} />
      {node.slideHint && <p className="text-sm text-slate-500">{node.slideHint}</p>}
      <p className="text-xs text-amber-700">
        Este material es solo para aprendizaje y no reemplaza la formación certificada en SVB/BLS ni la atención profesional.
      </p>
    </div>
  );
};

export default FlowNodeView;
