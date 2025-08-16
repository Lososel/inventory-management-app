import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar bg="" className="mb-3">
      <Container>
        <Navbar.Brand href="#">Inventory App</Navbar.Brand>

        <Nav className="me-auto"></Nav>
        <Nav>
          <ThemeToggle className="me-2" />
          {user && <Navbar.Text className="me-3">{user.name}</Navbar.Text>}
          {user ? (
            <Button variant="outline-contrast" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button variant="outline-contrast" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
