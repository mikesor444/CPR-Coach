"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFlow } from "../context/FlowContext";
import FlowNodeView from "./FlowNodeView";
import TOCSidebar from "./TOCSidebar";
import MobileNav from "./MobileNav";

export const SlideDeck: React.FC = () => {
  const { flow, currentNodeId } = useFlow();
  const node = flow.nodes[currentNodeId];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row lg:items-start lg:px-6">
          <main className="relative w-full lg:max-w-3xl xl:max-w-4xl">
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNodeId}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <FlowNodeView node={node} />
                </motion.div>
              </AnimatePresence>
            </div>
            <MobileNav />
          </main>
          <div className="w-full lg:w-72 xl:w-80">
            <TOCSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideDeck;
