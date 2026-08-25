import { ImageResponse } from "next/og";
import { wedding } from "@/data/wedding";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FBF7F0",
        }}
      >
        <div style={{ fontSize: 28, color: "#C9962F", letterSpacing: 6 }}>
          TOGETHER WITH THEIR FAMILIES
        </div>
        <div style={{ fontSize: 96, color: "#4A0E1F", fontStyle: "italic", marginTop: 24 }}>
          {`${wedding.couple.bride} & ${wedding.couple.groom}`}
        </div>
        <div style={{ fontSize: 32, color: "#2B1B1F", marginTop: 24 }}>
          {wedding.saveTheDate.dateRange}
        </div>
      </div>
    ),
    { ...size }
  );
}
