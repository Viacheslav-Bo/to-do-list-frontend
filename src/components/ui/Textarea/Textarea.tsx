import React from "react";
import { FIELD_CLASSNAME, FIELD_LABEL_CLASSNAME } from "@/constants/inputs";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export default function Textarea({
  label,
  id,
  className = "",
  ...rest
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className={FIELD_LABEL_CLASSNAME}>
          {label}
        </label>
      )}

      <textarea
        id={id}
        className={`${FIELD_CLASSNAME} resize-none ${className}`}
        {...rest}
      />
    </div>
  );
}
