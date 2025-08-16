import { Button } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;

interface OAuthButtonsProps {
  className?: string;
  google?: boolean;
  github?: boolean;
  next?: string;
}

export default function OAuthButtons({
  className = "",
  google = true,
  github = true,
  next,
}: OAuthButtonsProps) {
  const withNext = (url: string) =>
    next ? `${url}?next=${encodeURIComponent(next)}` : url;

  return (
    <div className={`d-grid gap-2 ${className}`}>
      {google && (
        <Button
          as="a"
          variant="outline-contrast"
          href={withNext(`${API_URL}/auth/google`)}
          className="w-100"
        >
          <i className="bi bi-google me-2" aria-hidden="true" />
          Continue with Google
        </Button>
      )}

      {github && (
        <Button
          as="a"
          variant="outline-contrast"
          href={withNext(`${API_URL}/auth/github`)}
          className="w-100"
        >
          <i className="bi bi-github me-2" aria-hidden="true" />
          Continue with GitHub
        </Button>
      )}
    </div>
  );
}
