import { useState } from "react";
import users from "../data/users";

function Login() {
  const [empleado, setEmpleado] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = () => {
    // Traer usuarios del localStorage si existen
    const localUsuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    // Buscar en localStorage primero, luego en users.js
    const user = localUsuarios[empleado] || users[empleado];

    // Verificar contraseña
    if (user && user.password === contrasena) {
      const userData = { id: empleado, ...user };
      localStorage.setItem("loggedUser", JSON.stringify(userData));
      window.location.href = "/dashboard";
    } else {
      alert("❌ Credenciales incorrectas");
    }
  };

  return (
    <div className="login-wrapper">
      <h1 className="title">Shift Manager</h1>
      <div className="login-card">
        <h2>Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Número de empleado"
          value={empleado}
          onChange={(e) => setEmpleado(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}

export default Login;
