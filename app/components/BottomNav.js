'use client';

import Link from 'next/link';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const navItems = [
    { id: 'home', name: 'Home', icon: '🏠', href: '/' },
    { id: 'view', name: 'View', icon: '👁️', href: '/view' },
    { id: 'upload', name: 'Upload', icon: '📤', href: '/upload', isUpload: true },
    { id: 'search', name: 'Search', icon: '🔍', href: '/search' },
    { id: 'my', name: 'My', icon: '👤', href: '/my' }
  ];

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navContainer}>
        {navItems.map(item => (
          <Link 
            key={item.id} 
            href={item.href} 
            className={`${styles.navItem} ${item.isUpload ? styles.uploadButton : ''}`} 
            aria-label={item.name}
          >
            <div className={item.isUpload ? styles.uploadIconWrapper : styles.iconWrapper}>
              <span className={item.isUpload ? styles.uploadIcon : styles.icon}>{item.icon}</span>
            </div>
            <span className={styles.label}>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;