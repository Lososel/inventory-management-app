import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { t } = useTranslation();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar bg="" className="mb-3">
      <Container>
        <Navbar.Brand href="#">Inventory App</Navbar.Brand>

        <Nav className="me-auto"></Nav>
        <Nav>
          <LanguageToggle className="me-2" />
          <ThemeToggle className="me-2" />
          {user && <Navbar.Text className="me-3">{user.name}</Navbar.Text>}
          {user ? (
            <Button variant="outline-contrast" onClick={logout}>
              {t("nav.logout")}
            </Button>
          ) : (
            <Button variant="outline-contrast" onClick={handleLogin}>
              {t("nav.login")}
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
