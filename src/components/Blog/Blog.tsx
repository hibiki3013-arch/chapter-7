import { useState, useEffect } from 'react';
import styles from './Blog.module.css';
import { Link } from 'react-router-dom';

type Post = {
  id:string;
  title:string;
  content:string;
  createdAt:string;
  categories:string[];
};
export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const fetcher = async () => {
      try{
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await res.json();
      setPosts(data.posts);
    }catch (error) {
      console.error("データの取得に失敗しました:", error);
    }finally {
      setLoading(false);
    }
  };

    fetcher();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

    if (posts.length === 0) {
    return <div>記事がありません。</div>;
  }

    return(
<div className={styles.PostCardMain}>
    {posts.map((post) => {
      const [year, month, day] = post.createdAt.split('T')[0].split('-');
      const formattedDate = `${year}年${month}月${day}日`;
       return (


      <Link to={`/article/${post.id}`}  key={post.id} className={styles.PostCard}>

        
      <div className={styles.PostCardBetween}> 
        <div className={styles.PostCardData}>{formattedDate}</div>

        <div className={styles.PostCardCategory}>
        {post.categories.map((category, index) => {
          return(
            <span key={index} className={styles.CategoryDetail}>{category}</span>
          )
        }
      )}
      </div>
      </div>

      <div className={styles.PostCardTitle}>
        APIで取得した{post.title}
      </div>

      <div className={styles.PostCardArticle} dangerouslySetInnerHTML={{ __html: post.content }} />
      </Link>
            );
          })}
</div>  
);
}