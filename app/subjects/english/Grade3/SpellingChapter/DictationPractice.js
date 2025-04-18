
'use client';

import { useState } from 'react';
import styles from './DictationPractice.module.css';

const sentences = [
  "She emptied the pennies into her bank.",
  "The jury reached a verdict of guilty.",
  "The families had an argument over money.",
  "He carried the empty bag to the trash.",
  "The lawyer talked about the mystery of the crime.",
  "Our discovery of the old penny made us famous.",
  "Who knows what mysteries we will find in the empty cave?",
  "There were many parties for the married couple.",
  "The little boy carried his bag of pennies to church.",
  "Many families have parties at this time of year."
];

export default function DictationPractice() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const getScore = () => {
    let score = 0;
    sentences.forEach((s, i) => {
      if ((answers[i] || '').trim().toLowerCase() === s.trim().toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🗣️ Dictation Practice</h1>
      <p className={styles.subtitle}>Listen and write each sentence below.</p>
      <div className={styles.sentenceList}>
        {sentences.map((_, i) => (
          <div key={i} className={styles.sentenceBox}>
            <label className={styles.sentenceLabel}>Sentence {i + 1}</label>
            <textarea
              rows={2}
              className={`${styles.input} ${
                submitted && ((answers[i] || '').trim().toLowerCase() === sentences[i].toLowerCase() ? styles.correct : styles.incorrect)
              }`}
              value={answers[i] || ''}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder="Type what you hear..."
              disabled={submitted}
            />
          </div>
        ))}
      </div>

      {!submitted ? (
        <button className={styles.submitButton} onClick={() => setSubmitted(true)}>
          Check My Sentences
        </button>
      ) : (
        <div className={styles.score}>
          Score: {getScore()} / {sentences.length}
        </div>
      )}
    </div>
  );
}
