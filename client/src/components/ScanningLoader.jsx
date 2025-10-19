import React, { useState, useEffect } from "react";

export default function ScanningLoader() {
  const [progress, setProgress] = useState(0);

  // Fake progress for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-white-950 dark:via-white-900 dark:to-white-800">
      <div
        className="flex flex-col items-center justify-center p-6 bg-white/80 dark:bg-white-900/70 rounded-2xl shadow-lg w-96 h-64 mb-22"
        role="status"
        aria-live="polite"
      >
        {/* Scanner frame */}
        <div className="relative flex items-center justify-center w-80 h-56">
          <div className="relative bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center w-24 h-28">
            {/* Floating file icons */}
            <div className="absolute -left-8 top-2 animate-fileFloat">
              <FileIcon small />
            </div>
            <div className="absolute -right-8 bottom-2 animate-fileFloat" style={{ animationDelay: "0.35s" }}>
              <FileIcon small color="amber" />
            </div>
            <div className="absolute -bottom-10 left-8 animate-fileFloat" style={{ animationDelay: "0.6s" }}>
              <FileIcon small color="emerald" />
            </div>

            {/* Document lines */}
            <div className="relative w-11/12 h-4/5 flex flex-col justify-center gap-1">
              <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-600 w-full" />
              <div className="h-1 rounded-full bg-slate-200/90 dark:bg-slate-600/90 w-5/6" />
              <div className="h-1 rounded-full bg-slate-200/80 dark:bg-slate-600/80 w-3/4" />
              <div className="h-1 rounded-full bg-slate-200/70 dark:bg-slate-600/70 w-2/3" />
            </div>

            {/* Scanning beam */}
            <div className="absolute left-0 top-0 h-full w-full pointer-events-none overflow-hidden">
              <div className="absolute -left-1/2 top-0 h-full w-1/2 transform rotate-6 blur-[6px] opacity-60 animate-scanGradient"></div>
            </div>
          </div>
        </div>

        {/* Text + progress */}
        <div className="mt-4 text-center text-base">
          <div className="font-medium text-slate-700 dark:text-slate-200">
            Scanning your files...
          </div>
          <div className="mt-3 w-full">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 dark:from-indigo-400"
                style={{
                  width: `${Math.max(0, Math.min(100, progress))}%`,
                  transition: "width 400ms ease",
                }}
              />
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-300">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes scanGradient {
            0% { transform: translateX(-120%) rotate(6deg); opacity: 0 }
            10% { opacity: .35 }
            50% { transform: translateX(120%) rotate(6deg); opacity: .55 }
            90% { opacity: .3 }
            100% { transform: translateX(240%) rotate(6deg); opacity: 0 }
          }

          .animate-scanGradient {
            background: linear-gradient(90deg, rgba(99,102,241,0) 0%, rgba(99,102,241,0.25) 30%, rgba(56,189,248,0.35) 60%, rgba(16,185,129,0.2) 100%);
            animation: scanGradient 2.2s linear infinite;
          }

          @keyframes fileFloat {
            0% { transform: translateY(0) translateX(0) rotate(-4deg); opacity: 0 }
            8% { opacity: 1 }
            40% { transform: translateY(-18px) translateX(10px) rotate(0deg); opacity: 1 }
            80% { transform: translateY(-6px) translateX(-6px) rotate(6deg); opacity: .8 }
            100% { transform: translateY(0) translateX(0) rotate(-4deg); opacity: 0 }
          }
          .animate-fileFloat { animation: fileFloat 3.6s cubic-bezier(.2,.9,.3,1) infinite; }

          @media (prefers-color-scheme: dark) {
            .animate-scanGradient { filter: brightness(.95); }
          }
        `}</style>
      </div>
    </div>
  );
}

// File icon subcomponent
function FileIcon({ small = false, color = "slate" }) {
  const sizeClass = small ? "w-10 h-12" : "w-14 h-18";
  const colorMap = {
    slate:
      "bg-white/95 border border-slate-200 dark:bg-slate-800 dark:border-slate-600",
    amber: "bg-amber-50 border border-amber-200",
    emerald: "bg-emerald-50 border border-emerald-200",
  };
  const classes = `${sizeClass} rounded-md shadow-md flex flex-col p-2 justify-between ${colorMap[color] || colorMap.slate
    }`;

  return (
    <div className={classes}>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-sm bg-slate-400/80" />
        <div className="w-8 h-2 rounded-sm bg-slate-300/80" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="h-1 w-full rounded-full bg-slate-200 dark:bg-slate-600/80" />
        <div className="h-1 w-5/6 rounded-full bg-slate-200/90 dark:bg-slate-600/70" />
      </div>
    </div>
  );
}
