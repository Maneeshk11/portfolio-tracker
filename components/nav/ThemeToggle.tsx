import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Only run on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsDark(theme === "dark");
  }, [theme]);

  if (!mounted) {
    return <Switch id="theme-toggle" />;
  }

  return (
    <Switch
      id="theme-toggle"
      checked={isDark}
      onCheckedChange={() => {
        setTheme(isDark ? "light" : "dark");
      }}
    />
  );
};

export default ThemeToggle;
