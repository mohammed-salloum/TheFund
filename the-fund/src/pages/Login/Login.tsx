import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

type ViewType = "login" | "register" | "reset";

interface FormValues {
  username?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export default function Login() {
  const { t, i18n } = useTranslation();
  const { lang, "*": subPath } = useParams();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

const validViews: Record<string, ViewType> = {
  login: "login",
  register: "register",
  "reset-password": "reset",
};

const getViewFromPath = (path?: string): ViewType => {
  // إذا المسار معروف، نرجع الـ view الصحيح
  return validViews[path || "login"] || "login";
};

  const [view, setView] = useState<ViewType>(getViewFromPath(subPath));
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formMessage, setFormMessage] = useState({
    key: "",
    type: "",
    values: {} as Record<string, any>,
  });

  // Validation schema
  const schema = useMemo(() => {
    const loginSchema = yup.object().shape({
      email: yup
        .string()
        .trim()
        .email(t("LogIn.login.messages.invalidEmail"))
        .required(t("LogIn.login.messages.emailRequired")),
      password: yup
        .string()
        .required(t("LogIn.login.messages.passwordRequired")),
    });

    const registerSchema = yup.object().shape({
      username: yup
        .string()
        .trim()
        .required(t("LogIn.register.messages.nameRequired"))
        .max(50, t("LogIn.register.messages.max50Chars")),
      email: yup
        .string()
        .trim()
        .email(t("LogIn.register.messages.invalidEmail"))
        .required(t("LogIn.register.messages.emailRequired")),
      password: yup
        .string()
        .required(t("LogIn.register.messages.passwordRequired"))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
          t("LogIn.register.messages.passwordWeak")
        ),
      confirmPassword: yup
        .string()
        .required(t("LogIn.register.messages.confirmPasswordRequired"))
        .oneOf(
          [yup.ref("password")],
          t("LogIn.register.messages.passwordsNotMatch")
        ),
    });

    const resetSchema = yup.object().shape({
      email: yup
        .string()
        .trim()
        .email(t("LogIn.reset.messages.emailRequired"))
        .required(t("LogIn.reset.messages.emailRequired")),
    });

    if (view === "login") return loginSchema;
    if (view === "register") return registerSchema;
    return resetSchema;
  }, [view, i18n.language]);

const {
  register: formRegister,
  handleSubmit,
  formState: { errors },
  reset,
  clearErrors,
  watch,
  trigger, // ← أضف هذا
} = useForm<FormValues>({
  resolver: yupResolver(schema),
  mode: "onBlur",
  defaultValues: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
});


useEffect(() => {
  // تحديث رسائل الأخطاء عند تبديل اللغة
  const fieldsWithError = Object.keys(errors) as (keyof FormValues)[];
  if (fieldsWithError.length) {
    trigger(fieldsWithError); // ← يعيد التحقق من الحقول التي بها أخطاء
  }
}, [i18n.language, errors, trigger]);

  // Clear errors on field change
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name) {
        clearErrors(name);
        setFormMessage({ key: "", type: "", values: {} });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, clearErrors]);

  const onSubmit = async () => {
    setLoading(true);
    setFormMessage({ key: "", type: "", values: {} });

    setTimeout(() => {
      if (view === "register") {
        setFormMessage({
          key: "LogIn.register.messages.registerSuccess",
          type: "success",
          values: {},
        });
      }

      if (view === "reset") {
        setFormMessage({
          key: "LogIn.reset.messages.resetSent",
          type: "success",
          values: {},
        });
      }

      setLoading(false);
    }, 800);
  };

  const changeView = (newView: ViewType) => {
    setView(newView);
    setFormMessage({ key: "", type: "", values: {} });

    const path = newView === "reset" ? "reset-password" : newView;
    navigate(`/${lang}/${path}`);
    reset();
  };

useEffect(() => {
  let path = subPath;

  // إذا subPath غير موجود، نحصل على آخر جزء من URL
  if (!path) {
    const segments = window.location.pathname.split("/").filter(Boolean);
    path = segments[1] || "login"; // segments[0] = lang، segments[1] = view
  }

  const viewFromPath = getViewFromPath(path);
  setView(viewFromPath);
}, [subPath]);


  return (
    <div className="auth-page" dir={isRTL ? "rtl" : "ltr"}>
      <div className="auth-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* LOGIN */}
          {view === "login" && (
            <>
              <label>{t("LogIn.login.email")}</label>
              <input
                type="email"
                {...formRegister("email")}
                placeholder={t("LogIn.login.email")}
              />
              {errors.email && (
                <p className="auth-message error">{errors.email.message}</p>
              )}

              <label>{t("LogIn.login.password")}</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  {...formRegister("password")}
                  placeholder={t("LogIn.login.password")}
                />
                <span
                  className="toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="auth-message error">{errors.password.message}</p>
              )}
            </>
          )}

          {/* REGISTER */}
          {view === "register" && (
            <>
              <label>{t("LogIn.register.username")}</label>
              <input
                type="text"
                {...formRegister("username")}
                placeholder={t("LogIn.register.username")}
              />
              {errors.username && (
                <p className="auth-message error">{errors.username.message}</p>
              )}

              <label>{t("LogIn.register.email")}</label>
              <input
                type="email"
                {...formRegister("email")}
                placeholder={t("LogIn.register.email")}
              />
              {errors.email && (
                <p className="auth-message error">{errors.email.message}</p>
              )}

              <label>{t("LogIn.register.password")}</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  {...formRegister("password")}
                  placeholder={t("LogIn.register.password")}
                />
                <span
                  className="toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="auth-message error">{errors.password.message}</p>
              )}

              <label>{t("LogIn.register.confirmPassword")}</label>
              <input
                type="password"
                {...formRegister("confirmPassword")}
                placeholder={t("LogIn.register.confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="auth-message error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </>
          )}

          {/* RESET */}
          {view === "reset" && (
            <>
              <label>{t("LogIn.reset.yourEmail")}</label>
              <input
                type="email"
                {...formRegister("email")}
                placeholder={t("LogIn.reset.email")}
              />
              {errors.email && (
                <p className="auth-message error">{errors.email.message}</p>
              )}
            </>
          )}

          {/* SUBMIT BUTTON */}
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading
              ? t("LogIn.loading")
              : view === "login"
              ? t("LogIn.login.loginBtn")
              : view === "register"
              ? t("LogIn.register.registerBtn")
              : t("LogIn.reset.resetBtn")}
          </button>

          {/* FORM MESSAGE */}
          {formMessage.key && (
            <div className={`form-message ${formMessage.type}`}>
              {String(t(formMessage.key, formMessage.values))}
            </div>
          )}
        </form>

        {/* LINKS */}
        {view === "login" && (
          <>
            <p className="link-text single-link">
              <span className="reset-link" onClick={() => changeView("reset")}>
                {t("LogIn.login.resetPassword")}
              </span>
            </p>

            <p className="link-text inline-link">
              <span>{t("LogIn.login.noAccount")}</span>
              <span className="space"></span>
              <span
                className="toggle-link"
                onClick={() => changeView("register")}
              >
                {t("LogIn.login.createAccount")}
              </span>
            </p>
          </>
        )}

        {view === "register" && (
          <p className="link-text single-link">
            <span className="toggle-link" onClick={() => changeView("login")}>
              {t("LogIn.register.backToLogin")}
            </span>
          </p>
        )}

        {view === "reset" && (
          <p className="link-text single-link">
            <span className="toggle-link" onClick={() => changeView("login")}>
              {t("LogIn.reset.backToLogin")}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
