import { useEffect, useState } from "react";
import initialUsers from "../data/users";
import Add from "./Add";
import Gestion from "./Gestion";
import AddJob from "./AddJob";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState(() => {
    const stored = localStorage.getItem("usuarios");
    return stored ? JSON.parse(stored) : initialUsers;
  });

  const [tareas, setTareas] = useState(() => {
    const stored = localStorage.getItem("tareas");
    return stored ? JSON.parse(stored) : [];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/";
    }

    try {
      const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
      if (Array.isArray(tareasGuardadas)) {
        setTareas(tareasGuardadas);
      } else {
        setTareas([]);
        localStorage.removeItem("tareas");
      }
    } catch (error) {
      console.error("Error cargando tareas:", error);
      localStorage.removeItem("tareas");
      setTareas([]);
    }
  }, []);

  if (!user) return null;

  const tareasFiltradas =
    user.id !== "1"
      ? tareas.filter((t) => t && typeof t === "object" && t.id === user.id)
      : [];

  return (
    <div className="dashboard-wrapper">
      {/* Navbar */}
      <div className="dashboard-navbar">
        <div className="title">Shift Manager</div>

        <div className="admin-actions">
          {user.id === "1" && (
            <>
              <button onClick={() => setShowAddModal(true)}>
                Añadir empleado
              </button>
              <button onClick={() => setShowEditModal(true)}>
                Gestionar empleado
              </button>
              <button onClick={() => setShowAddJobModal(true)}>
                Asignar tarea
              </button>
            </>
          )}

          <div className="menu-container">
            <button
              className="menu-toggle"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              ☰
            </button>
            {profileOpen && (
              <div className="menu-dropdown">
                <div>Perfil</div>
                <div
                  onClick={() => {
                    localStorage.removeItem("loggedUser");
                    window.location.href = "/";
                  }}
                >
                  Cerrar sesión
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabla de tareas para empleados */}
      {user.id !== "1" && (
        <div className="table-container">
          <h2>Tus Tareas</h2>
          {tareasFiltradas.length > 0 ? (
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
                {tareasFiltradas.map((tarea, idx) => (
                  <tr key={idx}>
                    <td>{tarea.tarea}</td>
                    <td>{tarea.ocupacion}</td>
                    <td>{tarea.ubicacion}</td>
                    <td>{tarea.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tienes tareas asignadas.</p>
          )}
        </div>
      )}

      {/* Modales */}
      {showAddModal && (
        <div className="modal-overlay">
          <Add
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            setShowAddModal={setShowAddModal}
          />
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <Gestion
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            setShowEditModal={setShowEditModal}
          />
        </div>
      )}

      {showAddJobModal && (
        <div className="modal-overlay">
          <AddJob
            usuarios={usuarios}
            setTareas={setTareas}
            setShowAddJobModal={setShowAddJobModal}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
