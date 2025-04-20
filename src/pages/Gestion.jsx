import { useState } from "react";
import "./Gestion.css"; // Asegúrate de tener este archivo en la misma carpeta

function Gestion({ usuarios, setUsuarios, setShowEditModal }) {
  const [editUser, setEditUser] = useState({
    id: "",
    nombre: "null",
    apellido: "null",
    tarea: "null",
    ocupacion: "null",
    ubicacion: "null",
    fecha: "null",
  });
  const [editMessage, setEditMessage] = useState("");
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  const handleInputChange = (e, field) => {
    setEditUser({ ...editUser, [field]: e.target.value });
  };

  const loadUserData = () => {
    const data = usuarios[editUser.id];
    if (data) {
      setEditUser({ id: editUser.id, ...data });
      setUserDataLoaded(true);
      setEditMessage("✅ Datos cargados correctamente.");
    } else {
      setEditUser({
        id: editUser.id,
        nombre: "null",
        apellido: "null",
        tarea: "null",
        ocupacion: "null",
        ubicacion: "null",
        fecha: "null",
      });
      setUserDataLoaded(false);
      setEditMessage("❌ Empleado no encontrado.");
    }
  };

  const handleSaveChanges = () => {
    if (!editUser.id || !usuarios[editUser.id]) {
      setEditMessage("❌ El ID no existe.");
      return;
    }

    const nuevos = {
      ...usuarios,
      [editUser.id]: { ...usuarios[editUser.id], ...editUser },
    };

    setUsuarios(nuevos);
    localStorage.setItem("usuarios", JSON.stringify(nuevos));
    setShowEditModal(false);
    setEditMessage("✅ Datos actualizados correctamente.");
  };

  return (
    <div className="modal-overlay">
      <div className="gestion-modal">
        <h2>Gestionar empleado</h2>
        <input
          type="text"
          placeholder="ID del empleado"
          value={editUser.id}
          onChange={(e) => setEditUser({ ...editUser, id: e.target.value })}
        />
        <button onClick={loadUserData}>Cargar datos</button>
        {editMessage && <div className="edit-message">{editMessage}</div>}
        {userDataLoaded && (
          <>
            <div className="tabla-actual">
              <h3>Datos actuales</h3>
              <table>
                <thead>
                  <tr>
                    <th>Campo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "nombre",
                    "apellido",
                    "tarea",
                    "ocupacion",
                    "ubicacion",
                    "fecha",
                  ].map((campo) => (
                    <tr key={campo}>
                      <td>{campo}</td>
                      <td>
                        {editUser[campo] === "null"
                          ? "No disponible"
                          : editUser[campo]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="tabla-edicion">
              <h3>Editar datos</h3>
              <table>
                <thead>
                  <tr>
                    <th>Campo</th>
                    <th>Nuevo valor</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "nombre",
                    "apellido",
                    "tarea",
                    "ocupacion",
                    "ubicacion",
                    "fecha",
                  ].map((campo) => (
                    <tr key={campo}>
                      <td>{campo}</td>
                      <td>
                        <input
                          type={campo === "fecha" ? "date" : "text"}
                          value={
                            editUser[campo] === "null" ? "" : editUser[campo]
                          }
                          onChange={(e) => handleInputChange(e, campo)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-buttons">
              <button
                className="cancelar"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </button>
              <button className="guardar" onClick={handleSaveChanges}>
                Guardar cambios
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Gestion;
