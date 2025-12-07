"use client";

import React, { useEffect } from "react";
import RecoveryPosition from "./RecoveryPosition";
import { useRCPLogger } from "../hooks/useRCPLogger";

const RecoveryPositionWrapper: React.FC = () => {
  const { log, addLog } = useRCPLogger();

  useEffect(() => {
    addLog("Se coloca al paciente en posición de recuperación desde la evaluación");
  }, [addLog]);

  return <RecoveryPosition log={log} addLog={addLog} />;
};

export default RecoveryPositionWrapper;
