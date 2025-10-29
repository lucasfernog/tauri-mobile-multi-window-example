import { useParams } from "react-router";

export default function Detail() {
  const { id } = useParams();

  const viewportStyles: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    background: "var(--app-bg, #f6f6f6)",
  };

  const paperStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: 0,
    overflow: "auto",
    background: "#fff",
    boxShadow: "none",
    padding: 16,
  };

  const metaStyles: React.CSSProperties = {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  };

  return (
    <div style={viewportStyles}>
      <div style={paperStyles}>
        <div style={metaStyles}>Selected ID: {id}</div>
      </div>
    </div>
  );
}


