import { useState } from "react";
import Grid from "./component/Grid";
import Leaderboard from "./component/Leaderboard";
import { UserProvider } from "./context/UserContext";

function App() {
  const [leaderboard, setLeaderboard] = useState({});

  return (
    <UserProvider>
      <div style={styles.appContainer}>
        
        {/* Animated Background */}
        <div style={styles.background}></div>

        <div style={styles.mainLayout}>
          
          {/* Leaderboard */}
          <div style={styles.card}>
            <Leaderboard leaderboard={leaderboard} />
          </div>

          {/* Grid */}
          <div style={{ ...styles.card, flex: 1 }}>
            <Grid setLeaderboard={setLeaderboard} />
          </div>

        </div>

        {/* Background Animations */}
        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            @keyframes floatCard {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
      </div>
    </UserProvider>
  );
}

const styles = {
  appContainer: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif"
  },

  background: {
    position: "fixed",
    width: "100%",
    height: "100%",
    background: "linear-gradient(-45deg, #1e3a8a, #9333ea, #0ea5e9, #6366f1)",
    backgroundSize: "400% 400%",
    animation: "gradientShift 12s ease infinite",
    zIndex: -1
  },

  mainLayout: {
    display: "flex",
    gap: "30px",
    padding: "40px",
    alignItems: "flex-start",  // 🔥 This keeps them same height top-aligned
    justifyContent: "center"
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    animation: "floatCard 6s ease-in-out infinite"
  }
};

export default App;
