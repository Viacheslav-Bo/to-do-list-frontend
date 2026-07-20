"use client";

import { useState } from "react";
import type React from "react";
import { Eye, EyeOff } from "lucide-react";
import { FIELD_CLASSNAME, FIELD_LABEL_CLASSNAME } from "@/constants/inputs";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({
  label,
  id,
  className = "",
  type,
  ...rest
}: Props) {
  const [isRevealed, setIsRevealed] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className={FIELD_LABEL_CLASSNAME}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={isPassword && isRevealed ? "text" : type}
          className={`${FIELD_CLASSNAME} ${isPassword ? "pr-10" : ""} ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsRevealed((prev) => !prev)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            aria-label={isRevealed ? "Hide password" : "Show password"}
          >
            {isRevealed ?
              <EyeOff size={16} />
            : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
