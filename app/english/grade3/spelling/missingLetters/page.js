'use client';

import { useState, useRef } from 'react';
import styles from './page.module.css';

// Define original worksheet words
const originalWords = [
  { id: 1, prefix: "myste", suffix: "y", answer: "r" },
  { id: 2, prefix: "pen", suffix: "y", answer: "n" },
  { id: 3, prefix: "penn", suffix: "s", answer: "ie" },
  { id: 4, prefix: "em", suffix: "ty", answer: "p" },
  { id: 5, prefix: "arg", suffix: "ment", answer: "u" },
  { id: 6, prefix: "verdi", suffix: "", answer: "ct" },
  { id: 7, prefix: "gu", suffix: "lty", answer: "i" },
  { id: 8, prefix: "empt", suffix: "ed", answer: "i" },
  { id: 9, prefix: "mar", suffix: "ied", answer: "r" },
  { id: 10, prefix: "part", suffix: "es", answer: "i" },
  { id: 11, prefix: "famili", suffix: "s", answer: "e" },
  { id: 12, prefix: "d", suffix: "scovery", answer: "i" },
  { id: 13, prefix: "j", suffix: "ry", answer: "u" },
  { id: 14, prefix: "carr", suffix: "ed", answer: "i" },
  { id: 15, prefix: "law", suffix: "er", answer: "y" },
  { id: 16, prefix: "mysteri", suffix: "s", answer: "ou" }
];

// Define additional practice words
const additionalWords = [
  { id: 1, prefix: "visi", suffix: "tor", answer: "t" },
  { id: 2, prefix: "sur", suffix: "ve", answer: "vi" },
  { id: 3, prefix: "blo", suffix: "om", answer: "ss" },
  { id: 4, prefix: "hap", suffix: "ness", answer: "pi" },
  { id: 5, prefix: "po", suffix: "er", answer: "w" },
  { id: 6, prefix: "ex", suffix: "ite", answer: "c" },
  { id: 7, prefix: "trav", suffix: "l", answer: "e" },
  { id: 8, prefix: "uni", suffix: "orm", answer: "f" },
  { id: 9, prefix: "vill", suffix: "ge", answer: "a" },
  { id: 10, prefix: "batt", suffix: "ry", answer: "e" }
];

export default function SpellingWorksheet() {
  const [currentWords, setCurrentWords] = useState(originalWords);
  const [studentName, setStudentName] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const nameInputRef = useRef(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleInputChange = (id, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let totalQuestions = currentWords.length;
    
    const detailedResults = currentWords.map(word => {
      const isCorrect = userAnswers[word.id]?.toLowerCase() === word.answer.toLowerCase();
      if (isCorrect) correctCount++;
      
      return {
        ...word,
        userAnswer: userAnswers[word.id] || "",
        isCorrect
      };
    });
    
    const score = Math.round((correctCount / totalQuestions) * 100);
    
    setResults({
      score,
      correctCount,
      totalQuestions,
      detailedResults
    });
    
    setShowResults(true);
    
    // 100점이면 축하 효과 보여주기
    if (score === 100) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
    
    // 모바일에서 결과로 스크롤
    if (window.innerWidth < 768) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const switchToAdditionalWords = () => {
    setCurrentWords(additionalWords);
    setUserAnswers({});
    setResults(null);
    setShowResults(false);
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  const switchToOriginalWords = () => {
    setCurrentWords(originalWords);
    setUserAnswers({});
    setResults(null);
    setShowResults(false);
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  const getScoreMessage = (score) => {
    if (score === 100) return "완벽해요! 모든 단어를 마스터했어요!";
    if (score >= 80) return "잘했어요! 틀린 단어만 좀 더 연습해보세요.";
    if (score >= 60) return "좋은 노력이에요! 더 연습하면 더 좋아질 거예요.";
    return "계속 연습하세요! 시간이 지나면 더 잘할 수 있을 거예요.";
  };

  const getScoreClass = (score) => {
    if (score === 100) return styles.perfect;
    if (score >= 80) return styles.good;
    return styles.needsPractice;
  };

  // 별 생성 함수
  const renderStars = () => {
    if (!showCelebration) return null;
    
    const stars = [];
    for (let i = 0; i < 30; i++) {
      const left = `${Math.random() * 100}%`;
      const animationDelay = `${Math.random() * 2}s`;
      stars.push(
        <div 
          key={i} 
          className={styles.star} 
          style={{ 
            left, 
            animationDelay,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
          }}
        />
      );
    }
    
    return <div className={styles.celebration}>{stars}</div>;
  };

  return (
    <div className={styles.worksheetContainer}>
      <div className={`${styles.worksheetHeader} flex flex-col sm:flex-row items-center gap-4`}>
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">Grade 3</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Spelling Words</h2>
        </div>
        <div className={`${styles.weekCircle} shrink-0`}>
          <span className="text-sm">Week</span>
          <span className="text-4xl">{currentWords === originalWords ? '32' : '33'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left sm:ml-auto">Write the Missing Letters!</h1>
      </div>
      
      <div className={styles.worksheetContent}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-start sm:items-center gap-2">
            <label htmlFor="student-name" className="text-xl font-semibold">Name:</label>
            <input
              type="text"
              id="student-name"
              ref={nameInputRef}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="border-b-2 border-gray-400 px-2 py-1 outline-none w-full sm:min-w-[300px]"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button 
              onClick={switchToOriginalWords}
              className={`px-3 py-1 rounded ${currentWords === originalWords ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Original Words
            </button>
            <button 
              onClick={switchToAdditionalWords}
              className={`px-3 py-1 rounded ${currentWords === additionalWords ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Practice Words
            </button>
          </div>
        </div>

        <p className="text-xl font-medium mb-8">Write the missing letter or letters in the blank to make the correct word.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentWords.map((word) => (
            <div key={word.id} className={styles.worksheetItem}>
              <span>{word.id}. {word.prefix}</span>
              <input
                type="text"
                className={`${styles.missingLetterInput} ${
                  showResults
                    ? results.detailedResults.find(r => r.id === word.id).isCorrect
                      ? styles.correct
                      : styles.incorrect
                    : ''
                }`}
                value={userAnswers[word.id] || ''}
                onChange={(e) => handleInputChange(word.id, e.target.value)}
                maxLength={word.answer.length}
                disabled={showResults}
              />
              <span>{word.suffix}</span>
            </div>
          ))}
        </div>

        {!showResults ? (
          <div className="mt-8 flex justify-center">
            <button onClick={handleSubmit} className={styles.submitButton}>
              Check Answers
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div className={`${styles.resultMessage} ${getScoreClass(results.score)}`}>
              {getScoreMessage(results.score)} Score: {results.score}% ({results.correctCount}/{results.totalQuestions})
            </div>
            
            {results.score < 100 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Correct answers for missed words:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {results.detailedResults.filter(r => !r.isCorrect).map(word => (
                    <li key={word.id} className="text-red-500">
                      {word.id}. {word.prefix}<strong>{word.answer}</strong>{word.suffix} 
                      {word.userAnswer && <span className="text-gray-500"> (your answer: {word.userAnswer})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => {
                  setUserAnswers({});
                  setShowResults(false);
                }} 
                className={`${styles.submitButton} w-full sm:w-auto`}
              >
                Try Again
              </button>
              {currentWords === originalWords ? (
                <button onClick={switchToAdditionalWords} className={`${styles.practiceButton} w-full sm:w-auto`}>
                  Try Practice Words
                </button>
              ) : (
                <button onClick={switchToOriginalWords} className={`${styles.practiceButton} w-full sm:w-auto`}>
                  Go Back to Original Words
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {showResults && results.score >= 80 && (
        <div className={`${styles.characterFeedback} ${
          results.score === 100 
            ? styles.characterPerfect 
            : results.score >= 80 
              ? styles.characterGood 
              : styles.characterPractice
        }`}>
          {results.score === 100 ? '🌟' : (results.score >= 80 ? '👍' : '✏️')}
        </div>
      )}
      
      {renderStars()}
    </div>
  );
}