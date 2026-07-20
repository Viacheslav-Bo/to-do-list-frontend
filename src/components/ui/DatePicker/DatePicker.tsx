"use client";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import "react-day-picker/style.css";
import { FIELD_CLASSNAME, FIELD_LABEL_CLASSNAME } from "@/constants/inputs";

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export default function DatePicker({ value, onChange, label }: Props) {
  const selected = value ? new Date(value) : undefined;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className={FIELD_LABEL_CLASSNAME}>{label}</span>}{" "}
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={`${FIELD_CLASSNAME} flex items-center justify-between text-left`}
          >
            {selected ? format(selected, "dd.MM.yyyy") : "Select date"}
            <Calendar size={16} className="text-[var(--color-text-muted)]" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={4}
            className="z-[200] rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-solid)] p-3 text-xs text-[var(--color-text-primary)] shadow-2xl [&_[data-selected=true]]:!text-[11px] [&_[aria-selected=true]]:!text-[11px]"
          >
            <DayPicker
              mode="single"
              selected={selected}
              defaultMonth={selected ?? new Date()}
              onSelect={(date) => {
                onChange(date ? format(date, "yyyy-MM-dd") : "");
                setIsOpen(false);
              }}
              style={
                {
                  "--rdp-day-width": "28px",
                  "--rdp-day-height": "28px",
                  "--rdp-day_button-width": "26px",
                  "--rdp-day_button-height": "26px",
                  "--rdp-nav-height": "1.75rem",
                  "--rdp-months-gap": "0",
                  "--rdp-accent-color": "#3b82f6",
                  "--rdp-accent-background-color": "rgba(59, 130, 246, 0.15)",
                  "--rdp-today-color": "#3b82f6",
                } as React.CSSProperties
              }
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
