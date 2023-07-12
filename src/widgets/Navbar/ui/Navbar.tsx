import { classNames } from "shared/lib";
import cls from "./Navbar.module.scss";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <nav className={classNames(cls.navbar, {}, [className])}>
      <ThemeSwitcher />
      <div className={classNames(cls.links)}>
        <AppLink to={routeConfig.main.path} theme={AppLinkTheme.INVERTED}>
          Главная
        </AppLink>
        <AppLink to={routeConfig.about.path} theme={AppLinkTheme.INVERTED}>
          About
        </AppLink>
      </div>
    </nav>
  );
};
