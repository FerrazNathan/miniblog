import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFecthDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

import Modal from "../../components/Modal/Modal";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");
  if(loading) return <p>Carregando...</p>;

  const openModal = (postId) => {
    setIsModalOpen(true);
    setPostIdToDelete(postId)
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPostIdToDelete(null);    
  };

  return (
    <Fragment>
      <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>

      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn btn-primary">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          <span>Título</span>
          <span>Ações</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div className={styles.post_row} key={post.id}>
            <p>{post.title}</p>
            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Ver
              </Link>
              <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                Editar
              </Link>
              <button
                onClick={() => openModal(post.id)}
                className="btn btn-outline btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
    </div>

    <Modal 
      isOpen={isModalOpen} 
      onClose={closeModal}
    >
      <h3>Deseja realmente excluir esse post?</h3>
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
            deleteDocument(postIdToDelete);
            closeModal();
          }}
        >
          Excluir
        </button>
      </div>

    </Modal>

    </Fragment>
  );
};
