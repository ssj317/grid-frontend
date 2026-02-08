# 🎮 Real-Time Grid Capture Game – Frontend

This is the interactive client-side application for the Real-Time Grid Capture Game. Built with React and Vite, it provides a high-performance, low-latency interface where players compete to claim the most territory on a shared 40x40 grid.

---

## 🚀 Key Features
* **Interactive 40x40 Grid:** Optimized CSS grid rendering with high-frequency updates.
* **Real-Time Sync:** Uses Socket.IO for sub-100ms updates across all connected peers.
* **Live Leaderboard:** Real-time scoring based on tile ownership.
* **Round System:** Integrated 3-minute countdown timer with a winner announcement modal.
* **Visual Feedback:** Smooth hover effects, pulse animations on capture, and urgent timer alerts.

---

## 🛠 Tech Stack
* **Framework:** React (Vite)
* **Communication:** Socket.IO Client & Axios
* **State Management:** React Context API (`UserContext`)
* **Styling:** CSS3 (Flexbox/Grid + Keyframe Animations)

---

## 📁 Project Structure
```text
frontend/
│
├── src/
│   ├── component/
│   │   ├── Grid.jsx          # Main game board logic
│   │   └── Leaderboard.jsx   # Live score tracking
│   │
│   ├── context/
│   │   └── UserContext.jsx   # Auth & Role state (Admin vs User)
│   │
│   ├── socket.js             # Socket.IO client configuration
│   ├── App.jsx               # Layout and routing
│   └── main.jsx              # Entry point
│
├── .env                      # Connection strings
└── package.json
 Environment Variables
Create a .env file in the root directory. Ensure there are no trailing slashes.

Code snippet
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
Note: For production, replace these with your deployed backend URL (e.g., https://api.yourgame.com).

Core Logic & Flow
1. The Real-Time Loop
Interaction: User clicks a tile.

Emission: Client sends capture_block via Socket.

Update: Server validates and broadcasts block_updated.

Reaction: All clients receive the event and update the specific tile in local state without a full re-render.

2. Timer & Round Reset
The timer runs locally but synchronizes with the server.

Under 10s: Timer text turns red and pulses.

End of Round: A winner modal appears, and the board_reset socket event triggers a clean slate for the next round.

3. Role-Based Access
Since your backend supports Admin-only routes, the frontend includes:

User View: Standard gameplay and leaderboard.

Admin View: Access to the Reset Board button and round management controls.

🔌 Socket Configuration
The client is configured for maximum stability:

JavaScript
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5
});
 Running Locally
Install dependencies:

Bash
npm install
Start development server:

Bash
npm run dev
The app will typically run at http://localhost:5173.

 UI & Animations
Hover Preview: Shows the user's color at 50% opacity before clicking.

Capture Pulse: Captured tiles perform a scale-up/down animation.

Winner Modal: Fades in with a backdrop-blur effect.
