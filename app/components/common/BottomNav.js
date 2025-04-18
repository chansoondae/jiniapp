'use client';

import React from 'react';
import styles from './BottomNav.module.css';

const BottomNav = ({ subjects, activeSubject, onSubjectChange }) => {
  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navContainer}>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            className={`${styles.navItem} ${activeSubject === subject.id ? styles.active : ''}`}
            onClick={() => onSubjectChange(subject.id)}
            aria-label={subject.name}
          >
            <div className={styles.iconWrapper}>
              {subject.id === 'english' && (
                <span className={styles.icon}>🔤</span>
              )}
              {subject.id === 'math' && (
                <span className={styles.icon}>🔢</span>
              )}
              {subject.id === 'science' && (
                <span className={styles.icon}>🔬</span>
              )}
              {subject.id === 'social' && (
                <span className={styles.icon}>🌏</span>
              )}
              {!['english', 'math', 'science', 'social'].includes(subject.id) && (
                <span className={styles.icon}>📚</span>
              )}
            </div>
            <span className={styles.label}>{subject.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;