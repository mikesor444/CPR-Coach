"use client";

import { useState, useCallback } from "react";

export type LogEntry = { time: string; event: string };

export const useRCPLogger = () => {
  const [log, setLog] = useState<LogEntry[]>([]);

  const addLog = useCallback((event: string) => {
    setLog((prev) => [...prev, { time: new Date().toLocaleTimeString(), event }]);
  }, []);

  return { log, addLog };
};
