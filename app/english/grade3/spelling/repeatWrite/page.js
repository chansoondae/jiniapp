'use client';

import { useState } from 'react';
import styles from './page.module.css';

const spellingWords = [
  "penny", "pennies", "empty", "emptied",
  "parties", "families", "mystery", "mysteries",
  "discovery", "married", "carried", "jury",
  "argument", "verdict", "guilty", "lawyer"
];

export default function SpellingRepeatPractice() {
  const [answers, setAnswers] = useState({});

  const handleChange = (index, attempt, value) => {
    setAnswers(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [attempt]: value
      }
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>✏️ Write It Two Times!</h1>
      <p className={styles.subtitle}>Write each spelling word two times to practice.</p>
      <div className={styles.list}>
        {spellingWords.map((word, index) => (
          <div key={index} className={styles.wordRow}>
            <span className={styles.wordIndex}>{index + 1}.</span>
            <span className={styles.wordText}>{word}</span>
            <input
              className={styles.input}
              value={answers[index]?.first || ''}
              onChange={(e) => handleChange(index, 'first', e.target.value)}
              placeholder="1st"
            />
            <input
              className={styles.input}
              value={answers[index]?.second || ''}
              onChange={(e) => handleChange(index, 'second', e.target.value)}
              placeholder="2nd"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
