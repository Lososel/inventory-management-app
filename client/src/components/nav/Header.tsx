import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="#">Inventory App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {user && <Navbar.Text className="me-3">{user.name}</Navbar.Text>}
            {user ? (
              <Button variant="outline-dark" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline-dark" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
