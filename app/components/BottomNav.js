'use client';

import Link from 'next/link';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const subjects = [
    { id: 'english', name: '영어', icon: '🔤', href: '/english' },
    { id: 'math', name: '수학', icon: '🔢', href: '/math' },
    { id: 'science', name: '과학', icon: '🔬', href: '/science' },
    { id: 'social', name: '사회', icon: '🌏', href: '/social' }
  ];

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navContainer}>
        {subjects.map(subject => (
          <Link key={subject.id} href={subject.href} className={styles.navItem} aria-label={subject.name}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{subject.icon}</span>
            </div>
            <span className={styles.label}>{subject.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;