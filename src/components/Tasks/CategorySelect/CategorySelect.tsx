"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { TASK_CATEGORIES } from "@/constants/categories";
import { FIELD_CLASSNAME } from "@/constants/inputs";

type Props = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
};

export default function CategorySelect({ value, onChange, id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${FIELD_CLASSNAME} flex items-center justify-between text-left`}
      >
        {value}
        <ChevronDown
          size={16}
          className={`text-[var(--color-text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-[200] mt-1 w-full overflow-hidden rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-solid)] p-2 shadow-2xl">
          <ul className="flex flex-col gap-1">
            {TASK_CATEGORIES.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(category);
                    setIsOpen(false);
                  }}
                  className="relative flex w-full cursor-pointer select-none items-center rounded-lg px-3 py-2 pl-8 text-left text-[clamp(0.8rem,2.2vw,0.9rem)] text-[var(--color-text-primary)] outline-none hover:bg-[var(--color-surface)]"
                >
                  {category === value && (
                    <Check
                      size={14}
                      className="absolute left-2 text-blue-400"
                    />
                  )}
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
