import { Fragment } from "react";
import { Link } from "react-router-dom";

import styles from "./PostDetail.module.css";

export default function PostDetail({ posts }) {
  return (
    <Fragment>
      {posts.map((post) => (
        <div key={post.id} className={styles.post_detail}>
          <img src={post.image} alt={post.title} />
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p className={styles.createdby}>por: {post.createdBy}</p>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>

          <Link to={`/posts/${post.id}`} className="btn btn-outline">
            Ler
          </Link>
        </div>
      ))}
    </Fragment>
  );
}
