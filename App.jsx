import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function App() {
  const [users, setUsers] = useState(0);

  useEffect(() => {
    socket.on("onlineUsers", (count) => {
      setUsers(count);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Music App</h1>
      <p>🟢 {users} users online</p>
    </div>
  );
}