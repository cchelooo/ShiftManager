import { tasks } from "../data/users";
import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1 className="dashboard-title">Shift Manager Panel</h1>
        <button
          className={`toggle-button ${isOpen ? "rotated" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          ⮞
        </button>
      </nav>

      {isOpen && (
        <div className="sidebar">
          <button className="sidebar-item">Perfil</button>
          <button className="sidebar-item" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}

      <main className="table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Tarea</th>
              <th>Ocupación</th>
              <th>Ubicación</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.tarea}</td>
                <td>{task.ocupacion}</td>
                <td>{task.ubicacion}</td>
                <td>{task.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Dashboard;
