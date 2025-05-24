import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      id="theme-toggle"
      checked={theme === "dark"}
      onCheckedChange={() => {
        console.log("theme", theme);
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    />
  );
};

export default ThemeToggle;
