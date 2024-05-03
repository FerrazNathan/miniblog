import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";

import styles from "./Navbar.module.css";
import Modal from "../Modal/Modal";

export default function Navbar (){

  const { logout } = useAuthentication();
  const { user } = useAuthValue();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
    <nav className={styles.navbar}>
      <NavLink className={styles.brand} to="/">
        Mini <span>Blog</span>
      </NavLink>

      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>

        {!user && (
          <Fragment>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </Fragment>
        )}

        {user && (
          <Fragment>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </Fragment>
        )}

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>

        {user && (
          <li>
            <button onClick={openModal}>Sair</button>
          </li>
        )}
        
      </ul>
    </nav>

    <Modal 
      isOpen={isModalOpen} 
      onClose={closeModal}
    >
      <h3>Deseja realmente sair?</h3>
      <div className={styles.containerButtons}>
        <button 
          className="btn btn-primary"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button 
          className="btn btn-outline btn-danger"
          onClick={() => {
            logout();
            closeModal();
          }}
        >
          Sair
        </button>
      </div>

    </Modal>
    </Fragment>
  );
};
