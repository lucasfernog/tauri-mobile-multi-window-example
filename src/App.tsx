import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <main className="container">
      <div style={{ marginTop: 16 }}>
        <Outlet />
      </div>
    </main>
  );
}

export default App;
