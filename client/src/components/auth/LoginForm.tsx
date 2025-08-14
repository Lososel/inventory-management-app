import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onLogin) onLogin(email, password);
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-center mb-3">Log in</Card.Title>

              <Form onSubmit={handleSubmit} className="d-grid gap-2">
                <Form.Group controlId="email" className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={!onLogin}
                >
                  Login
                </Button>
              </Form>

              <div className="text-center my-3">
                <small className="text-muted">OR</small>
              </div>

              <div className="d-grid gap-2">
                <Button
                  as="a"
                  variant="outline-secondary"
                  href={`${API_URL}/auth/google`}
                  className="w-100"
                >
                  <i className="bi bi-google me-2" aria-hidden="true" />
                  Continue with Google
                </Button>

                <Button
                  as="a"
                  variant="outline-dark"
                  href={`${API_URL}/auth/github`}
                  className="w-100"
                >
                  <i className="bi bi-github me-2" aria-hidden="true" />
                  Continue with GitHub
                </Button>
              </div>

              <Card.Text className="text-center mt-3">
                <a href="#" className="link-secondary small">
                  Do not have an account? Register
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
