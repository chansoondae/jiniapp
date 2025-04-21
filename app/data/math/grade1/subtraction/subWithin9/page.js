'use client';

import { useState } from 'react';
import styles from './page.module.css';

const problems = [
  { id: 1, left: 9, right: 4 },
  { id: 2, left: 3, right: 2 },
  { id: 3, left: 7, right: 5 },
  { id: 4, left: 5, right: 1 },
  { id: 5, left: 6, right: 1 },
  { id: 6, left: 2, right: 1 },
  { id: 7, left: 9, right: 5 },
  { id: 8, left: 5, right: 2 },
  { id: 9, left: 6, right: 2 },
  { id: 10, left: 7, right: 6 },
  { id: 11, left: 4, right: 3 },
  { id: 12, left: 7, right: 2 },
  { id: 13, left: 8, right: 1 },
  { id: 14, left: 3, right: 1 },
  { id: 15, left: 5, right: 3 },
  { id: 16, left: 7, right: 3 },
  { id: 17, left: 7, right: 4 },
  { id: 18, left: 9, right: 6 },
  { id: 19, left: 6, right: 4 },
  { id: 20, left: 9, right: 7 },
  { id: 21, left: 8, right: 6 },
  { id: 22, left: 4, right: 2 },
  { id: 23, left: 9, right: 3 },
  { id: 24, left: 6, right: 5 }
];

export default function SubtractionWithin9Practice() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id, value) => {
    const num = value === '' ? '' : parseInt(value, 10) || 0;
    setAnswers(prev => ({ ...prev, [id]: num }));
  };

  const getScore = () => {
    return problems.reduce((score, prob) => {
      const correct = prob.left - prob.right;
      return (answers[prob.id] === correct) ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>➖ 뺄셈 연습 (몇 - 몇)</h1>
      <p className={styles.subtitle}>차가 9 이하인 뺄셈 문제를 풀어보세요.</p>
      <div className={styles.grid}>
        {problems.map(({ id, left, right }) => (
          <div key={id} className={styles.problem}>
            <div className={styles.problemNumber}>{id < 10 ? `0${id}` : id}.</div>
            <div className={styles.expression}>
              {left} - {right} ={' '}
              <input
                type="text"
                maxLength={2}
                disabled={submitted}
                className={`${styles.input} ${
                  submitted && answers[id] === left - right ? styles.correct : submitted ? styles.incorrect : ''
                }`}
                value={answers[id] || ''}
                onChange={(e) => handleChange(id, e.target.value)}
              />
            </div>
            {submitted && answers[id] !== left - right && (
              <div className={styles.correctAnswer}>정답: {left - right}</div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        {!submitted ? (
          <button className={styles.submitButton} onClick={() => setSubmitted(true)}>
            정답 확인
          </button>
        ) : (
          <>
            <div className={styles.score}>총 점수: {getScore()} / {problems.length}</div>
            <button className={styles.submitButton} onClick={resetQuiz}>
              다시 풀기
            </button>
          </>
        )}
      </div>
    </div>
  );
}