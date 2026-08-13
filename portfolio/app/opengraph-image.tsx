import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — Full Stack Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0b",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#10b981",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#8b8b95",
            marginTop: 20,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
          }}
        >
          {site.heroStats.slice(0, 3).map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px 24px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "#141416",
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 600 }}>{stat.value}</span>
              <span style={{ fontSize: 16, color: "#8b8b95" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
