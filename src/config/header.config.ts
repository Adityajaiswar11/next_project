export interface HeaderLink {
  label: string;
  href: string;
  show?: boolean;
}

export interface HeaderConfig {
  showHamburger?: boolean;
  showGetStarted?: boolean;
  showAuthButton?: boolean;
  links: HeaderLink[];
}

export const headerConfig: HeaderConfig = {
  showHamburger: true,
  showGetStarted: true,
  showAuthButton: true,
  links: [
    { label: "Home", href: "/", show: true },
    { label: "Dashboard", href: "/dashboard", show: true },
    { label: "Profile", href: "/profile", show: true },
    { label: "Contact", href: "/contact", show: true },
  ],
};
