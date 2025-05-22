'use client';

import React from 'react';

interface BaseProps {
  label: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

interface TextInputProps
  extends BaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  type?: Exclude<React.HTMLInputTypeAttribute, 'textarea' | 'select'>;
  rows?: never;
  children?: never;
}

interface TextareaProps
  extends BaseProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows: number;
  type?: never;
  children?: never;
}

interface SelectProps
  extends BaseProps,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  type: 'select';
  children: React.ReactNode;
  rows?: never;
}

type InputFieldProps = TextInputProps | TextareaProps | SelectProps;

export default function InputField(props: InputFieldProps) {
  const { label, error, disabled = false, className = '', ...rest } = props;
  const base = `w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`;

  const field = React.useMemo(() => {
    if ('rows' in rest) {
      const { rows, ...ta } = rest as TextareaProps;
      return (
        <textarea
          rows={rows}
          disabled={disabled}
          className={base}
          {...ta}
        />
      );
    }
    if (rest.type === 'select') {
      const { children, ...sel } = rest as SelectProps;
      return (
        <select disabled={disabled} className={base} {...sel}>
          {children}
        </select>
      );
    }
    const { type = 'text', ...inp } = rest as TextInputProps;
    return <input type={type} disabled={disabled} className={base} {...inp} />;
  }, [rest, disabled]);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      {field}
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
