/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  FocusEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { ErrorMessage } from "formik";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { getHeight, Size } from "../../../utils";
import ATMFieldLabel from "../ATMFieldLabel/ATMFieldLabel";
import ATMFieldError from "../ATMFieldError/ATMFieldError";

interface PasswordProps {
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

const ATMPasswordField: React.FC<PasswordProps> = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  className,
  disabled,
  onBlur,
  isFocused = false,
  helperText = "",
  isValid = true,
  size = "small",
}) => {
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState(false);
  const togle = () => {
    setShow(!show);
  };

  useEffect(() => {
    setFocused(isFocused);
    if (isFocused) {
      inputRef?.current?.focus();
    }

    return () => {
      setFocused(false);
    };
  }, [isFocused]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false);
    onBlur?.(e);
    inputRef?.current?.blur();
  };

  return (
    <div className="relative">
      <ATMFieldLabel htmlFor={name}>{label}</ATMFieldLabel>

      <div
        onClick={() => {
          inputRef?.current?.focus();
          if (!disabled) {
            setFocused(true);
          }
        }}
        className={`relative rounded flex bg-white ${
          disabled && "opacity-60"
        } border  ${
          focused && !disabled ? "border-primary-light" : "border-gray-300"
        }`}
      >
        <input
          id={name}
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`rounded-md w-full bg-inherit focus:outline-none px-2 py-1 ${className} placeholder:text-sm text-sm ${getHeight(
            size
          )} `}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          ref={inputRef}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
          {show ? (
            <button type="button" onClick={togle}>
              <IconEyeOff className="w-5 h-5" />{" "}
            </button>
          ) : (
            <button type="button" onClick={togle}>
              {" "}
              <IconEye className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {helperText && isValid && (
        <p className="absolute text-sm text-slate-500"> {helperText} </p>
      )}
      <ErrorMessage name={name}>
        {(errorMessage) => <ATMFieldError> {errorMessage} </ATMFieldError>}
      </ErrorMessage>
    </div>
  );
};

export default ATMPasswordField;
