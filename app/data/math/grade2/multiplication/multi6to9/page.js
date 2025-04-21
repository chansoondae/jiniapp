// app/math/grade2/multilication/multi6to9/page.js

'use client';

import { useState } from 'react';
import styles from './page.module.css';

const problems = [
  [9, 1], [9, 7], [6, 7], [7, 3], [6, 9], [8, 3],
  [7, 5], [8, 6], [8, 5], [8, 2], [6, 4], [6, 1],
  [8, 8], [7, 7], [6, 8], [7, 9], [9, 4], [9, 3],
  [7, 4], [9, 2], [8, 1], [9, 5], [6, 2], [7, 1]
];

export default function Multiplication6to9Practice() {
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

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>✖️ 곱셈 연습 (6~9단)</h1>
      <p className={styles.subtitle}>6, 7, 8, 9단 곱셈 문제를 풀어보세요.</p>
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
            {submitted && answers[i] !== a * b && (
              <div className={styles.correctAnswer}>정답: {a * b}</div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.buttonGroup}>
        {!submitted ? (
          <button className={styles.submitButton} onClick={() => setSubmitted(true)}>정답 확인</button>
        ) : (
          <>
            <div className={styles.score}>총 점수: {getScore()} / {problems.length}</div>
            <button className={styles.submitButton} onClick={resetQuiz}>다시 풀기</button>
          </>
        )}
      </div>
    </div>
  );
}