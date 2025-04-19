import { useState } from "react";
import { users, tasks } from "../data/users";

function Login() {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (users[employeeNumber] && users[employeeNumber] === password) {
      window.location.href = "/dashboard";
    } else {
      setError("Número de empleado o contraseña incorrecta.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="title">Shift Manager</h1>
        <h2 style={{ marginBottom: "1rem" }}>Iniciar sesión</h2>

        <div className="input-group">
          <label htmlFor="employee">Número de empleado</label>
          <input
            type="text"
            id="employee"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            placeholder="Ej. 1"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p style={{ color: "tomato", marginBottom: "1rem" }}>{error}</p>
        )}

        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}

export default Login;
