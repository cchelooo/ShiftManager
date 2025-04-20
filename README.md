# Shift Manager

Shift Manager es una aplicación web construida con React que permite a un administrador gestionar empleados y asignar tareas, mientras que los empleados pueden ver sus tareas asignadas desde su panel personal.

## 🧠 Características

🔐 Autenticación básica por ID  
👩‍💼 Rol de Administrador (ID: "1") con permisos exclusivos  
👷‍♂️ Vista para empleados con tabla de tareas asignadas  
📝 Crear, editar y eliminar empleados  

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Dashboard.jsx      ← Panel principal para admin y empleados
│   ├── Add.jsx            ← Modal para añadir empleados
│   ├── Gestion.jsx        ← Modal para editar/eliminar empleados
│   ├── AddJob.jsx         ← Modal para asignar tareas
├── data/
│   └── users.js           ← Datos de empleados por defecto
├── App.jsx
├── main.jsx
├── index.css
└── styles/
    └── Dashboard.css      ← Estilos para el dashboard
```
Accede desde tu navegador:  
https://shift-manager-rho.vercel.app/

## 🧪 Acceso de prueba

Para acceder como administrador:
- ID: 1  
- Contraseña: 123

## 🛠️ Tecnologías utilizadas (temporalmente)

- React
- JavaScript
- CSS clásico
- localStorage
