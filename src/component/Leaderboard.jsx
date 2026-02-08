import { useEffect, useState } from "react";

const randomNames = [
  "Falcon","Shadow","Blaze","Nova","Pixel","Storm","Comet",
  "Vortex","Echo","Orion","Drift","Zen","Spark","Ghost","Rocket"
];

const generateNiceName = (id) => {
  const index = Math.abs(hashCode(id)) % randomNames.length;
  return randomNames[index];
};

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const generateColor = (id) => {
  const hash = Math.abs(hashCode(id));
  return `hsl(${hash % 360}, 70%, 55%)`;
};

const Leaderboard = ({ leaderboard }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const sorted = Object.entries(leaderboard)
    .sort((a, b) => b[1] - a[1]);

  const getRankStyle = (index) => {
    if (index === 0)
      return { background: "linear-gradient(90deg,#FFD700,#FFA500)", color: "#000" };
    if (index === 1)
      return { background: "linear-gradient(90deg,#C0C0C0,#A9A9A9)", color: "#000" };
    if (index === 2)
      return { background: "linear-gradient(90deg,#CD7F32,#8B4513)", color: "#fff" };
    return {};
  };

  return (
    <div
      style={{
        padding: "22px",
        borderRadius: "18px",
        width: "270px",
        background: "linear-gradient(135deg,#1e293b,#0f172a)",
        color: "white",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        transform: animate ? "translateY(0)" : "translateY(20px)",
        opacity: animate ? 1 : 0,
        transition: "all 0.6s ease"
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "16px",
          background: "linear-gradient(90deg,#38bdf8,#818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        🏆 Leaderboard
      </h2>

      {sorted.length === 0 && (
        <p style={{ fontSize: "14px", color: "#cbd5e1" }}>
          No captures yet
        </p>
      )}

      {sorted.map(([user, count], index) => (
        <div
          key={user}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: "10px",
            marginBottom: "8px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(6px)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            ...getRankStyle(index)
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Left side */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Rank */}
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background:
                  index === 0
                    ? "#FFD700"
                    : index === 1
                    ? "#C0C0C0"
                    : index === 2
                    ? "#CD7F32"
                    : "#334155",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
                color: index < 3 ? "#000" : "#fff"
              }}
            >
              {index + 1}
            </div>

            {/* User dot */}
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: generateColor(user)
              }}
            />

            {/* Username */}
            <span style={{ fontSize: "14px" }}>
              {user.length > 12 ? generateNiceName(user) : user}
            </span>
          </div>

          {/* Score */}
          <span
            style={{
              fontWeight: "bold",
              fontSize: "15px"
            }}
          >
            {count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
