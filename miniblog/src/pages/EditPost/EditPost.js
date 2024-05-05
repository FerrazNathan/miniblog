import { useState, useEffect, Fragment } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

import styles from "./EditPost.module.css";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const navigate = useNavigate();

  const { document: post } = useFetchDocument("posts", id);
  const { updateDocument, response } = useUpdateDocument("posts");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setContent(post.content);

      const tagsString = post.tags.join(", ");
      setTags(tagsString);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (/^https?:\/\//.test(image)) {
      new URL(image);
    } else {
      setFormError("A imagem precisa ser uma URL");
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !content) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;

    const data = {
      title,
      image,
      content,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.editPost}>
      {post && (
        <Fragment>
          <h2>Editar: {post.title}</h2>
          <p>Edite o seu post!</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="text"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="url"
                name="image"
                required
                placeholder="Insira uma imagem que representa seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview}>Preview da imagem:</p>
            <img className={styles.previewImage} src={post.image} alt={post.title} />
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="content"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && (
              <button className="btn btn-primary">Editar post!</button>
            )}
            {response.loading && (
              <button className="btn btn-primary" disabled>
                Aguarde.. .
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </Fragment>
      )}
    </div>
  );
}
