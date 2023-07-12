import { classNames } from "shared/lib";
import cls from "./Sidebar.module.scss";
import { useState } from "react";
import { ThemeSwitcher } from "features/ThemeSwitcher";
import { LanguageSwitcher } from "features/LanguageSwitcher";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const onToggle = () => setIsSidebarCollapsed((value) => !value);

  return (
    <div
      className={classNames(
        cls.sidebar,
        { [cls.collapsed]: isSidebarCollapsed },
        [className]
      )}
    >
      <div className={cls.switchers}>
        <ThemeSwitcher className={classNames(cls.themeSwitcher)} />
        <LanguageSwitcher className={classNames(cls.languageSwitcher)} />
      </div>
      <button onClick={onToggle}>toggle</button>
    </div>
  );
};
