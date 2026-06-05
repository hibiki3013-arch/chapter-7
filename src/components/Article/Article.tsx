import {useState, useEffect} from 'react';
import styles from './Article.module.css';
import {useParams} from 'react-router-dom';

type Post = {
  id:string;
  title:string;
  content:string;
  createdAt:string;
  categories:string[];
};

export default function Article() {

  const {id} = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
        const data = await res.json();

        setPost(data.post); 
      } catch (error) {
        console.error("詳細記事の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]); // idが変わったら再実行する

  if (loading) {
    return <div>記事を読み込み中...</div>;
  }

  if (!post) {
    return <div>記事が見つかりませんでした。</div>;
  }

  const [year, month, day] = post.createdAt ? post.createdAt.split('T')[0].split('-') : ['----', '--', '--'];
  const formattedDate = `${year}/${month}/${day}`;
  
   return(
    <div>
    <img src="https://placehold.jp/800x400.png" alt="記事の画像" className={styles.Img}/>

      <div key={post.id} className={styles.PostCard}>

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

      <div className={styles.PostCardArticle} dangerouslySetInnerHTML={{ __html: post.content }} /></div>
      
    </div>  
);
}