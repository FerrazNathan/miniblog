import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFecthDocuments";

import styles from "./Dashboard.module.css";

export default function Dashboard () {
  const { user } = useAuthValue();
  const uid = user.uid;

  const posts = [];

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>    
      <p>Gerencie seus posts</p>

      {posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Você ainda não tem posts</p>
          <Link to="/posts/create" className="btn">Criar primeiro post</Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
