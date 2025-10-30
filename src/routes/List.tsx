import { Link } from "react-router";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

const items = [
  { id: "1", name: "First item" },
  { id: "2", name: "Second item" },
  { id: "3", name: "Third item" },
  { id: "4", name: "Fourth item" },
  { id: "5", name: "Fifth item" },
];

export default function List() {
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
  };

  const listStyles: React.CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  function openDetail(id: string) {
    const a = new WebviewWindow(`detail-window-${id}`, {
        url: `detail/${id}`,
        // @ts-expect-error new API package not released yet :P
        activityName: "DetailActivity"
    })
    a.once('tauri://created', function () {
      console.log('done')
    });
    a.once('tauri://error', function (e) {
        console.error(e)
    });
  }

  return (
    <div style={viewportStyles}>
      <div style={paperStyles}>
        <ul style={listStyles}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={item.id}
                style={{
                  borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div
                  onClick={() => openDetail(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "14px 16px",
                    color: "inherit",
                    textDecoration: "none",
                    transition: "background 120ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(0,0,0,0.035)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      aria-hidden
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background:
                          "linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      {item.name[0]}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "self-start" }}>
                      <span style={{ fontSize: 16, fontWeight: 600, color: "#777" }}>{item.name}</span>
                      <span style={{ fontSize: 12, color: "#666" }}>ID {item.id}</span>
                    </div>
                  </div>
                  <span aria-hidden style={{ color: "#9e9e9e", fontSize: 20 }}>
                    ›
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}


