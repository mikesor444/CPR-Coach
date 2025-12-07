"use client";

import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";
import flow from "../data/flow";

type FlowContextValue = {
  flow: typeof flow;
  currentNodeId: string;
  history: string[];
  visited: Set<string>;
  setCurrentNodeId: (id: string) => void;
  goBack: () => void;
  reset: () => void;
  getNextNodeId: (id: string) => string | null;
};

const FlowContext = createContext<FlowContextValue | undefined>(undefined);

export const FlowProvider = ({ children }: { children: ReactNode }) => {
  const [currentNodeId, setCurrentNodeIdState] = useState<string>(flow.startId);
  const [history, setHistory] = useState<string[]>([]);

  const nodeOrder = useMemo(() => Object.keys(flow.nodes), []);

  const visited = useMemo(() => {
    const set = new Set<string>(history);
    set.add(currentNodeId);
    return set;
  }, [history, currentNodeId]);

  const setCurrentNodeId = (id: string) => {
    setHistory((prev) => [...prev, currentNodeId]);
    setCurrentNodeIdState(id);
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev];
      const last = newHistory.pop() as string;
      setCurrentNodeIdState(last);
      return newHistory;
    });
  };

  const reset = () => {
    setHistory([]);
    setCurrentNodeIdState(flow.startId);
  };

  const getNextNodeId = (id: string) => {
    const idx = nodeOrder.indexOf(id);
    if (idx >= 0 && idx + 1 < nodeOrder.length) {
      return nodeOrder[idx + 1];
    }
    return null;
  };

  const value = useMemo(
    () => ({
      flow,
      currentNodeId,
      history,
      visited,
      setCurrentNodeId,
      goBack,
      reset,
      getNextNodeId,
    }),
    [currentNodeId, history, visited]
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};

export const useFlow = () => {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used within FlowProvider");
  return ctx;
};
