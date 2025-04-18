// app/page.js
"use client";

import { useState, useRef } from 'react';

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

export default function Home() {
  const [currentWords, setCurrentWords] = useState(originalWords);
  const [studentName, setStudentName] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const nameInputRef = useRef(null);

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
    if (score === 100) return "Perfect! You've mastered these words!";
    if (score >= 80) return "Great job! Keep practicing the ones you missed.";
    if (score >= 60) return "Good effort! Some more practice will help.";
    return "Keep practicing! You'll get better with time.";
  };

  const getScoreClass = (score) => {
    if (score === 100) return "perfect";
    if (score >= 80) return "good";
    return "needs-practice";
  };

  return (
    <main className="min-h-screen">
      <div className="worksheet-container">
        <div className="worksheet-header">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Grade 3</h1>
            <h2 className="text-3xl font-bold">Spelling Words</h2>
          </div>
          <div className="week-circle">
            <span className="text-sm">Week</span>
            <span className="text-4xl">{currentWords === originalWords ? '32' : '33'}</span>
          </div>
          <h1 className="text-4xl font-bold ml-auto">Write the Missing Letters!</h1>
        </div>
        
        <div className="worksheet-content">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <label htmlFor="student-name" className="text-xl font-semibold">Name:</label>
              <input
                type="text"
                id="student-name"
                ref={nameInputRef}
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="border-b-2 border-gray-400 px-2 py-1 outline-none min-w-[300px]"
              />
            </div>
            <div className="flex gap-2">
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

          <div className="worksheet-row">
            <div className="column-1">
              {currentWords.slice(0, Math.ceil(currentWords.length / 2)).map((word) => (
                <div key={word.id} className="worksheet-item">
                  <span>{word.id}. {word.prefix}</span>
                  <input
                    type="text"
                    className={`missing-letter-input ${
                      showResults
                        ? results.detailedResults.find(r => r.id === word.id).isCorrect
                          ? 'correct'
                          : 'incorrect'
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
            <div className="column-2">
              {currentWords.slice(Math.ceil(currentWords.length / 2)).map((word) => (
                <div key={word.id} className="worksheet-item">
                  <span>{word.id}. {word.prefix}</span>
                  <input
                    type="text"
                    className={`missing-letter-input ${
                      showResults
                        ? results.detailedResults.find(r => r.id === word.id).isCorrect
                          ? 'correct'
                          : 'incorrect'
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
          </div>

          {!showResults ? (
            <div className="mt-8 flex justify-center">
              <button onClick={handleSubmit} className="submit-button">
                Check Answers
              </button>
            </div>
          ) : (
            <div className="mt-8">
              <div className={`result-message ${getScoreClass(results.score)}`}>
                {getScoreMessage(results.score)} Score: {results.score}% ({results.correctCount}/{results.totalQuestions})
              </div>
              
              {results.score < 100 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Correct answers for missed words:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {results.detailedResults.filter(r => !r.isCorrect).map(word => (
                      <li key={word.id} className="text-red-500">
                        {word.id}. {word.prefix}<strong>{word.answer}</strong>{word.suffix} 
                        {word.userAnswer && <span className="text-gray-500"> (your answer: {word.userAnswer})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-8 flex justify-center gap-4">
                <button 
                  onClick={() => {
                    setUserAnswers({});
                    setShowResults(false);
                  }} 
                  className="submit-button"
                >
                  Try Again
                </button>
                {currentWords === originalWords ? (
                  <button onClick={switchToAdditionalWords} className="practice-button">
                    Try Practice Words
                  </button>
                ) : (
                  <button onClick={switchToOriginalWords} className="practice-button">
                    Go Back to Original Words
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
