"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  options: Option[];
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export function FormSelect({ label, options, register, error }: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-zinc-500">
        {label} <span className="text-zinc-500 text-sm">*</span>
      </label>

      <select
        {...register}
        className="
          border p-2 rounded w-full
          bg-white text-black
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
        defaultValue=""
      >
        <option value="" disabled>
          Selecione...
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
}
