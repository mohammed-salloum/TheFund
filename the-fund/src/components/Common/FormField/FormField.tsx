import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import type { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "./FormField.css";

// ===============================
// 📌 Props Type
// ===============================
interface FormFieldProps {
  label: string;
  name: string;                     // ← تم إضافته هنا
  placeholder?: string;
  register?: UseFormRegister<any>;
  error?: FieldError | undefined;
  successMessage?: string;
  type?: string;
  required?: boolean;
  rows?: number;

  // For Controller fields
  value?: string | null;
  onChange?: (value: string) => void;
  onBlur?: () => void;

  isRTL?: boolean;
  touched?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  register,
  name,
  error,
  successMessage,
  type = "text",
  required = false,
  rows = 1,
  value,
  onChange,
  onBlur,
  isRTL = false,
  touched = false,
}) => {
  const { t } = useTranslation();
  const isTextarea = rows > 1;

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const showError = Boolean(error && touched);

  useEffect(() => {
    if (!showError && touched && value?.toString().trim() !== "") {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    } else {
      setShowSuccess(false);
    }
  }, [value, touched, showError]);

  const inputClass = `form-input ${showError ? "error-border" : ""} ${
    showSuccess ? "success-border" : ""
  }`;

  return (
    <div className={`form-field-wrapper ${isRTL ? "rtl" : "ltr"}`}>
      <label className={required ? "required" : ""}>{label}</label>

      <div className="field-wrapper">
        {type === "phone" ? (
          <PhoneInput
            country="ae"
            value={value || ""}
            onChange={onChange || (() => {})}
            onBlur={onBlur}
            inputProps={{
              name,
              dir: isRTL ? "rtl" : "ltr",
              autoComplete: "off",
            }}
            placeholder={placeholder}
            containerClass="phone-container"
            inputClass={inputClass}
            buttonClass="flag-dropdown"
            specialLabel=""
          />
        ) : isTextarea ? (
          <textarea
            {...(register ? register(name) : {})}
            placeholder={placeholder}
            rows={rows}
            className={inputClass}
          />
        ) : (
          <input
            {...(register ? register(name) : {})}
            type={type}
            placeholder={placeholder}
            className={inputClass}
          />
        )}

        <div className="field-message">
          {showError && <div className="error">{t(error?.message || "")}</div>}
          {showSuccess && successMessage && (
            <div className="success">{t(successMessage)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormField;
