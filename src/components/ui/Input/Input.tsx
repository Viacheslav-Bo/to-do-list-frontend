import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, id, className = "", ...rest }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-400">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:outline-none focus:border-blue-500 text-slate-200 ${className}`}
        {...rest}
      />
    </div>
  );
}
