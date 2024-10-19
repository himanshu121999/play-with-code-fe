/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from "formik";
import React, { ChangeEvent, FocusEventHandler, useRef } from "react";
import { getHeight, Size } from "../../../utils";
import ATMFieldError from "../ATMFieldError/ATMFieldError";
import ATMFieldLabel from "../ATMFieldLabel/ATMFieldLabel";

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;

  placeholder?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onBlur?: (e: any) => void;
  isFocused?: boolean;
  isValid?: boolean;
  isTouched?: boolean;
  errorMessage?: string;
  disableErrorMessage?: boolean;
  helperText?: string;
  size?: Size;
}

const ATMTextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  onChange,

  placeholder,
  className,
  disabled,
  onBlur,
  helperText = "",
  isValid = true,
  size = "small",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    onBlur?.(e);
    inputRef?.current?.blur();
  };

  return (
    <div className="relative">
      <ATMFieldLabel htmlFor={name}>{label}</ATMFieldLabel>
      <input
        id={name}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`rounded-md w-full bg-inherit focus:outline-none px-2 py-1 ${className} placeholder:text-xs text-xs border border-neutral-80 ${getHeight(
          size
        )}`}
        disabled={disabled}
        onBlur={handleBlur}
        ref={inputRef}
      />

      {helperText && isValid && (
        <p className="absolute text-xs text-slate-500"> {helperText} </p>
      )}

      <ErrorMessage name={name}>
        {(errorMessage) => <ATMFieldError> {errorMessage} </ATMFieldError>}
      </ErrorMessage>
    </div>
  );
};

export default ATMTextField;
