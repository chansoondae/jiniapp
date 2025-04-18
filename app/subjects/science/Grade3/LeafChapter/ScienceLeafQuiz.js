'use client';

import { useState } from 'react';
import styles from './ScienceLeafQuiz.module.css';

const questions = [
  {
    question: '1. 다음 ( )안에 들어갈 알맞은 말을 쓰세요.\n식물의 잎은 잎몸, 잎맥, 잎의 가장자리, (     )로 구성되어 있다.',
    type: 'text',
    correctAnswer: '잎자루'
  },
  {
    question: '2. 다음 중 식물의 잎을 채집할 때 주의할 점으로 옳은 것을 모두 고르세요.',
    type: 'multi',
    options: [
      '되도록 땅에 떨어진 잎을 채집한다.',
      '식물의 잎이 적은 부분에서 한두 개만 채집한다.',
      '여러 친구들이 사용해야 하므로 많이 채집한다.'
    ],
    correctAnswer: [
      '되도록 땅에 떨어진 잎을 채집한다.',
      '식물의 잎이 적은 부분에서 한두 개만 채집한다.'
    ]
  },
  {
    question: '3. 식물의 잎을 분류하는 기준으로 옳은 것을 고르세요 (O는 옳음, X는 틀림).',
    type: 'multi',
    options: [
      '잎의 가장자리가 들쭉날쭉한가?',
      '잎의 크기가 큰가?',
      '잎의 모양이 아름다운가?'
    ],
    correctAnswer: [
      '잎의 가장자리가 들쭉날쭉한가?'
    ]
  },
  {
    question: '4. 들과 산에 사는 식물들의 특징으로 옳은 것을 고르세요.',
    type: 'choice',
    options: [
      '줄기가 단단한가?',
      '잎의 크기가 큰가?',
      '잎맥이 굵은가?',
      '꽃이 피는 계절이 다른가?'
    ],
    correctAnswer: '줄기가 단단한가?'
  }
];

export default function ScienceLeafQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const isCorrect = (index) => {
    const userAnswer = answers[index];
    const correct = questions[index].correctAnswer;
    if (Array.isArray(correct)) {
      return (
        Array.isArray(userAnswer) &&
        correct.length === userAnswer.length &&
        correct.every(ans => userAnswer.includes(ans))
      );
    } else {
      return userAnswer?.trim() === correct;
    }
  };

  const correctCount = Object.keys(answers).filter(index => isCorrect(Number(index))).length;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌿 과학 퀴즈: 식물의 잎</h1>
      {questions.map((q, i) => (
        <div key={i} className={styles.questionBox}>
          <p className={styles.question}>{q.question}</p>
          {q.type === 'text' && (
            <input
              type="text"
              value={answers[i] || ''}
              onChange={(e) => handleChange(i, e.target.value)}
              className={styles.input}
            />
          )}
          {q.type === 'multi' && (
            <ul className={styles.options}>
              {q.options.map((opt, idx) => (
                <li key={idx}>
                  <label>
                    <input
                      type="checkbox"
                      checked={answers[i]?.includes(opt) || false}
                      onChange={(e) => {
                        const prev = answers[i] || [];
                        const newValue = e.target.checked
                          ? [...prev, opt]
                          : prev.filter(item => item !== opt);
                        handleChange(i, newValue);
                      }}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          )}
          {q.type === 'choice' && (
            <ul className={styles.options}>
              {q.options.map((opt, idx) => (
                <li key={idx}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${i}`}
                      checked={answers[i] === opt}
                      onChange={() => handleChange(i, opt)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          )}
          {submitted && (
            <p className={isCorrect(i) ? styles.correct : styles.incorrect}>
              {isCorrect(i) ? '✅ 정답입니다!' : `❌ 다시 확인해보세요. 정답: ${Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}`}
            </p>
          )}
        </div>
      ))}
      {!submitted ? (
        <button onClick={handleSubmit} className={styles.submitButton}>제출</button>
      ) : (
        <p className={styles.thankyou}>🎉 정답률: {Math.round((correctCount / questions.length) * 100)}% ({correctCount}/{questions.length})</p>
      )}
    </div>
  );
}