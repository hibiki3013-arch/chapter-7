import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="Header">

    <header className={styles.SiteHeader}>
      <Link to="/" className={styles.HeaderLink}>ブログ</Link>
      <Link to="/inquiry" className={styles.HeaderLink}>お問い合わせ</Link>
    </header>

    </div>
  );
}