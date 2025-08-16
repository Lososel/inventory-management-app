import { Button } from "react-bootstrap";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const icon = isDark ? "bi-sun" : "bi-moon";

  return (
    <Button
      variant="outline-contrast"
      className={className}
      onClick={toggleTheme}
    >
      <i className={`bi ${icon}`} aria-hidden="true" />
    </Button>
  );
}
