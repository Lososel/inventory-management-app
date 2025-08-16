import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import OAuthButtons from "./OAuthButtons";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const { t } = useTranslation();
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="auth-card shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-center mb-3">
                {t("auth.login.title")}
              </Card.Title>

              <OAuthButtons className="mb-2" next="/dashboard" />

              <Card.Text className="text-center mt-3">
                <Link to="/register" className="link-secondary small">
                  {t("auth.login.registerLink")}
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
