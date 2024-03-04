"use client";

export const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(200, 200, 200)" }}>
        <li style={{ listStyleType: "none", margin: "0.5rem 1rem" }}>
          <a href="">Home</a>
        </li>
        <li style={{ listStyleType: "none", margin: "0.5rem 1rem" }}>
          <a href="">Cursos</a>
        </li>
        <li style={{ listStyleType: "none", margin: "0.5rem 1rem" }}>
          <a href="/students">Estudiantes</a>
        </li>
        <li style={{ listStyleType: "none", margin: "0.5rem 1rem" }}>
          <a href="">Pagos</a>
        </li>
      </ul>
    </nav>
  );
};
