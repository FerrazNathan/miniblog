import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

import styles from './Post.module.css'

export default function Post() {
  const { id } = useParams()
  const { document: post, loading } = useFetchDocument('posts', id)
  
  return (
    <div className={styles.containerPost}>
      {loading && <p>Loading...</p>}
      {post && (
        <Fragment>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p className={styles.containerContent}>{post.content}</p>
          <h3>Este post trata de:</h3>

          <div className={styles.containerTags}>
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  )
}