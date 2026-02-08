// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { socket } from "../socket";
// import { useUser } from "../context/UserContext";

// const API_URL = import.meta.env.VITE_API_URL;
// const ROUND_TIME = 180; // 3 minutes

// const Grid = ({ setLeaderboard }) => {
//   const [blocks, setBlocks] = useState([]);
//   const [hovered, setHovered] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
//   const [winner, setWinner] = useState(null);
//   const timerRef = useRef(null);
//   const user = useUser();

//   if (!user) return null;

//   /* ================= FETCH BLOCKS ================= */
//   useEffect(() => {
//     const fetchBlocks = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/blocks`);
//         setBlocks(res.data);
//       } catch (err) {
//         console.error("Failed to load blocks:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlocks();

//     const handleUpdate = (updatedBlock) => {
//       setBlocks(prev =>
//         prev.map(b =>
//           b._id === updatedBlock._id ? updatedBlock : b
//         )
//       );
//     };

//     socket.on("block_updated", handleUpdate);

//     return () => {
//       socket.off("block_updated", handleUpdate);
//     };
//   }, []);

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     timerRef.current = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           endRound();
//           return ROUND_TIME;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerRef.current);
//   }, [blocks]);

//   /* ================= LEADERBOARD ================= */
//   useEffect(() => {
//     if (!setLeaderboard) return;

//     const counts = {};
//     blocks.forEach(b => {
//       if (b.owner) {
//         counts[b.owner] = (counts[b.owner] || 0) + 1;
//       }
//     });

//     setLeaderboard(counts);
//   }, [blocks, setLeaderboard]);

//   /* ================= CAPTURE ================= */
//   const capture = (blockId) => {
//     socket.emit("capture_block", {
//       blockId,
//       userId: user.id,
//       color: user.color,
//       name: user.name
//     });
//   };

//   /* ================= END ROUND ================= */
//   const endRound = async () => {
//     clearInterval(timerRef.current);

//     const counts = {};
//     blocks.forEach(b => {
//       if (b.owner) {
//         counts[b.owner] = (counts[b.owner] || 0) + 1;
//       }
//     });

//     const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
//     if (sorted.length > 0) {
//       setWinner({
//         name: sorted[0][0],
//         score: sorted[0][1]
//       });
//     }

//     // Reset board visually
//     setBlocks(prev =>
//       prev.map(b => ({
//         ...b,
//         owner: null,
//         color: null
//       }))
//     );

//     // Optional: also tell backend to reset
//     socket.emit("reset_board");
//   };

//   /* ================= UI ================= */
//   return (
//     <div
//       style={{
//         overflow: "auto",
//         padding: "20px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center"
//       }}
//     >
//       {/* Timer */}
//       <div
//         style={{
//           fontSize: "20px",
//           fontWeight: "bold",
//           marginBottom: "15px",
//           color: timeLeft < 10 ? "red" : "#222",
//           transition: "color 0.3s"
//         }}
//       >
//         ⏱ {Math.floor(timeLeft / 60)}:
//         {(timeLeft % 60).toString().padStart(2, "0")}
//       </div>

//       {loading && <p>⏳ Loading grid...</p>}

//       {!loading && blocks.length > 0 && (
//         <div
//           style={{
//             border: "4px solid #888",
//             padding: "8px",
//             background: "#f5f5f5"
//           }}
//         >
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(40, 20px)",
//               gap: "1px",
//               background: "#ccc"
//             }}
//           >
//             {blocks.map(block => {
//               const background =
//                 block.color ||
//                 (!block.owner && hovered === block._id
//                   ? user.color
//                   : "#e5e5e5");

//               return (
//                 <div
//                   key={block._id}
//                   style={{
//                     width: "20px",
//                     height: "20px",
//                     backgroundColor: background,
//                     border: "1px solid #d1d1d1",
//                     cursor: "pointer",
//                     transition: "all 0.2s ease",
//                     animation: block.color
//                       ? "pulse 0.5s ease"
//                       : "none"
//                   }}
//                   onMouseEnter={() => setHovered(block._id)}
//                   onMouseLeave={() => setHovered(null)}
//                   onClick={() => capture(block._id)}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Winner Modal */}
//       {winner && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "rgba(0,0,0,0.6)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             animation: "fadeIn 0.5s ease"
//           }}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "40px",
//               borderRadius: "16px",
//               textAlign: "center",
//               boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
//               animation: "scaleUp 0.4s ease"
//             }}
//           >
//             <h2 style={{ fontSize: "26px", marginBottom: "10px" }}>
//               🎉 Winner!
//             </h2>
//             <p style={{ fontSize: "20px", fontWeight: "bold" }}>
//               {winner.name}
//             </p>
//             <p style={{ marginBottom: "20px" }}>
//               Score: {winner.score}
//             </p>
//             <button
//               onClick={() => setWinner(null)}
//               style={{
//                 padding: "10px 20px",
//                 borderRadius: "8px",
//                 border: "none",
//                 background: "#4f46e5",
//                 color: "white",
//                 cursor: "pointer"
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Animations */}
//       <style>
//         {`
//           @keyframes pulse {
//             0% { transform: scale(1.3); }
//             100% { transform: scale(1); }
//           }
//           @keyframes fadeIn {
//             from { opacity: 0; }
//             to { opacity: 1; }
//           }
//           @keyframes scaleUp {
//             from { transform: scale(0.7); }
//             to { transform: scale(1); }
//           }
//         `}
//       </style>
//     </div>
//   );




import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { socket } from "../socket";
import { useUser } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;
const ROUND_TIME = 180;

const Grid = ({ setLeaderboard }) => {
  const [blocks, setBlocks] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [winner, setWinner] = useState(null);
  const timerRef = useRef(null);
  const user = useUser();

  if (!user) return null;

  /* ================= FETCH BLOCKS ================= */
  const fetchBlocks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blocks`);
      setBlocks(res.data);
    } catch (err) {
      console.error("Failed to load blocks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();

    socket.on("block_updated", (updatedBlock) => {
      setBlocks(prev =>
        prev.map(b =>
          b._id === updatedBlock._id ? updatedBlock : b
        )
      );
    });

    socket.on("board_reset", (freshBlocks) => {
      console.log("♻ Board reset received");
      setBlocks(freshBlocks);
      setTimeLeft(ROUND_TIME);
      setWinner(null);
    });

    return () => {
      socket.off("block_updated");
      socket.off("board_reset");
    };
  }, []);

  /* ================= TIMER (RUN ONCE) ================= */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endRound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  /* ================= LEADERBOARD ================= */
  useEffect(() => {
    if (!setLeaderboard) return;

    const counts = {};
    blocks.forEach(b => {
      if (b.owner) {
        counts[b.owner] = (counts[b.owner] || 0) + 1;
      }
    });

    setLeaderboard(counts);
  }, [blocks, setLeaderboard]);

  /* ================= CAPTURE ================= */
  const capture = (blockId) => {
    socket.emit("capture_block", {
      blockId,
      userId: user.id,
      color: user.color,
      name: user.name
    });
  };

  /* ================= END ROUND ================= */
  const endRound = () => {
    clearInterval(timerRef.current);

    const counts = {};
    blocks.forEach(b => {
      if (b.owner) {
        counts[b.owner] = (counts[b.owner] || 0) + 1;
      }
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    if (sorted.length > 0) {
      setWinner({
        name: sorted[0][0],
        score: sorted[0][1]
      });
    }

    //  Tell backend to reset DB and broadcast
    socket.emit("reset_board");
  };

  /* ================= UI ================= */
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      
      <div
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 15,
          color: timeLeft < 10 ? "red" : "#222"
        }}
      >
        ⏱ {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </div>

      {loading && <p>Loading...</p>}

      {!loading && blocks.length > 0 && (
        <div
          style={{
            border: "4px solid #888",
            padding: 8,
            display: "inline-block"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(40, 20px)",
              gap: 1
            }}
          >
            {blocks.map(block => {
              const background =
                block.color ||
                (!block.owner && hovered === block._id
                  ? user.color
                  : "#e5e5e5");

              return (
                <div
                  key={block._id}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: background,
                    border: "1px solid #d1d1d1",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    animation: block.color
                      ? "pulse 0.4s ease"
                      : "none"
                  }}
                  onMouseEnter={() => setHovered(block._id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => capture(block._id)}
                />
              );
            })}
          </div>
        </div>
      )}

      {winner && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              background: "white",
              padding: 40,
              borderRadius: 16,
              textAlign: "center"
            }}
          >
            <h2>🎉 Winner!</h2>
            <p style={{ fontWeight: "bold" }}>{winner.name}</p>
            <p>Score: {winner.score}</p>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Grid;

// };

// export default Grid;
