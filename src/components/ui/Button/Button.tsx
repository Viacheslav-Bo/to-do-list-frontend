"use client";
import React, { useState } from "react";

const Privat = () => {
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  return (
    <>
      <button
        onClick={() => setIsPrivate(!isPrivate)}
        className={`cursor-pointer flex cp items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
          isPrivate ?
            "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
        }`}
      >
        {isPrivate ?
          <span>👁️‍🗨️ Privacy On</span>
        : <span>👁️ Privacy Off</span>}
      </button>
    </>
  );
};
export default Privat;
