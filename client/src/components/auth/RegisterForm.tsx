import { Container, Row, Col, Card, Button } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;

export default function RegisterForm() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-center mb-3">Register</Card.Title>

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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
