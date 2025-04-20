import { useState } from "react";
import "./AddJob.css";

function AddJob({ setTareas, setShowAddJobModal }) {
  const [idDestino, setIdDestino] = useState("");
  const [datos, setDatos] = useState({
    tarea: "",
    ocupacion: "",
    ubicacion: "",
    fecha: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e, campo) => {
    setDatos({ ...datos, [campo]: e.target.value });
  };

  const asignarTarea = () => {
    try {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      if (!usuarios[idDestino]) {
        setMensaje("❌ ID no encontrado.");
        return;
      }

      // Validar que todos los campos estén llenos
      if (
        !datos.tarea.trim() ||
        !datos.ocupacion.trim() ||
        !datos.ubicacion.trim() ||
        !datos.fecha
      ) {
        setMensaje("❌ Todos los campos son obligatorios.");
        return;
      }

      const nuevaTarea = {
        id: idDestino,
        tarea: datos.tarea.trim(),
        ocupacion: datos.ocupacion.trim(),
        ubicacion: datos.ubicacion.trim(),
        fecha: datos.fecha,
      };

      const tareasActuales = JSON.parse(localStorage.getItem("tareas")) || [];
      const tareasActualizadas = [...tareasActuales, nuevaTarea];

      localStorage.setItem("tareas", JSON.stringify(tareasActualizadas));
      setTareas(tareasActualizadas);
      setMensaje("✅ Tarea asignada con éxito.");

      // Opcional: cerrar modal tras éxito
      setTimeout(() => {
        setShowAddJobModal(false);
      }, 1000);
    } catch (error) {
      console.error("Error asignando tarea:", error);
      setMensaje("❌ Error interno al guardar la tarea.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="addjob-modal">
        <h2>Asignar tarea a empleado</h2>
        <input
          type="text"
          placeholder="ID del empleado"
          value={idDestino}
          onChange={(e) => setIdDestino(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tarea"
          value={datos.tarea}
          onChange={(e) => handleChange(e, "tarea")}
        />
        <input
          type="text"
          placeholder="Ocupación"
          value={datos.ocupacion}
          onChange={(e) => handleChange(e, "ocupacion")}
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={datos.ubicacion}
          onChange={(e) => handleChange(e, "ubicacion")}
        />
        <input
          type="date"
          value={datos.fecha}
          onChange={(e) => handleChange(e, "fecha")}
        />

        {mensaje && <div className="addjob-message">{mensaje}</div>}

        <div className="modal-buttons">
          <button
            className="cancelar"
            onClick={() => setShowAddJobModal(false)}
          >
            Cancelar
          </button>
          <button className="guardar" onClick={asignarTarea}>
            Asignar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddJob;
