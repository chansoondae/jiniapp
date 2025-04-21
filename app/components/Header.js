// app/components/common/Header.js
'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <span className={styles.pencil}>✏️</span>
          <h1 className={styles.title}>Gungeum</h1>
        </div>
        <p className={styles.subtitle}>재미있게 배우는 즐거운 학습</p>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          홈
        </Link>
        <Link href="/about" className={styles.navLink}>
          소개
        </Link>
        <Link href="/view" className={styles.navLink}>
          뷰
        </Link>
        <Link href="/help" className={styles.navLink}>
          도움말
        </Link>
      </nav>
    </header>
  );
};

export default Header;