import { classNames } from "shared/lib";
import cls from "./Sidebar.module.scss";
import { useState } from "react";
import { ThemeSwitcher } from "features/ThemeSwitcher";

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
      </div>
      <button onClick={onToggle}>toggle</button>
    </div>
  );
};
