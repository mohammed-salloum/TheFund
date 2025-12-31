import React, { useContext } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../context/ThemeContext";
import "./Button.css";

type ButtonCommonProps = {
  children: React.ReactNode;
  variant?: string;
  fullWidth?: boolean;
  unified?: boolean;
  disabled?: boolean;
  active?: boolean;
  className?: string;
};

// Button فقط
type ButtonOnlyProps = ButtonCommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    to?: undefined;
  };

// Link فقط
type LinkOnlyProps = ButtonCommonProps & {
  to: string;
  onClick?: () => void;
} & Omit<LinkProps, "children" | "to" | "onClick">;

type ButtonProps = ButtonOnlyProps | LinkOnlyProps;

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    fullWidth = false,
    unified = false,
    disabled = false,
    active = false,
    className = "",
    ...rest
  } = props;

  const { i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const lang = i18n.language;
  const isRTL = lang === "ar";

  const classes = [
    "btn",
    `btn-${variant}`,
    active && "active",
    unified && "unified",
    `theme-${theme}`,
    fullWidth && "full-width",
    disabled && "disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = disabled ? undefined : props.onClick;

  // -------------------
  //     LINK BUTTON
  // -------------------
  if ("to" in props && props.to) {
    const { to, ...linkRest } = rest as Omit<LinkOnlyProps, keyof ButtonCommonProps>;

    const localizedTo = to.startsWith(`/${lang}`)
      ? to
      : `/${lang}${to.startsWith("/") ? to : "/" + to}`;

    const linkProps: LinkProps = {
      ...(linkRest as LinkProps),
      to: disabled ? "#" : localizedTo,
      onClick: handleClick as any,
      className: classes,
    };

    return (
      <Link {...linkProps}>
        <span className={isRTL ? "rtl" : ""}>{children}</span>
      </Link>
    );
  }

  // -------------------
  //     NORMAL BUTTON
  // -------------------
  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    ...(rest as ButtonHTMLAttributes<HTMLButtonElement>),
    disabled,
    onClick: handleClick as any,
    className: classes,
  };

  return (
    <button {...buttonProps}>
      <span className={isRTL ? "rtl" : ""}>{children}</span>
    </button>
  );
}
