"use client"
import styles from "@/styles/Navbar.module.css"

export const Navbar = () => {
  return (
    <nav>
      <ul className={styles.navbar}>
        <li className={styles.navLinks}>
          <a href="">Home</a>
        </li>
        <li className={styles.navLinks}>
          <a href="">Cursos</a>
        </li>
        <li className={styles.navLinks}>
          <a href="/students">Estudiantes</a>
        </li>
        <li className={styles.navLinks}>
          <a href="">Pagos</a>
        </li>
      </ul>
    </nav>
  );
};
