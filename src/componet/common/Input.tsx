import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export default function Input({
  type = "text",
  placeholder,
  error,
  register,
}: InputProps) {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
        {...register}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
