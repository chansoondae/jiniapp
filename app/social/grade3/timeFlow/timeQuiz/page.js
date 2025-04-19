'use client';

import { useState } from 'react';
import styles from './page.module.css';

const questions = [
  {
    question: '아침에 일어난 후 가장 먼저 하는 일은 무엇인가요?',
    options: ['학교 가기', '세수하기', '점심 먹기', '잠자기'],
    answer: '세수하기'
  },
  {
    question: '학교에서 점심시간은 언제쯤인가요?',
    options: ['오전 8시', '오전 10시', '정오 12시', '오후 3시'],
    answer: '정오 12시'
  },
  {
    question: '하루 중 해가 가장 높이 뜨는 시간은 언제인가요?',
    options: ['새벽', '아침', '점심', '저녁'],
    answer: '점심'
  },
  {
    question: '잠자리에 드는 시간으로 알맞은 것은?',
    options: ['오전 7시', '정오 12시', '오후 5시', '오후 9시'],
    answer: '오후 9시'
  }
];

export default function SocialTimeQuiz() {
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index, option) => {
    setSelected(prev => ({ ...prev, [index]: option }));
  };

  const getScore = () => {
    return questions.reduce((score, q, i) => selected[i] === q.answer ? score + 1 : score, 0);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🕰️ 시간의 흐름 퀴즈</h1>
      <p className={styles.subtitle}>일상의 순서와 시간 표현을 익혀보세요.</p>

      {questions.map((q, i) => (
        <div key={i} className={styles.questionCard}>
          <p className={styles.question}>{i + 1}. {q.question}</p>
          <div className={styles.options}>
            {q.options.map((option, j) => (
              <button
                key={j}
                className={`${styles.option} ${submitted ? (option === q.answer ? styles.correct : (selected[i] === option ? styles.incorrect : '')) : (selected[i] === option ? styles.selected : '')}`}
                onClick={() => !submitted && handleSelect(i, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button className={styles.submitButton} onClick={() => setSubmitted(true)}>정답 확인</button>
      ) : (
        <div className={styles.score}>총 점수: {getScore()} / {questions.length}</div>
      )}
    </div>
  );
}
