'use client';

import React, { useState, useEffect } from 'react';
import styles from './NumberSplitPractice.module.css';

const NumberSplitPractice = () => {
  // 두 수로 가르기 문제 데이터
  const mathProblems = [
    { id: 1, total: 7, left: 5, right: 2 },
    { id: 2, total: 8, left: 4, right: 4 },
    { id: 3, total: 6, left: 1, right: 5 },
    { id: 4, total: 7, left: 1, right: 6 },
    { id: 5, total: 5, left: 2, right: 3 },
    { id: 6, total: 9, left: 1, right: 8 },
    { id: 7, total: 4, left: 1, right: 3 },
    { id: 8, total: 9, left: 5, right: 4 },
    { id: 9, total: 7, left: 3, right: 4 },
    { id: 10, total: 6, left: 2, right: 4 },
    { id: 11, total: 2, left: 1, right: 1 },
    { id: 12, total: 9, left: 8, right: 1 },
    { id: 13, total: 6, left: 4, right: 2 },
    { id: 14, total: 8, left: 2, right: 6 },
    { id: 15, total: 5, left: 4, right: 1 },
    { id: 16, total: 6, left: 3, right: 3 },
    { id: 17, total: 9, left: 2, right: 7 },
    { id: 18, total: 6, left: 1, right: 5 },
    { id: 19, total: 9, left: 7, right: 2 },
    { id: 20, total: 9, left: 6, right: 3 },
    { id: 21, total: 8, left: 2, right: 6 },
    { id: 22, total: 8, left: 4, right: 4 },
    { id: 23, total: 9, left: 2, right: 7 },
    { id: 24, total: 8, left: 6, right: 2 },
  ];

  // 추가 연습 문제
  const additionalProblems = [
    { id: 1, total: 10, left: 7, right: 3 },
    { id: 2, total: 10, left: 5, right: 5 },
    { id: 3, total: 11, left: 6, right: 5 },
    { id: 4, total: 12, left: 8, right: 4 },
    { id: 5, total: 13, left: 9, right: 4 },
    { id: 6, total: 14, left: 7, right: 7 },
    { id: 7, total: 15, left: 9, right: 6 },
    { id: 8, total: 16, left: 8, right: 8 },
    { id: 9, total: 17, left: 9, right: 8 },
    { id: 10, total: 18, left: 9, right: 9 },
    { id: 11, total: 11, left: 2, right: 9 },
    { id: 12, total: 12, left: 3, right: 9 },
  ];

  const [currentProblems, setCurrentProblems] = useState(mathProblems);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [mode, setMode] = useState("blank"); // 기본값을 blank 모드로 변경 (complete: 채우기, blank: 빈칸)

  // 입력값 변경 처리
  const handleInputChange = (id, position, value) => {
    const numValue = value === "" ? "" : parseInt(value, 10) || 0;
    
    setUserAnswers(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [position]: numValue
      }
    }));
  };

  // 제출 처리
  const handleSubmit = () => {
    let correctCount = 0;
    let totalAnswers = 0;
    
    const detailedResults = currentProblems.map(problem => {
      const userAnswer = userAnswers[problem.id] || {};
      
      // 모드에 따라 체크할 항목 결정
      let leftCorrect = true;
      let rightCorrect = true;
      
      if (mode === "complete") {
        // 양쪽 다 채워져 있는지 확인
        leftCorrect = userAnswer.left === problem.left;
        rightCorrect = userAnswer.right === problem.right;
      } else {
        // 각 문제마다 빈칸 위치가 다름 - 첫 번째 문제는 답이 표시되어 있고, 나머지는 한쪽만 빈칸
        if (problem.id === 1) {
          // 1번 문제는 정답이 표시되어 있으므로 체크하지 않음
          leftCorrect = true;
          rightCorrect = true;
        } else if (problem.id % 2 === 0) {
          // 짝수 번호는 오른쪽이 빈칸
          leftCorrect = true; // 왼쪽은 보여주므로 항상 맞음
          rightCorrect = userAnswer.right === problem.right;
          if (userAnswer.right !== undefined) totalAnswers++;
        } else {
          // 홀수 번호는 왼쪽이 빈칸
          leftCorrect = userAnswer.left === problem.left;
          rightCorrect = true; // 오른쪽은 보여주므로 항상 맞음
          if (userAnswer.left !== undefined) totalAnswers++;
        }
      }
      
      const isCorrect = leftCorrect && rightCorrect;
      
      // 모드에 따라 정답 개수 계산
      if (mode === "complete") {
        if (isCorrect) correctCount++;
        totalAnswers++;
      } else {
        if (problem.id === 1) {
          // 1번 문제는 정답 예시이므로 계산에서 제외
        } else if ((problem.id % 2 === 0 && rightCorrect) || 
            (problem.id % 2 !== 0 && leftCorrect)) {
          correctCount++;
        }
      }
      
      return {
        ...problem,
        userLeft: userAnswer.left !== undefined ? userAnswer.left : "",
        userRight: userAnswer.right !== undefined ? userAnswer.right : "",
        leftCorrect,
        rightCorrect,
        isCorrect
      };
    });
    
    // 점수 계산
    const score = totalAnswers > 0 ? Math.round((correctCount / totalAnswers) * 100) : 0;
    
    setResults({
      score,
      correctCount,
      totalAnswers,
      detailedResults
    });
    
    setShowResults(true);
  };

  // 모드 전환
  const toggleMode = () => {
    setMode(prevMode => prevMode === "complete" ? "blank" : "complete");
    setUserAnswers({});
    setResults(null);
    setShowResults(false);
  };

  // 문제 세트 전환
  const switchProblemSet = (set) => {
    setCurrentProblems(set === "original" ? mathProblems : additionalProblems);
    setUserAnswers({});
    setResults(null);
    setShowResults(false);
  };

  // 점수 메시지
  const getScoreMessage = (score) => {
    if (score === 100) return "완벽해요! 모든 문제를 맞혔어요!";
    if (score >= 80) return "잘했어요! 조금만 더 연습하면 완벽할 거예요.";
    if (score >= 60) return "좋은 노력이에요! 더 연습해볼까요?";
    return "계속 연습하면 더 잘할 수 있을 거예요!";
  };

  // 점수 클래스
  const getScoreClass = (score) => {
    if (score === 100) return styles.perfect;
    if (score >= 80) return styles.good;
    return styles.needsPractice;
  };

  // 학생이 입력해야 하는 칸인지 확인
  const isStudentInput = (problem, position) => {
    if (mode === "complete") {
      return true; // 완성 모드에서는 항상 입력
    } else {
      if (problem.id === 1) {
        return false; // 1번 문제는 예시로 모두 표시
      } else if (position === 'left') {
        return problem.id % 2 !== 0; // 홀수 문제는 왼쪽이 빈칸
      } else {
        return problem.id % 2 === 0; // 짝수 문제는 오른쪽이 빈칸
      }
    }
  };

  // 숫자 표시 스타일 설정 (파란색 등)
  const getNumberDisplayClass = (problem, position) => {
    if (problem.id === 1 && position === 'right') {
      return `${styles.numberDisplay} ${styles.studentFill}`; // 1번 문제 오른쪽(정답 2)는 파란색
    }
    return styles.numberDisplay;
  };

  return (
    <div className={styles.mathWorksheetContainer}>
      <div className={`${styles.worksheetHeader} flex flex-col sm:flex-row items-center gap-4`}>
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">1학년 1학기</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">3. 덧셈과 뺄셈</h2>
        </div>
        <div className={styles.subjectBadge + " shrink-0"}>
          <span className="text-2xl">일일수학</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left sm:ml-auto">
          {mode === "complete" ? "두 수로 가르기" : "빈 칸에 알맞은 수 쓰기"}
        </h1>
      </div>
      
      <div className={styles.worksheetContent}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-start sm:items-center gap-2">
            <label htmlFor="student-name" className="text-xl font-semibold">이름:</label>
            <input
              type="text"
              id="student-name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="border-b-2 border-gray-400 px-2 py-1 outline-none w-full sm:w-auto sm:min-w-[200px]"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button 
              onClick={() => switchProblemSet("original")}
              className={`px-3 py-1 rounded ${currentProblems === mathProblems ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              기본 문제
            </button>
            <button 
              onClick={() => switchProblemSet("additional")}
              className={`px-3 py-1 rounded ${currentProblems === additionalProblems ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              도전 문제
            </button>
            <button 
              onClick={toggleMode}
              className="px-3 py-1 rounded bg-purple-500 text-white"
            >
              {mode === "complete" ? "빈칸 모드로" : "가르기 모드로"}
            </button>
          </div>
        </div>

        <p className="text-xl font-medium mb-8">
          다음은 위에 적힌 수를 아래의 두 수로 가른 것입니다. 빈 칸에 알맞은 수를 쓰세요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProblems.map((problem) => (
            <div key={problem.id} className={styles.numberSplitBox}>
              <div className={styles.problemNumber}>{problem.id}</div>
              <div className={styles.totalNumber}>{problem.total}</div>
              <div className={styles.splitContainer}>
                <div className={styles.splitCell}>
                  {isStudentInput(problem, 'left') ? (
                    <input
                      type="text"
                      className={`${styles.numberInput} ${
                        showResults && results
                          ? userAnswers[problem.id]?.left === problem.left
                            ? styles.correct
                            : userAnswers[problem.id]?.left !== undefined
                              ? styles.incorrect
                              : ''
                          : ''
                      }`}
                      value={userAnswers[problem.id]?.left || ''}
                      onChange={(e) => handleInputChange(problem.id, 'left', e.target.value)}
                      maxLength={2}
                      disabled={showResults}
                      placeholder={problem.id === 1 ? problem.left.toString() : ''}
                    />
                  ) : (
                    <span className={getNumberDisplayClass(problem, 'left')}>{problem.left}</span>
                  )}
                </div>
                <div className={styles.splitCell}>
                  {isStudentInput(problem, 'right') ? (
                    <input
                      type="text"
                      className={`${styles.numberInput} ${
                        showResults && results
                          ? userAnswers[problem.id]?.right === problem.right
                            ? styles.correct
                            : userAnswers[problem.id]?.right !== undefined
                              ? styles.incorrect
                              : ''
                          : ''
                      }`}
                      value={userAnswers[problem.id]?.right || ''}
                      onChange={(e) => handleInputChange(problem.id, 'right', e.target.value)}
                      maxLength={2}
                      disabled={showResults}
                      placeholder={problem.id === 1 ? problem.right.toString() : ''}
                    />
                  ) : (
                    <span className={getNumberDisplayClass(problem, 'right')}>{problem.right}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showResults ? (
          <div className="mt-8 flex justify-center">
            <button onClick={handleSubmit} className={styles.submitButton}>
              정답 확인하기
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div className={`${styles.resultMessage} ${getScoreClass(results.score)}`}>
              {getScoreMessage(results.score)} 점수: {results.score}% ({results.correctCount}/{results.totalAnswers})
            </div>
            
            {results.score < 100 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">틀린 문제 정답:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {results.detailedResults
                    .filter(r => !r.isCorrect && r.id !== 1) // 1번 문제는 예시이므로 제외
                    .map(problem => (
                      <li key={problem.id} className="text-red-500">
                        {problem.id}번: {problem.total} = {problem.left} + {problem.right}
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
                다시 풀기
              </button>
              {mode === "complete" ? (
                <button onClick={toggleMode} className={`${styles.practiceButton} w-full sm:w-auto`}>
                  빈칸 모드로 연습하기
                </button>
              ) : (
                <button onClick={toggleMode} className={`${styles.practiceButton} w-full sm:w-auto`}>
                  가르기 모드로 연습하기
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberSplitPractice;