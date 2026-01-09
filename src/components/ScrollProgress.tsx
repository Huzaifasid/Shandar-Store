"use client";

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(latest * 100);
    });
  }, [scrollYProgress]);
  
  return (
    <motion.div
      style={{ width: `${progress}%` }}
      className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 z-[9999]"
    />
  );
}
