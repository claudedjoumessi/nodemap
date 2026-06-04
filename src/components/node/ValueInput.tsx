import type { Port } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";

const ValueInput = ({ inp }: { inp: Port }) => {
  const [value, setValue] = useState(`${inp.defaultValue}`);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInput = (e: React.InputEvent) => {
    if (!inputRef.current) return;
    const val = (e.target as HTMLInputElement).value;
    setValue(val === "" ? "0" : val);
  };

  const incrementValue = () => {
    setValue((prev) => String(Number(prev) + 1));
  };
  const decrementValue = () => {
    setValue((prev) => String(Math.max(Number(prev) - 1, 0)));
  };

  return (
    <div className="value-input flex w-full font-light bg-neutral-700/60 rounded-sm text-nowrap">
      <button
        type="button"
        className="bg-neutral-600/60 outline-none rounded-l-sm  opacity-0 hover:opacity-100 focus-visible:opacity-100"
        onClick={decrementValue}
      >
        <ChevronLeft size={18} opacity={0.7} />
      </button>
      <div
        className="px-1 flex items-center"
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <span>{inp.name}</span>
        <input
          id={inp.id}
          type="number"
          min={0}
          ref={inputRef}
          className="w-full text-right focus:outline-none"
          value={value}
          onInput={handleInput}
        />
      </div>
      <button
        type="button"
        className="bg-neutral-600/60 outline-none rounded-r-sm  opacity-0 hover:opacity-100 focus-visible:opacity-100"
        onClick={incrementValue}
      >
        <ChevronRight size={18} opacity={0.7} />
      </button>
    </div>
  );
};

export default ValueInput;
