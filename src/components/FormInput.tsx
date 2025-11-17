"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  placeholder?: string;
}

export function FormInput({
  label,
  type = "text",
  register,
  error,
  required = true,
  placeholder,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-zinc-500">
        {label}{required && <span className="text-zinc-500 text-sm">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          border p-2 rounded w-full
          bg-white text-black
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
        {...register}
      />

      {error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
}
