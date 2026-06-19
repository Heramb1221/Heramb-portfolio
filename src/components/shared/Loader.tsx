"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only once per browser session
    if (!sessionStorage.getItem("hc-loaded")) {
      setVisible(true);
      sessionStorage.setItem("hc-loaded", "1");
      const id = setTimeout(() => setVisible(false), 900);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }}
            className="font-mono text-2xl font-semibold tracking-tight text-foreground select-none"
          >
            <span className="text-primary">&lt;</span>
            <span>HC</span>
            <span className="text-primary"> /&gt;</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
