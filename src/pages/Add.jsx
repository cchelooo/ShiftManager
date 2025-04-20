import { useState } from "react";
import "./Add.css"; // Asegúrate de tener este archivo

function Add({ usuarios, setUsuarios, setShowAddModal }) {
  const [nuevo, setNuevo] = useState({
    id: "",
    nombre: "",
    apellido: "",
    tarea: "",
    ocupacion: "",
    ubicacion: "",
    fecha: "",
    password: "", // ← ¡Nuevo campo agregado!
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e, campo) => {
    setNuevo({ ...nuevo, [campo]: e.target.value });
  };

  const handleAgregar = () => {
    if (!nuevo.id || usuarios[nuevo.id]) {
      setMensaje("❌ ID inválido o ya existente.");
      return;
    }

    const nuevosUsuarios = { ...usuarios, [nuevo.id]: nuevo };
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    setShowAddModal(false);
    setMensaje("✅ Usuario agregado.");
  };

  return (
    <div className="modal-overlay">
      <div className="add-modal">
        <h2>Agregar nuevo empleado</h2>
        {[
          "id",
          "nombre",
          "apellido",
          "tarea",
          "ocupacion",
          "ubicacion",
          "fecha",
          "password",
        ].map((campo) => (
          <input
            key={campo}
            type={
              campo === "fecha"
                ? "date"
                : campo === "password"
                ? "password"
                : "text"
            }
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={nuevo[campo]}
            onChange={(e) => handleChange(e, campo)}
          />
        ))}

        {mensaje && <div className="add-message">{mensaje}</div>}

        <div className="modal-buttons">
          <button className="cancelar" onClick={() => setShowAddModal(false)}>
            Cancelar
          </button>
          <button className="guardar" onClick={handleAgregar}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Add;
