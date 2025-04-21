'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

const NumberCombinePractice = () => {
  // 두 수 모으기 문제 데이터 (위 두 수를 더하면 아래 수가 됨)
  const mathProblems = [
    { id: 1, top: { left: 6, right: 2 }, bottom: 8 },
    { id: 2, top: { left: 3, right: 5 }, bottom: 8 },
    { id: 3, top: { left: 4, right: 4 }, bottom: 8 },
    { id: 4, top: { left: 2, right: 6 }, bottom: 8 },
    { id: 5, top: { left: 4, right: 2 }, bottom: 6 },
    { id: 6, top: { left: 5, right: 1 }, bottom: 6 },
    { id: 7, top: { left: 2, right: 2 }, bottom: 4 },
    { id: 8, top: { left: 1, right: 1 }, bottom: 2 },
    { id: 9, top: { left: 3, right: 1 }, bottom: 4 },
    { id: 10, top: { left: 3, right: 5 }, bottom: 8 },
    { id: 11, top: { left: 2, right: 6 }, bottom: 8 },
    { id: 12, top: { left: 5, right: 4 }, bottom: 9 },
    { id: 13, top: { left: 6, right: 1 }, bottom: 7 },
    { id: 14, top: { left: 1, right: 5 }, bottom: 6 },
    { id: 15, top: { left: 1, right: 1 }, bottom: 2 },
    { id: 16, top: { left: 5, right: 4 }, bottom: 9 },
    { id: 17, top: { left: 2, right: 4 }, bottom: 6 },
    { id: 18, top: { left: 5, right: 4 }, bottom: 9 },
    { id: 19, top: { left: 3, right: 5 }, bottom: 8 },
    { id: 20, top: { left: 2, right: 1 }, bottom: 3 },
    { id: 21, top: { left: 4, right: 3 }, bottom: 7 },
    { id: 22, top: { left: 5, right: 3 }, bottom: 8 },
    { id: 23, top: { left: 2, right: 6 }, bottom: 8 },
    { id: 24, top: { left: 1, right: 8 }, bottom: 9 }
  ];

  // 추가 연습 문제
  const additionalProblems = [
    { id: 1, top: { left: 7, right: 3 }, bottom: 10 },
    { id: 2, top: { left: 6, right: 5 }, bottom: 11 },
    { id: 3, top: { left: 8, right: 4 }, bottom: 12 },
    { id: 4, top: { left: 9, right: 4 }, bottom: 13 },
    { id: 5, top: { left: 7, right: 7 }, bottom: 14 },
    { id: 6, top: { left: 9, right: 6 }, bottom: 15 },
    { id: 7, top: { left: 8, right: 8 }, bottom: 16 },
    { id: 8, top: { left: 9, right: 8 }, bottom: 17 },
    { id: 9, top: { left: 9, right: 9 }, bottom: 18 },
    { id: 10, top: { left: 2, right: 9 }, bottom: 11 },
    { id: 11, top: { left: 3, right: 9 }, bottom: 12 },
    { id: 12, top: { left: 7, right: 8 }, bottom: 15 }
  ];

  const [currentProblems, setCurrentProblems] = useState(mathProblems);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [mode, setMode] = useState("practice"); // practice: 연습 모드, test: 시험 모드

  // 각 문제의 정답과 입력 위치 패턴 정의
  const getAnswerPattern = (problemId) => {
    // 모든 문제에 고유한 패턴 할당
    // 1: 오른쪽 값만 정답(파란색), 2: 왼쪽 값만 정답, 3: 아래 값이 정답, 0: 모두 보임
    
    // 첫 문제는 오른쪽(2)만 파란색
    if (problemId === 1) return { left: false, right: true, bottom: false };
    
    // 이미지 2를 참고하여 패턴 정의
    // 파란색으로 표시된 값 패턴 (문제 ID에 따라 다른 위치)
    const bluePattern = {
      1: { left: false, right: true, bottom: false },
      2: { left: false, right: true, bottom: false },
      3: { left: false, right: true, bottom: false },
      4: { left: true, right: false, bottom: false },
      5: { left: true, right: false, bottom: false },
      6: { left: false, right: true, bottom: false },
      7: { left: false, right: false, bottom: true },
      8: { left: false, right: false, bottom: true },
      9: { left: true, right: false, bottom: false },
      10: { left: true, right: false, bottom: false },
      11: { left: false, right: false, bottom: true },
      12: { left: false, right: false, bottom: true },
      13: { left: false, right: false, bottom: true },
      14: { left: false, right: false, bottom: true },
      15: { left: false, right: true, bottom: false },
      16: { left: true, right: false, bottom: false },
      17: { left: true, right: false, bottom: false },
      18: { left: false, right: true, bottom: false },
      19: { left: false, right: false, bottom: true },
      20: { left: false, right: false, bottom: true },
      21: { left: false, right: true, bottom: false },
      22: { left: true, right: false, bottom: false },
      23: { left: false, right: true, bottom: false },
      24: { left: true, right: false, bottom: false }
    };

    return bluePattern[problemId] || { left: false, right: false, bottom: true };
  };

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
      const pattern = getAnswerPattern(problem.id);
      
      // 각 위치별 정답 여부 확인
      let leftCorrect = true;
      let rightCorrect = true;
      let bottomCorrect = true;
      
      if (mode === "practice") {
        // 연습 모드: 파란색으로 표시된 부분만 확인
        if (pattern.left) {
          leftCorrect = userAnswer.left === problem.top.left;
          if (userAnswer.left !== undefined) totalAnswers++;
        }
        if (pattern.right) {
          rightCorrect = userAnswer.right === problem.top.right;
          if (userAnswer.right !== undefined) totalAnswers++;
        }
        if (pattern.bottom) {
          bottomCorrect = userAnswer.bottom === problem.bottom;
          if (userAnswer.bottom !== undefined) totalAnswers++;
        }
      } else {
        // 시험 모드: 모든 입력 확인
        leftCorrect = userAnswer.left === problem.top.left;
        rightCorrect = userAnswer.right === problem.top.right;
        bottomCorrect = userAnswer.bottom === problem.bottom;
        totalAnswers += 3; // 각 문제당 3개의 입력
      }
      
      const isCorrect = leftCorrect && rightCorrect && bottomCorrect;
      
      // 정답 개수 계산
      if (mode === "practice") {
        if (pattern.left && leftCorrect) correctCount++;
        if (pattern.right && rightCorrect) correctCount++;
        if (pattern.bottom && bottomCorrect) correctCount++;
      } else {
        // 시험 모드에서는 모든 입력이 맞아야 함
        if (isCorrect) correctCount += 3;
      }
      
      return {
        ...problem,
        userLeft: userAnswer.left,
        userRight: userAnswer.right,
        userBottom: userAnswer.bottom,
        leftCorrect,
        rightCorrect,
        bottomCorrect,
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
    setMode(prevMode => prevMode === "practice" ? "test" : "practice");
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
    if (mode === "test") {
      return true; // 시험 모드에서는 모두 입력
    } else {
      const pattern = getAnswerPattern(problem.id);
      return pattern[position]; // 연습 모드에서는 파란색 위치만 입력
    }
  };

  // 숫자 표시 스타일 설정 (파란색 등)
  const getNumberDisplayClass = (problem, position) => {
    const pattern = getAnswerPattern(problem.id);
    if (pattern[position]) {
      return `${styles.numberDisplay} ${styles.studentFill}`; // 파란색 표시
    }
    return styles.numberDisplay;
  };

  // 값 가져오기 (left, right, bottom)
  const getValue = (problem, position) => {
    if (position === 'left') return problem.top.left;
    if (position === 'right') return problem.top.right;
    return problem.bottom;
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
          두 수를 모으기
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
              {mode === "practice" ? "시험 모드로" : "연습 모드로"}
            </button>
          </div>
        </div>

        <p className="text-xl font-medium mb-8">
          위에 있는 두 수를 모으면 아래에 있는 수가 됩니다. 빈 칸에 알맞은 수를 쓰세요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProblems.map((problem) => (
            <div key={problem.id} className={styles.numberCombineBox}>
              <div className={styles.problemNumber}>{problem.id}</div>
              <div className={styles.topContainer}>
                <div className={styles.topCell}>
                  {isStudentInput(problem, 'left') ? (
                    <input
                      type="text"
                      className={`${styles.numberInput} ${
                        showResults && results
                          ? userAnswers[problem.id]?.left === problem.top.left
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
                    />
                  ) : (
                    <span className={getNumberDisplayClass(problem, 'left')}>
                      {problem.top.left}
                    </span>
                  )}
                </div>
                <div className={styles.topCell}>
                  {isStudentInput(problem, 'right') ? (
                    <input
                      type="text"
                      className={`${styles.numberInput} ${
                        showResults && results
                          ? userAnswers[problem.id]?.right === problem.top.right
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
                    />
                  ) : (
                    <span className={getNumberDisplayClass(problem, 'right')}>
                      {problem.top.right}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.bottomContainer}>
                {isStudentInput(problem, 'bottom') ? (
                  <input
                    type="text"
                    className={`${styles.numberInput} ${
                      showResults && results
                        ? userAnswers[problem.id]?.bottom === problem.bottom
                          ? styles.correct
                          : userAnswers[problem.id]?.bottom !== undefined
                            ? styles.incorrect
                            : ''
                        : ''
                    }`}
                    value={userAnswers[problem.id]?.bottom || ''}
                    onChange={(e) => handleInputChange(problem.id, 'bottom', e.target.value)}
                    maxLength={2}
                    disabled={showResults}
                  />
                ) : (
                  <span className={getNumberDisplayClass(problem, 'bottom')}>
                    {problem.bottom}
                  </span>
                )}
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
                  {results.detailedResults.map(problem => {
                    const pattern = getAnswerPattern(problem.id);
                    if ((pattern.left && !problem.leftCorrect) || 
                        (pattern.right && !problem.rightCorrect) ||
                        (pattern.bottom && !problem.bottomCorrect)) {
                      return (
                        <li key={problem.id} className="text-red-500">
                          {problem.id}번: {problem.top.left} + {problem.top.right} = {problem.bottom}
                        </li>
                      );
                    }
                    return null;
                  }).filter(Boolean)}
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
              {mode === "practice" ? (
                <button onClick={toggleMode} className={`${styles.practiceButton} w-full sm:w-auto`}>
                  시험 모드로 연습하기
                </button>
              ) : (
                <button onClick={toggleMode} className={`${styles.practiceButton} w-full sm:w-auto`}>
                  연습 모드로 돌아가기
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberCombinePractice;