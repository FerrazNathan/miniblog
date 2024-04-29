import { Link } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import { useFetchDocuments } from '../../hooks/useFecthDocuments';

import PostDetail from '../../components/PostDetail/PostDeatil';

import styles from './Search.module.css';

export default function Search () {
  const query = useQuery();
  const searchTerm = query.get('q');

  const { documents: posts, loading } = useFetchDocuments('posts', searchTerm);

  return (
    <div className={styles.searchContainer}>
      <h2>{searchTerm}</h2>
      {loading && <p>Carregando...</p>}
      <div>
        
        {posts && posts.length === 0 && (
          <aside>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar para a página inicial
            </Link>
          </aside>
        )}

        {posts && <PostDetail posts={posts} />}

      </div>
    </div>
  );
};