// app/subjects/english/Grade3/SpellingChapter/SpellingChoicePractice.js

'use client';

import { useState } from 'react';
import styles from './page.module.css';

const questions = [
  { word: "mystery", options: ["mistery", "mystery", "mystrey"] },
  { word: "pennies", options: ["pinneys", "pennies", "pennys"] },
  { word: "emptied", options: ["emtied", "emptied", "emptyed"] },
  { word: "parties", options: ["partys", "partise", "parties"] },
  { word: "verdict", options: ["verdic", "veardict", "verdict"] },
  { word: "guilty", options: ["guilty", "giltey", "guiltie"] },
  { word: "lawyer", options: ["lawier", "lawyer", "lawyar"] },
  { word: "families", options: ["famlies", "families", "familys"] },
  { word: "discovery", options: ["discovry", "discovary", "discovery"] },
  { word: "married", options: ["maried", "merryed", "married"] },
  { word: "carried", options: ["carried", "caried", "carryed"] },
  { word: "penny", options: ["penny", "pinny", "peney"] },
  { word: "mysteries", options: ["mysterys", "mysteries", "misteries"] },
  { word: "empty", options: ["empty", "emty", "impty"] },
  { word: "jury", options: ["joory", "jurie", "jury"] },
  { word: "argument", options: ["argument", "arguement", "argumint"] }
];

export default function SpellingChoicePractice() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index, choice) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [index]: choice }));
    }
  };

  const isCorrect = (index) => answers[index] === questions[index].word;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔍 Circle the Correct Spelling</h1>
      <p className={styles.subtitle}>Click the correct spelling of each word.</p>
      <div className={styles.quiz}>
        {questions.map((q, i) => (
          <div key={i} className={styles.question}>
            <span className={styles.qNumber}>{i + 1}.</span>
            <div className={styles.options}>
              {q.options.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => handleSelect(i, opt)}
                  className={`${styles.option} ${
                    submitted
                      ? opt === q.word
                        ? styles.correct
                        : (answers[i] === opt ? styles.incorrect : '')
                      : (answers[i] === opt ? styles.selected : '')
                  }`}
                  disabled={submitted}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button className={styles.submitButton} onClick={() => setSubmitted(true)}>
          Check Answers
        </button>
      ) : (
        <div className={styles.score}>
          Score: {Object.values(answers).filter((ans, i) => ans === questions[i].word).length} / {questions.length}
        </div>
      )}
    </div>
  );
}
