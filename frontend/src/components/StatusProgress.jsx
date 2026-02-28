import { useEffect, useRef, useState } from "react";

const StatusProgress = ({ duration = 5000, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const start = Date.now();
    completedRef.current = false;
    setProgress(0);

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(percent);

      if (percent >= 100 && !completedRef.current) {
        completedRef.current = true;
        clearInterval(interval);
        onComplete?.();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]); // ✅ include onComplete

  return (
    <div className="w-full h-1 bg-white/30 rounded overflow-hidden">
      <div
        className="h-full bg-white transition-[width] duration-50"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default StatusProgress;