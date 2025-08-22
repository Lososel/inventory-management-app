import { useEffect, useMemo, useState } from "react";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { listPublicInventories } from "../../../services/inventories.service";
import type { Inventory } from "../../../types/interfaces";
import InventoryCard from "../card/InventoryCard";
import TagCloud from "../tag/TagCloud";

export default function InventoryMain({
  onOpen,
}: {
  onOpen: (id: string) => void;
}) {
  const [items, setItems] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tag, setTag] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const res = await listPublicInventories({
          page,
          pageSize,
          query: searchTerm || undefined,
          tag,
        });
        if (alive) {
          setItems(res.items);
          setTotalPages(res.totalPages);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [page, pageSize, searchTerm, tag]);

  const allTags = useMemo(() => {
    const freq: Record<string, number> = {};
    items.forEach((i) => i.tags.forEach((t) => (freq[t] = (freq[t] || 0) + 1)));
    return Object.entries(freq).map(([name, count]) => ({ name, count }));
  }, [items]);

  const resetAndSearch = () => setPage(1);

  return (
    <>
      <div className="d-flex align-items-center gap-2 mb-3">
        <InputGroup style={{ maxWidth: 420 }}>
          <Form.Control
            placeholder="Search inventories…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && resetAndSearch()}
          />
          <Button variant="outline-contrast" onClick={resetAndSearch}>
            Search
          </Button>
        </InputGroup>

        {tag && (
          <Button
            variant="outline-contrast"
            onClick={() => {
              setTag(undefined);
              setPage(1);
            }}
          >
            Clear tag: {tag}
          </Button>
        )}
      </div>

      <TagCloud
        tags={allTags}
        onSelect={(t) => {
          setTag(t);
          setPage(1);
        }}
      />

      <Row xs={1} sm={2} md={3} lg={3} className="g-3 mt-1">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Col key={i}>
                <div
                  className="placeholder-wave rounded"
                  style={{ height: 160, background: "var(--bs-border-color)" }}
                />
              </Col>
            ))
          : items.map((inventory) => (
              <Col key={inventory.id}>
                <InventoryCard inventory={inventory} onOpen={onOpen} />
              </Col>
            ))}
      </Row>

      <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
        <Button
          variant="outline-contrast"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </Button>
        <span className="small">
          Page {page} / {totalPages}
        </span>
        <Button
          variant="outline-contrast"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </Button>
      </div>
    </>
  );
}
