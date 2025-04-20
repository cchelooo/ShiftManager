import { useEffect, useState } from "react";
import initialUsers from "../data/users";
import Add from "./Add";
import Gestion from "./Gestion";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState(() => {
    const stored = localStorage.getItem("usuarios");
    return stored ? JSON.parse(stored) : initialUsers;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("loggedUser");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      window.location.href = "/";
    }
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar ajustada a un rectángulo de 1920x70px */}
      <div
        className="flex justify-between items-center bg-charcoal text-white p-4 shadow"
        style={{ width: "1920px", height: "70px" }}
      >
        <h1 className="text-xl font-semibold">Shift Manager</h1>

        <div className="flex space-x-4 items-center">
          {/* Mostrar botones solo para el admin (ID == 1) */}
          {user.id === "1" && (
            <>
              <button
                className="bg-rosy-brown hover:bg-indian-red py-2 px-3 rounded transition-colors duration-200"
                onClick={() => setShowAddModal(true)}
              >
                Añadir empleado
              </button>
              <button
                className="bg-rosy-brown hover:bg-indian-red py-2 px-3 rounded transition-colors duration-200"
                onClick={() => setShowEditModal(true)}
              >
                Gestionar empleado
              </button>
            </>
          )}
          {/* Botón de perfil */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 bg-rich-black rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-90"
            >
              <span className="text-white">&#9662;</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white border shadow rounded text-black">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Perfil
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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

      {/* Mostrar los modales de Add y Gestion si están activos */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Add
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            setShowAddModal={setShowAddModal}
          />
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Gestion
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            setShowEditModal={setShowEditModal}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
