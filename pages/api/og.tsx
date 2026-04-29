import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

type ProjectTheme = {
  accent: string;
  bg: string;
  bg2: string;
  text: string;
  muted: string;
  label: string;
  visual: string;
  chips: string[];
};

const projectThemes: Record<string, ProjectTheme> = {
  meridian: {
    accent: "#7dd3fc",
    bg: "#06151f",
    bg2: "#0f2d3a",
    text: "#e8fbff",
    muted: "#9cc4cf",
    label: "Slack MCP orchestration",
    visual: "nodes",
    chips: ["Slack", "MCP", "Agents"],
  },
  atlas: {
    accent: "#f59e0b",
    bg: "#17120a",
    bg2: "#3a2810",
    text: "#fff7ed",
    muted: "#d6b98a",
    label: "Founder network mapping",
    visual: "network",
    chips: ["Graph", "Search", "Warm intros"],
  },
  bearing: {
    accent: "#a78bfa",
    bg: "#14111f",
    bg2: "#2b2148",
    text: "#f6f1ff",
    muted: "#c4b5fd",
    label: "Investment memo research",
    visual: "brief",
    chips: ["Research", "LangGraph", "IC memo"],
  },
  compass: {
    accent: "#34d399",
    bg: "#071a13",
    bg2: "#133527",
    text: "#ecfdf5",
    muted: "#9ad9c0",
    label: "Community knowledge base",
    visual: "cards",
    chips: ["Slack", "RAG", "Founder Bible"],
  },
  fathom: {
    accent: "#fb7185",
    bg: "#1f0b12",
    bg2: "#3a1721",
    text: "#fff1f2",
    muted: "#f5a7b2",
    label: "Founder scoring pipeline",
    visual: "scores",
    chips: ["Signals", "Rubric", "Pipeline"],
  },
  vox: {
    accent: "#22d3ee",
    bg: "#07151a",
    bg2: "#11333b",
    text: "#ecfeff",
    muted: "#8adbe7",
    label: "AI founder interviews",
    visual: "wave",
    chips: ["Voice", "ElevenLabs", "Airtable"],
  },
  waypoint: {
    accent: "#60a5fa",
    bg: "#081525",
    bg2: "#142b49",
    text: "#eff6ff",
    muted: "#9fbfe9",
    label: "Pipeline metrics dashboard",
    visual: "funnel",
    chips: ["Stages", "SLA", "Velocity"],
  },
  horizon: {
    accent: "#2dd4bf",
    bg: "#071716",
    bg2: "#143a35",
    text: "#f0fdfa",
    muted: "#95d8cf",
    label: "Operational health monitoring",
    visual: "monitor",
    chips: ["DNS", "SSL", "Alerts"],
  },
  topograph: {
    accent: "#c084fc",
    bg: "#181020",
    bg2: "#332044",
    text: "#faf5ff",
    muted: "#d8b4fe",
    label: "Portfolio ownership dashboard",
    visual: "chart",
    chips: ["Carta", "AngelList", "MOIC"],
  },
  cacophony: {
    accent: "#facc15",
    bg: "#1c1504",
    bg2: "#3f3108",
    text: "#fefce8",
    muted: "#eadb8b",
    label: "Multiplayer AI music game",
    visual: "music",
    chips: ["Cards", "Lyrics", "Suno"],
  },
  eventops: {
    accent: "#f97316",
    bg: "#1d1008",
    bg2: "#42220e",
    text: "#fff7ed",
    muted: "#fdba74",
    label: "Event logistics planning",
    visual: "map",
    chips: ["Maps", "Roads", "Resources"],
  },
  firstyearin: {
    accent: "#f0abfc",
    bg: "#1b1020",
    bg2: "#3b2145",
    text: "#fdf4ff",
    muted: "#efb8f6",
    label: "Honest transition stories",
    visual: "stories",
    chips: ["Essays", "Community", "First year"],
  },
  notionplus: {
    accent: "#f5f5f4",
    bg: "#111111",
    bg2: "#2b2b2b",
    text: "#fafaf9",
    muted: "#c7c7c2",
    label: "Notion-native marketplace",
    visual: "blocks",
    chips: ["Forms", "Widgets", "Workers"],
  },
  whatsinmy: {
    accent: "#86efac",
    bg: "#08160d",
    bg2: "#17351f",
    text: "#f0fdf4",
    muted: "#a7d9b5",
    label: "Affiliate revenue aggregation",
    visual: "ledger",
    chips: ["Links", "Commissions", "Creators"],
  },
};

const font = fetch(
  new URL("../../public/fonts/kaisei-tokumin-bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

function visual(theme: ProjectTheme) {
  const line = { backgroundColor: theme.accent, opacity: 0.75 };
  const panel = {
    position: "absolute" as const,
    right: 130,
    top: 180,
    width: 610,
    height: 600,
    borderRadius: 34,
    border: `2px solid ${theme.accent}55`,
    backgroundColor: "#ffffff10",
    display: "flex",
    padding: 42,
  };

  if (theme.visual === "nodes") {
    return (
      <div style={{ ...panel, flexDirection: "column", gap: 26 }}>
        {["request", "plan", "approve", "execute"].map((step, i) => (
          <div
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              marginLeft: i % 2 ? 70 : 0,
            }}
          >
            <div
              style={{
                width: 86,
                height: 86,
                borderRadius: 24,
                backgroundColor: i === 2 ? theme.accent : `${theme.accent}44`,
                border: `3px solid ${theme.accent}`,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: 280, height: 22, borderRadius: 999, backgroundColor: theme.accent }} />
              <div style={{ width: 190, height: 18, borderRadius: 999, backgroundColor: `${theme.accent}77` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (theme.visual === "network") {
    return (
      <div style={panel}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: [70, 240, 420, 170, 360, 500][i],
              top: [90, 65, 150, 320, 390, 280][i],
              width: [110, 84, 130, 96, 118, 78][i],
              height: [110, 84, 130, 96, 118, 78][i],
              borderRadius: 999,
              border: `3px solid ${theme.accent}`,
              backgroundColor: `${theme.accent}22`,
            }}
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={`l-${i}`}
            style={{
              position: "absolute",
              left: [150, 310, 250, 430, 225][i],
              top: [145, 135, 300, 280, 390][i],
              width: [180, 150, 160, 105, 210][i],
              height: 4,
              transform: `rotate(${[-16, 24, -38, 42, 12][i]}deg)`,
              ...line,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme.visual === "wave") {
    return (
      <div style={{ ...panel, alignItems: "center", gap: 18 }}>
        {[180, 290, 410, 250, 520, 350, 220, 470, 310, 390, 240, 160].map((height, i) => (
          <div
            key={i}
            style={{
              width: 28,
              height,
              borderRadius: 999,
              backgroundColor: i % 3 === 0 ? theme.accent : `${theme.accent}88`,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme.visual === "music") {
    return (
      <div style={{ ...panel, flexDirection: "column", gap: 28 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: 24,
              width: 500,
              height: 130,
              borderRadius: 26,
              backgroundColor: i === 1 ? `${theme.accent}2f` : "#ffffff13",
              border: `2px solid ${theme.accent}55`,
              transform: `rotate(${[-3, 4, -2][i]}deg)`,
            }}
          >
            <div style={{ display: "flex", fontSize: 64, color: theme.accent }}>
              {["♪", "♫", "♬"][i]}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ width: [290, 250, 310][i], height: 22, borderRadius: 999, backgroundColor: theme.accent }} />
              <div style={{ width: [210, 330, 180][i], height: 18, borderRadius: 999, backgroundColor: `${theme.accent}88` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (theme.visual === "map") {
    return (
      <div style={panel}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: [20, 120, 80, 250][i],
              top: [120, 260, 430, 80][i],
              width: [620, 500, 520, 440][i],
              height: 18,
              borderRadius: 999,
              transform: `rotate(${[-18, 14, -8, 42][i]}deg)`,
              backgroundColor: i === 1 ? theme.accent : `${theme.accent}77`,
            }}
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={`pin-${i}`}
            style={{
              position: "absolute",
              left: [90, 240, 380, 455, 180][i],
              top: [170, 230, 320, 150, 410][i],
              width: 54,
              height: 54,
              borderRadius: 999,
              backgroundColor: theme.text,
              border: `12px solid ${theme.accent}`,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme.visual === "scores") {
    return (
      <div style={{ ...panel, flexWrap: "wrap", gap: 28 }}>
        {["Breakout", "Repeat", "Operator", "Novice"].map((tier, i) => (
          <div
            key={tier}
            style={{
              width: 240,
              height: 220,
              borderRadius: 30,
              backgroundColor: i === 0 ? `${theme.accent}33` : "#ffffff12",
              border: `2px solid ${theme.accent}55`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 24,
            }}
          >
            <div style={{ display: "flex", color: theme.text, fontSize: 30 }}>{tier}</div>
            <div style={{ display: "flex", height: 18, borderRadius: 999, backgroundColor: `${theme.accent}44` }}>
              <div style={{ width: `${[92, 70, 54, 28][i]}%`, borderRadius: 999, backgroundColor: theme.accent }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (theme.visual === "chart") {
    return (
      <div style={panel}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 90 + i * 115,
              bottom: 80,
              width: 74,
              height: [210, 310, 260, 420][i],
              borderRadius: "22px 22px 0 0",
              backgroundColor: i === 3 ? theme.accent : `${theme.accent}77`,
            }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <div
            key={`line-${i}`}
            style={{
              position: "absolute",
              left: [130, 250, 360][i],
              top: [330, 245, 220][i],
              width: [145, 140, 160][i],
              height: 8,
              borderRadius: 999,
              backgroundColor: theme.text,
              transform: `rotate(${[-32, 18, -42][i]}deg)`,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme.visual === "funnel") {
    return (
      <div style={{ ...panel, flexDirection: "column", alignItems: "center", gap: 26 }}>
        {[500, 420, 320, 220, 130].map((width, i) => (
          <div
            key={i}
            style={{
              width,
              height: 70,
              borderRadius: 20,
              backgroundColor: i === 0 ? theme.accent : `${theme.accent}${["cc", "aa", "88", "66", "44"][i]}`,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme.visual === "ledger") {
    return (
      <div style={{ ...panel, flexDirection: "column", gap: 20 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 82,
              padding: "0 24px",
              borderRadius: 22,
              backgroundColor: i % 2 ? "#ffffff10" : `${theme.accent}24`,
              border: `2px solid ${theme.accent}44`,
            }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: theme.accent }} />
              <div style={{ width: [210, 170, 240, 150, 200][i], height: 20, borderRadius: 999, backgroundColor: `${theme.accent}99` }} />
            </div>
            <div style={{ display: "flex", color: theme.text, fontSize: 34 }}>${[128, 64, 240, 36, 410][i]}</div>
          </div>
        ))}
      </div>
    );
  }

  if (theme.visual === "monitor") {
    return (
      <div style={{ ...panel, flexDirection: "column", gap: 24 }}>
        {["DNS", "SSL", "Email", "API", "Cron"].map((item, i) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 500,
              height: 82,
              padding: "0 26px",
              borderRadius: 24,
              backgroundColor: "#ffffff10",
              border: `2px solid ${theme.accent}44`,
            }}
          >
            <div style={{ display: "flex", color: theme.text, fontSize: 32 }}>{item}</div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                backgroundColor: i === 3 ? "#f97316" : theme.accent,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (theme.visual === "brief") {
    return (
      <div style={panel}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: [90, 185, 280][i],
              top: [96, 72, 124][i],
              width: 245,
              height: 390,
              borderRadius: 22,
              backgroundColor: i === 1 ? `${theme.accent}28` : "#ffffff15",
              border: `2px solid ${theme.accent}55`,
              transform: `rotate(${[-8, 3, 10][i]}deg)`,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              padding: 26,
            }}
          >
            {[170, 130, 160, 95].map((width, j) => (
              <div key={j} style={{ width, height: 18, borderRadius: 999, backgroundColor: j === 0 ? theme.accent : `${theme.accent}88` }} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (theme.visual === "stories") {
    return (
      <div style={{ ...panel, flexDirection: "column", justifyContent: "center", gap: 28 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              marginLeft: [0, 55, 20, 90][i],
            }}
          >
            <div style={{ width: 76, height: 76, borderRadius: 999, border: `3px solid ${theme.accent}`, backgroundColor: `${theme.accent}22` }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: [310, 240, 280, 210][i], height: 20, borderRadius: 999, backgroundColor: theme.accent }} />
              <div style={{ width: [210, 300, 190, 260][i], height: 16, borderRadius: 999, backgroundColor: `${theme.accent}77` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (theme.visual === "blocks") {
    return (
      <div style={{ ...panel, flexWrap: "wrap", gap: 20 }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            style={{
              width: [150, 280, 210, 170, 240, 130, 260, 190][i],
              height: [110, 110, 160, 160, 120, 120, 150, 150][i],
              borderRadius: 12,
              border: `2px solid ${theme.accent}55`,
              backgroundColor: i === 1 || i === 6 ? `${theme.accent}24` : "#ffffff13",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ ...panel, flexWrap: "wrap", gap: 22 }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: [230, 260, 190, 240, 210, 280][i],
            height: [150, 110, 190, 120, 160, 100][i],
            borderRadius: 24,
            border: `2px solid ${theme.accent}66`,
            backgroundColor: i % 2 ? `${theme.accent}20` : "#ffffff16",
          }}
        />
      ))}
    </div>
  );
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title") || "byshennan.com";
  const slug = searchParams.get("slug") || "";
  const type = searchParams.get("type");
  const theme = type === "project" ? projectThemes[slug] : null;
  const fontData = await font;

  return new ImageResponse(
    theme ? (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: theme.bg,
          backgroundImage: `radial-gradient(circle at 78% 22%, ${theme.accent}44 0, transparent 34%), linear-gradient(135deg, ${theme.bg} 0%, ${theme.bg2} 100%)`,
          overflow: "hidden",
          fontFamily: "Kaisei Tokumin",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -120,
            bottom: -160,
            width: 520,
            height: 520,
            borderRadius: 999,
            border: `70px solid ${theme.accent}22`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 64,
            border: `1px solid ${theme.accent}44`,
            borderRadius: 44,
          }}
        />
        {visual(theme)}
        <div
          style={{
            position: "absolute",
            left: 150,
            top: 164,
            width: 840,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              color: theme.accent,
              fontSize: 34,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {theme.label}
          </div>
          <div
            style={{
              marginTop: 34,
              display: "flex",
              fontSize: postTitle.length > 20 ? 108 : 126,
              color: theme.text,
              lineHeight: 1,
              whiteSpace: "pre-wrap",
            }}
          >
            {postTitle}
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 58 }}>
            {theme.chips.map((chip) => (
              <div
                key={chip}
                style={{
                  color: theme.text,
                  fontSize: 30,
                  padding: "14px 24px",
                  borderRadius: 999,
                  border: `2px solid ${theme.accent}66`,
                  backgroundColor: "#ffffff12",
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 150,
            bottom: 104,
            display: "flex",
            color: theme.muted,
            fontSize: 28,
          }}
        >
          byshennan.com/projects/{slug}
        </div>
      </div>
    ) : (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: "url(https://byshennan.com/og.png)",
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: "flex",
            fontSize: 130,
            fontFamily: "Kaisei Tokumin",
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            color: "white",
            lineHeight: "120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Kaisei Tokumin",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
