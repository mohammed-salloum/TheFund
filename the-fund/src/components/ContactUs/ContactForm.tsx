// ContactForm.tsx (Fixed, Zero TypeScript Errors)
import { useContext, useState, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";
import Button from "../UI/Button/Button";
import FormField from "../Common/FormField/FormField";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "./ContactForm.css";

interface FormValues {
  name: string;
  phone?: string | null;
  email: string;
  company?: string | null;
  subject: string;
  question: string;
}

function ContactForm() {
  const { theme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [formMessageType, setFormMessageType] = useState<"" | "error" | "success">("");
  const [formMessageVisible, setFormMessageVisible] = useState(false);

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup
          .string()
          .trim()
          .required(t("contact.form.nameRequired"))
          .test("no-double-spaces", t("contact.form.nameDoubleSpaces"), (v) => !/\s{2,}/.test(v || ""))
          .test("valid-fullname", t("contact.form.nameInvalid"), (v) => {
            if (!v) return false;
            const words = v.split(" ").filter(Boolean);
            return (
              words.length >= 2 &&
              words.length <= 4 &&
              words.every((word) => /^[\u0621-\u064A A-Za-z]{3,}$/.test(word))
            );
          })
          .max(50, t("contact.form.max50Chars")),

        phone: yup
          .string()
          .nullable()
          .transform((v) => (v?.trim() === "" ? null : v))
          .test("phone-valid", function (value) {
            if (!value) return true;

            const cleaned = value.replace(/\s+/g, "").replace(/^0+/, "");

            try {
              const phoneNumber = parsePhoneNumberFromString(cleaned.startsWith("+") ? cleaned : `+${cleaned}`);

              if (!phoneNumber || !phoneNumber.isValid()) {
                return this.createError({ message: t("contact.form.phoneInvalid") });
              }

              if (phoneNumber.country === "SY") {
                const national = phoneNumber.nationalNumber;
                const validStarts = ["3", "4", "5", "6", "8", "9"];

                if (!national || national.length < 2) {
                  return this.createError({ message: t("contact.form.phonePrefixError") });
                }

                if (national[0] !== "9" || !validStarts.includes(national[1])) {
                  return this.createError({ message: t("contact.form.phonePrefixError") });
                }
              }

              return true;
            } catch {
              return this.createError({ message: t("contact.form.phoneInvalid") });
            }
          }),

        email: yup.string().trim().email(t("contact.form.invalidEmail")).required(t("contact.form.emailRequired")),

        company: yup
          .string()
          .nullable()
          .transform((v) => (v?.trim() === "" ? null : v))
          .test("company-valid", function (val) {
            if (!val) return true;

            if (/^\s|\s$/.test(val) || /\s{2,}/.test(val)) {
              return this.createError({ message: t("contact.form.companyDoubleSpaces") });
            }

            const noSpaces = val.replace(/\s/g, "");

            if (!/[\p{L}]/u.test(noSpaces)) {
              return this.createError({ message: t("contact.form.companyInvalid") });
            }
            if (noSpaces.length < 3) {
              return this.createError({ message: t("contact.form.companyMin3Chars") });
            }
            if (noSpaces.length > 50) {
              return this.createError({ message: t("contact.form.companyMax50Chars") });
            }

            return true;
          }),

        subject: yup.string().trim().required(t("contact.form.subjectRequired")).max(100, t("contact.form.subjectMax100Chars")),

        question: yup.string().trim().required(t("contact.form.questionRequired")).max(500, t("contact.form.questionMax500Chars")),
      }),
    [t, i18n.language]
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, touchedFields },
    reset,
    trigger,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: null,
      email: "",
      company: null,
      subject: "",
      question: "",
    },
  });

  useEffect(() => {
    trigger();
  }, [i18n.language, trigger]);

  const watched = watch();

  useEffect(() => {
    if (!Object.keys(errors).length && formMessageType === "error") {
      setFormMessageVisible(false);
      setFormMessageType("");
    }
  }, [watched, errors, formMessageType]);

  const onSubmit: SubmitHandler<FormValues> = async (_data) => {
    try {
      await new Promise((res) => setTimeout(res, 1000));
      reset();
      setFormMessageType("success");
      setFormMessageVisible(true);
      setTimeout(() => setFormMessageVisible(false), 4000);
    } catch {
      setFormMessageType("error");
      setFormMessageVisible(true);
      setTimeout(() => setFormMessageVisible(false), 4000);
    }
  };

  const onError = (_errors: FieldErrors<FormValues>) => {
    setFormMessageType("error");
    setFormMessageVisible(true);
  };

  return (
    <div className={`contact-form ${theme} ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <p className="contact-form-subtitle">{t("contact.subtitle1")}</p>
      <p className="contact-form-subtitle">{t("contact.subtitle2")}</p>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormField
          label={t("contact.form.nameLabel")}
          placeholder={t("contact.form.namePlaceholder")}
          register={register}
          name="name"
          error={errors.name}
          required
          isRTL={isRTL}
          touched={!!touchedFields.name}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <FormField
              name="phone"
              type="phone"
              value={field.value ?? ""}
              onChange={(v) => field.onChange(v || null)}
              onBlur={field.onBlur}
              error={errors.phone}
              touched={!!touchedFields.phone}
              label={t("contact.form.phoneLabel")}
              placeholder={t("contact.form.phonePlaceholder")}
              isRTL={isRTL}
            />
          )}
        />

        <FormField
          label={t("contact.form.emailLabel")}
          placeholder={t("contact.form.emailPlaceholder")}
          register={register}
          name="email"
          type="email"
          error={errors.email}
          required
          isRTL={isRTL}
          touched={!!touchedFields.email}
        />

        <FormField
          label={t("contact.form.companyLabel")}
          placeholder={t("contact.form.companyPlaceholder")}
          register={register}
          name="company"
          error={errors.company}
          isRTL={isRTL}
          touched={!!touchedFields.company}
        />

        <FormField
          label={t("contact.form.subjectLabel")}
          placeholder={t("contact.form.subjectPlaceholder")}
          register={register}
          name="subject"
          error={errors.subject}
          required
          isRTL={isRTL}
          touched={!!touchedFields.subject}
        />

        <FormField
          label={t("contact.form.questionLabel")}
          placeholder={t("contact.form.questionPlaceholder")}
          register={register}
          name="question"
          rows={6}
          error={errors.question}
          required
          isRTL={isRTL}
          touched={!!touchedFields.question}
        />

        <div className="form-field-wrapper submit-wrapper">
          <label></label>
          <div className="field-wrapper">
            <Button type="submit" disabled={isSubmitting} className="btn-inline">
              {isSubmitting ? (
                <span className="sending-text">
                  {t("contact.form.sending")}
                  <span className="dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </span>
              ) : (
                t("contact.form.submitButton")
              )}
            </Button>
          </div>
        </div>

        <div className={`form-message-below ${formMessageVisible ? "fade-in" : "fade-out"}`}>
          {formMessageType === "error" && <span className="form-error">{t("contact.form.errorMessage")}</span>}
          {formMessageType === "success" && <span className="form-success">{t("contact.form.successMessage")}</span>}
        </div>
      </form>
    </div>
  );
}

export default ContactForm;