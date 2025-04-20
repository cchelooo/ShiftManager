import { useState } from "react";
import "./Add.css";

function Add({ usuarios, setUsuarios, setShowAddModal }) {
  const [nuevo, setNuevo] = useState({
    id: "",
    nombre: "",
    apellido: "",
    password: "",
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

    if (!nuevo.nombre || !nuevo.apellido || !nuevo.password) {
      setMensaje("❌ Todos los campos son obligatorios.");
      return;
    }

    const nuevosUsuarios = { ...usuarios, [nuevo.id]: nuevo };
    setUsuarios(nuevosUsuarios);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    setMensaje("✅ Usuario agregado con éxito.");

    setTimeout(() => {
      setShowAddModal(false);
    }, 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="add-modal">
        <h2>Agregar nuevo empleado</h2>
        {["id", "nombre", "apellido", "password"].map((campo) => (
          <input
            key={campo}
            type={campo === "password" ? "password" : "text"}
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
