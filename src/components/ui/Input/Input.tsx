import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, id, className = "", ...rest }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-[clamp(0.8rem,2.2vw,0.875rem)] font-medium text-slate-400"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded border border-slate-800 bg-slate-950 px-3 py-2 text-[clamp(0.8rem,2.2vw,0.9rem)] text-slate-200 focus:border-blue-500 focus:outline-none ${className}`}
        {...rest}
      />
    </div>
  );
}
