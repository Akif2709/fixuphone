"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export type CalendarProps = {
  selected?: Date;
  setSelected?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
};

function Calendar({ selected, setSelected, disabled, className }: CalendarProps) {
  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      disabled={disabled}
      className={className}
      footer={selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
