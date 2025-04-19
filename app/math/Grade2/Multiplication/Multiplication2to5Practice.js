'use client';

import { useState } from 'react';
import styles from './Multiplication2to5Practice.module.css';

const problems = [
  [4, 6], [2, 7], [3, 7], [3, 4], [4, 1], [5, 7],
  [2, 3], [4, 8], [4, 3], [2, 9], [2, 6], [2, 8],
  [4, 2], [3, 2], [4, 7], [5, 4], [5, 9], [5, 1],
  [3, 9], [5, 2], [2, 2], [3, 1], [3, 6], [5, 6]
];

export default function Multiplication2to5Practice() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, value) => {
    const num = value === '' ? '' : parseInt(value, 10) || 0;
    setAnswers(prev => ({ ...prev, [index]: num }));
  };

  const getScore = () => {
    return problems.reduce((score, [a, b], i) => {
      return (answers[i] === a * b) ? score + 1 : score;
    }, 0);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>✖️ 곱셈 연습 (2~5단)</h1>
      <p className={styles.subtitle}>2, 3, 4, 5단 곱셈 문제를 풀어보세요.</p>
      <div className={styles.grid}>
        {problems.map(([a, b], i) => (
          <div key={i} className={styles.problem}>
            <span className={styles.number}>{i + 1}.</span>
            <span className={styles.expression}>{a} × {b} =</span>
            <input
              type="text"
              value={answers[i] ?? ''}
              onChange={(e) => handleChange(i, e.target.value)}
              className={`${styles.input} ${
                submitted ? (answers[i] === a * b ? styles.correct : styles.incorrect) : ''
              }`}
              disabled={submitted}
            />
          </div>
        ))}
      </div>
      {!submitted ? (
        <button className={styles.submitButton} onClick={() => setSubmitted(true)}>정답 확인</button>
      ) : (
        <div className={styles.score}>총 점수: {getScore()} / {problems.length}</div>
      )}
    </div>
  );
}
