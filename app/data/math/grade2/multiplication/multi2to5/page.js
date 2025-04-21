'use client';

import { useState } from 'react';

// 메타데이터 추가 (주석으로도 좋습니다)
const META = {
  title: "곱셈 연습 (2~5단)",
  grade: "2학년",
  category: "수학/곱셈",
  icon: "✖️",
  generatedFrom: "worksheet-022.jpg", // OCR 출처 이미지
  lastUpdated: "2025-04-15"
};

const problems = [
  [4, 6], [2, 7], [3, 7], [3, 4], [4, 1], [5, 7],
  [2, 3], [4, 8], [4, 3], [2, 9], [2, 6], [2, 8],
  [4, 2], [3, 2], [4, 7], [5, 4], [5, 9], [5, 1],
  [3, 9], [5, 2], [2, 2], [3, 1], [3, 6], [5, 6]
];

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#f0f9ff',
    border: '4px solid #74b9ff',
    borderRadius: '16px',
    fontFamily: `'Comic Neue', cursive`,
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#0984e3',
    marginBottom: '0.5rem'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: '2rem',
    color: '#636e72'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '1rem'
  },
  problem: {
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '2px dashed #dfe6e9',
    textAlign: 'center'
  },
  number: {
    fontWeight: 'bold',
    marginRight: '0.5rem',
    color: '#6c5ce7'
  },
  expression: {
    fontSize: '1.2rem',
    marginRight: '0.5rem'
  },
  input: {
    width: '50px',
    padding: '0.3rem',
    fontSize: '1rem',
    textAlign: 'center',
    border: '2px solid #b2bec3',
    borderRadius: '6px'
  },
  correct: {
    backgroundColor: '#dff9fb',
    borderColor: '#00cec9'
  },
  incorrect: {
    backgroundColor: '#ffeaa7',
    borderColor: '#ff7675'
  },
  submitButton: {
    display: 'block',
    margin: '2rem auto 0',
    background: '#0984e3',
    color: 'white',
    padding: '0.75rem 2rem',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  score: {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#00b894',
    marginTop: '2rem'
  },
  correctAnswer: {
    color: '#2ecc71',
    fontWeight: 600,
    marginTop: '5px',
    fontSize: '0.9rem',
    textAlign: 'center',
    padding: '4px',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    borderRadius: '4px'
  }
};

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

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✖️ 곱셈 연습 (2~5단)</h1>
      <p style={styles.subtitle}>2, 3, 4, 5단 곱셈 문제를 풀어보세요.</p>
      <div style={styles.grid}>
        {problems.map(([a, b], i) => {
          const isCorrect = answers[i] === a * b;
          const inputStyle = {
            ...styles.input,
            ...(submitted && (isCorrect ? styles.correct : styles.incorrect))
          };

          return (
            <div key={i} style={styles.problem}>
              <span style={styles.number}>{i + 1}.</span>
              <span style={styles.expression}>{a} × {b} =</span>
              <input
                type="text"
                value={answers[i] ?? ''}
                onChange={(e) => handleChange(i, e.target.value)}
                style={inputStyle}
                disabled={submitted}
              />
              {submitted && !isCorrect && (
                <div style={styles.correctAnswer}>정답: {a * b}</div>
              )}
            </div>
          );
        })}
      </div>
      <div>
        {!submitted ? (
          <button style={styles.submitButton} onClick={() => setSubmitted(true)}>정답 확인</button>
        ) : (
          <>
            <div style={styles.score}>총 점수: {getScore()} / {problems.length}</div>
            <button style={styles.submitButton} onClick={resetQuiz}>다시 풀기</button>
          </>
        )}
      </div>
    </div>
  );
}
