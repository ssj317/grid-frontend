import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user] = useState(() => {
    console.log("👤 Initializing user...");
    const stored = localStorage.getItem("grid_user");

    if (stored) {
      const parsedUser = JSON.parse(stored);
      console.log("✅ User loaded from localStorage:", parsedUser);
      return parsedUser;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: "User-" + Math.floor(Math.random() * 1000),
      color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
    };

    console.log("✨ New user created:", newUser);
    localStorage.setItem("grid_user", JSON.stringify(newUser));
    return newUser;
  });

  console.log("🔄 UserProvider rendering with user:", user);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  console.log("🔍 useUser called, context:", context);
  if (!context) {
    console.error("❌ useUser called outside UserProvider!");
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};
