'use client';

import { useState } from 'react';
import styles from './SocialRegionQuiz.module.css';

const questions = [
  {
    question: '서울특별시의 인구는 약 몇 명인가요?',
    options: ['500만 명', '1000만 명', '1500만 명', '2000만 명'],
    answer: '1000만 명'
  },
  {
    question: '제주도의 연평균 기온은 몇 도 정도인가요?',
    options: ['10도', '12도', '16도', '20도'],
    answer: '16도'
  },
  {
    question: '강원도는 어떤 지형이 많은가요?',
    options: ['평야', '산지', '해안', '사막'],
    answer: '산지'
  },
  {
    question: '부산광역시는 어떤 바다와 접해 있나요?',
    options: ['서해', '동해', '남해', '황해'],
    answer: '남해'
  }
];

export default function SocialRegionQuiz() {
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
      <h1 className={styles.title}>📍 지역 정보 퀴즈</h1>
      <p className={styles.subtitle}>각 지역의 인구, 지형, 기후 등을 문제로 풀어보세요.</p>

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