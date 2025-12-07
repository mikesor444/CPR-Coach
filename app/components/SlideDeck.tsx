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
      <div className="flex flex-1">
        <main className="relative w-full lg:w-[calc(100%-20rem)]">
          <div className="mx-auto max-w-4xl px-4 py-8 lg:px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNodeId}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <FlowNodeView node={node} />
              </motion.div>
            </AnimatePresence>
          </div>
          <MobileNav />
        </main>
        <TOCSidebar />
      </div>
    </div>
  );
};

export default SlideDeck;
