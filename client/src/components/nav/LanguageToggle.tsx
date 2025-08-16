import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("ru") ? "ru" : "en";

  const change = (lng: "en" | "ru") => {
    void i18n.changeLanguage(lng);
  };

  return (
    <Dropdown className={className}>
      <Dropdown.Toggle variant="outline-contrast" id="lang-toggle">
        <i className="bi bi-translate me-2" aria-hidden="true" />
        {current.toUpperCase()}
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">
        <Dropdown.Item active={current === "en"} onClick={() => change("en")}>
          English
        </Dropdown.Item>
        <Dropdown.Item active={current === "ru"} onClick={() => change("ru")}>
          Русский
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
