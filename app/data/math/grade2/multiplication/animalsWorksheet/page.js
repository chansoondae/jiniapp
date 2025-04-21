'use client';

import { useState } from 'react';
import styles from './page.module.css';

// 메타데이터 선언 및 export
export const META = {
  title: "동물 수학 문제",
  grade: "1-2학년",
  category: "수학/곱셈과 덧셈",
  icon: "🐞",
  generatedFrom: "animals-worksheet.jpg",
  lastUpdated: "2025-04-20"
};

export default function AnimalsWorksheet() {
  // 정답 상태 관리
  const [answers, setAnswers] = useState({
    '1a': '',
    '1b': '',
    '2a': '',
    '2b': '',
    '3a': '',
    '3b': '',
    '4a': '',
    '4b': ''
  });
  const [submitted, setSubmitted] = useState(false);

  // 정답 키 (실제 정답)
  const correctAnswers = {
    '1a': '36',   // 12 무당벌레 x 3 점 = 36점
    '1b': '18',   // (12-6) 무당벌레 x 3 점 = 18점
    '2a': '66',   // 33 나비 x 2 안테나 = 66 안테나
    '2b': '132',  // (33+33) 나비 x 2 안테나 = 132 안테나
    '3a': '32',   // 16쌍 x 2 = 32 눈
    '3b': '9',    // (50-32)/2 = 9 원숭이
    '4a': '48',   // 12 소 x 4 발굽 = 48 발굽
    '4b': '40'    // 10 소 x 4 발굽 = 40 발굽
  };
  
  // 문제 해설
  const explanations = {
    '1a': '12마리의 무당벌레가 있고, 각각 3개의 점이 있으므로 총 점의 수는 12 × 3 = 36개입니다.',
    '1b': '처음에는 12마리의 무당벌레가 있었고, 6마리가 날아갔으므로 남은 무당벌레는 12 - 6 = 6마리입니다. 각 무당벌레는 3개의 점이 있으므로 남은 점의 수는 6 × 3 = 18개입니다.',
    '2a': '나비집에 33마리의 나비가 있고, 각 나비는 2개의 더듬이가 있으므로 총 더듬이 수는 33 × 2 = 66개입니다.',
    '2b': '처음에 있던 33마리에 새로 33마리가 합류했으므로 총 66마리의 나비가 있습니다. 각 나비는 2개의 더듬이가 있으므로 총 더듬이 수는 66 × 2 = 132개입니다.',
    '3a': '16쌍의 눈이 있다는 것은 16개의 쌍을 의미합니다. 각 쌍은 2개의 눈으로 이루어져 있으므로 총 눈의 수는 16 × 2 = 32개입니다.',
    '3b': '처음에는 32개의 눈이 있었고(16쌍), 나중에는 총 50개의 눈이 되었습니다. 추가된 눈의 수는 50 - 32 = 18개입니다. 각 원숭이는 2개의 눈을 가지므로, 추가된 원숭이 수는 18 ÷ 2 = 9마리입니다.',
    '4a': '12마리의 소가 있고, 각 소는 4개의 발굽을 가지고 있으므로 총 발굽의 수는 12 × 4 = 48개입니다.',
    '4b': '다음 목장에는 10마리의 소가 있고, 각 소는 4개의 발굽을 가지고 있으므로 총 발굽의 수는 10 × 4 = 40개입니다.'
  };

  // 입력 변경 처리
  const handleChange = (id, value) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setAnswers(prev => ({ ...prev, [id]: numValue }));
  };

  // 점수 계산
  const getScore = () => {
    return Object.keys(correctAnswers).reduce((score, key) => {
      return answers[key] === correctAnswers[key] ? score + 1 : score;
    }, 0);
  };

  // 퀴즈 리셋
  const resetQuiz = () => {
    setAnswers({
      '1a': '',
      '1b': '',
      '2a': '',
      '2b': '',
      '3a': '',
      '3b': '',
      '4a': '',
      '4b': ''
    });
    setSubmitted(false);
    
    // 스크롤을 페이지 맨 위로 이동
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Animals</h1>

      <div className={styles.worksheetGrid}>
        {/* 문제 1: 무당벌레 */}
        <div className={styles.questionBox}>
          <div className={styles.imageContainer}>
            <div className={styles.ladybugContainer}>
              {[...Array(7)].map((_, i) => (
                <div key={`ladybug-${i}`} className={styles.ladybug}>
                  <div className={styles.ladybugBody}>
                    <div className={styles.ladybugSpot}></div>
                    <div className={styles.ladybugSpot}></div>
                    <div className={styles.ladybugSpot}></div>
                  </div>
                  <div className={styles.ladybugHead}></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.questionContent}>
            <h3>1. Pajeet found <span className={styles.highlight}>12</span> ladybirds. Each one had <span className={styles.highlight}>3</span> spots.</h3>
            
            <div className={styles.subQuestion}>
              <p className={styles.subQuestionText}>a. How many spots were there?</p>
              <div className={styles.answerBox}>
                <input 
                  type="text" 
                  value={answers['1a']} 
                  onChange={(e) => handleChange('1a', e.target.value)}
                  className={`${styles.answerInput} ${
                    submitted 
                      ? (answers['1a'] === correctAnswers['1a'] 
                        ? styles.correct 
                        : styles.incorrect) 
                      : ''
                  }`}
                  disabled={submitted}
                />
                <span className={styles.answerLabel}>spots</span>
                {submitted && answers['1a'] !== correctAnswers['1a'] && (
                  <div className={styles.correctAnswerContainer}>
                    <div className={styles.correctAnswer}>정답: {correctAnswers['1a']}</div>
                    <div className={styles.explanation}>{explanations['1a']}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.subQuestion}>
              <p className={styles.subQuestionText}>b. If <span className={styles.highlight}>6</span> ladybirds flew away how many spots would there be then?</p>
              <div className={styles.answerBox}>
                <input 
                  type="text" 
                  value={answers['1b']} 
                  onChange={(e) => handleChange('1b', e.target.value)}
                  className={`${styles.answerInput} ${
                    submitted 
                      ? (answers['1b'] === correctAnswers['1b'] 
                        ? styles.correct 
                        : styles.incorrect) 
                      : ''
                  }`}
                  disabled={submitted}
                />
                <span className={styles.answerLabel}>spots</span>
                {submitted && answers['1b'] !== correctAnswers['1b'] && (
                  <div className={styles.correctAnswerContainer}>
                    <div className={styles.correctAnswer}>정답: {correctAnswers['1b']}</div>
                    <div className={styles.explanation}>{explanations['1b']}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 문제 2: 나비 */}
        <div className={styles.questionBox}>
          <div className={styles.imageContainer}>
            <div className={styles.butterflyContainer}>
              {[...Array(6)].map((_, i) => (
                <div key={`butterfly-${i}`} className={styles.butterfly}>
                  <div className={styles.butterflyWings}></div>
                  <div className={styles.butterflyBody}></div>
                  <div className={styles.butterflyAntenna1}></div>
                  <div className={styles.butterflyAntenna2}></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.questionContent}>
            <h3>2. Each butterfly has <span className={styles.highlight}>2</span> antennae.</h3>
            
            <div className={styles.subQuestion}>
              <p className={styles.subQuestionText}>a. In the butterfly house we saw <span className={styles.highlight}>33</span> butterflies.<br/>How many antennae were there?</p>
              <div className={styles.answerBox}>
                <input 
                  type="text" 
                  value={answers['2a']} 
                  onChange={(e) => handleChange('2a', e.target.value)}
                  className={`${styles.answerInput} ${
                    submitted 
                      ? (answers['2a'] === correctAnswers['2a'] 
                        ? styles.correct 
                        : styles.incorrect) 
                      : ''
                  }`}
                  disabled={submitted}
                />
                <span className={styles.answerLabel}>antennae</span>
                {submitted && answers['2a'] !== correctAnswers['2a'] && (
                  <div className={styles.correctAnswerContainer}>
                    <div className={styles.correctAnswer}>정답: {correctAnswers['2a']}</div>
                    <div className={styles.explanation}>{explanations['2a']}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.subQuestion}>
              <p className={styles.subQuestionText}>b. If these were joined by another <span className={styles.highlight}>33</span> butterflies, how many antennae would there be then?</p>
              <div className={styles.answerBox}>
                <input 
                  type="text" 
                  value={answers['2b']} 
                  onChange={(e) => handleChange('2b', e.target.value)}
                  className={`${styles.answerInput} ${
                    submitted 
                      ? (answers['2b'] === correctAnswers['2b'] 
                        ? styles.correct 
                        : styles.incorrect) 
                      : ''
                  }`}
                  disabled={submitted}
                />
                <span className={styles.answerLabel}>antennae</span>
                {submitted && answers['2b'] !== correctAnswers['2b'] && (
                  <div className={styles.correctAnswerContainer}>
                    <div className={styles.correctAnswer}>정답: {correctAnswers['2b']}</div>
                    <div className={styles.explanation}>{explanations['2b']}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 문제 3: 원숭이 */}
        <div className={styles.questionBox}>
          <div className={styles.imageContainer}>
            <div className={styles.monkeyContainer}>
              {[...Array(4)].map((_, i) => (
                <div key={`monkey-${i}`} className={styles.monkey}>
                  <div className={styles.monkeyFace}>
                    <div className={styles.monkeyEyes}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.questionContent}>
            <h3>3. Ria could see <span className={styles.highlight}>16</span> pairs of eyes staring at her.</h3>
            
            <div className={styles.subQuestion}>
              <p className={styles.subQuestionText}>a. How many eyes were there?</p>
              <div className={styles.answerBox}>
                <input 
                  type="text" 
                  value={answers['3a']} 
                  onChange={(e) => handleChange('3a', e.target.value)}
                  className={`${styles.answerInput} ${
                    submitted 
                      ? (answers['3a'] === correctAnswers['3a'] 
                        ? styles.correct 
                        : styles.incorrect) 
                      : ''
                  }`}
                  disabled={submitted}
                />
                <span className={styles.answerLabel}>eyes</span>
                {submitted && answers['3a'] !== correctAnswers['3a'] && (
                  <div className={styles.correctAnswerContainer}>
                    <div className={styles.correctAnswer}>정답: {correctAnswers['3a']}</div>
                    <div className={styles.explanation}>{explanations['3a']}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.subQuestion}>
              <p className={styles.subQuestionText}>b. How many more monkeys came to make a total of <span className={styles.highlight}>50</span> eyes?</p>
              <div className={styles.answerBox}>
                <input 
                  type="text" 
                  value={answers['3b']} 
                  onChange={(e) => handleChange('3b', e.target.value)}
                  className={`${styles.answerInput} ${
                    submitted 
                      ? (answers['3b'] === correctAnswers['3b'] 
                        ? styles.correct 
                        : styles.incorrect) 
                      : ''
                  }`}
                  disabled={submitted}
                />
                <span className={styles.answerLabel}>monkeys</span>
                {submitted && answers['3b'] !== correctAnswers['3b'] && (
                  <div className={styles.correctAnswerContainer}>
                    <div className={styles.correctAnswer}>정답: {correctAnswers['3b']}</div>
                    <div className={styles.explanation}>{explanations['3b']}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 문제 4: 소 */}
        <div className={styles.questionBox}>
          <div className={styles.imageContainer}>
            <div className={styles.cowContainer}>
              <div className={styles.cow}>
                <div className={styles.cowBody}></div>
                <div className={styles.cowHead}></div>
                <div className={styles.cowLegs}></div>
              </div>
              <div className={styles.farmer}></div>
            </div>
          </div>
          
          <div className={styles.questionContent}>
            <h3>4. Bert checked his <span className={styles.highlight}>12</span> cows' hooves.</h3>
            
            <div className={styles.subQuestion}>
              <p className={styles.subQuestionText}>a. How many hooves did he check?</p>
              <div className={styles.answerBox}>
                <input 
                  type="text" 
                  value={answers['4a']} 
                  onChange={(e) => handleChange('4a', e.target.value)}
                  className={`${styles.answerInput} ${
                    submitted 
                      ? (answers['4a'] === correctAnswers['4a'] 
                        ? styles.correct 
                        : styles.incorrect) 
                      : ''
                  }`}
                  disabled={submitted}
                />
                <span className={styles.answerLabel}>hooves</span>
                {submitted && answers['4a'] !== correctAnswers['4a'] && (
                  <div className={styles.correctAnswerContainer}>
                    <div className={styles.correctAnswer}>정답: {correctAnswers['4a']}</div>
                    <div className={styles.explanation}>{explanations['4a']}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.subQuestion}>
              <p className={styles.subQuestionText}>b. How many hooves did Bert check in the next field of <span className={styles.highlight}>10</span> cows?</p>
              <div className={styles.answerBox}>
                <input 
                  type="text" 
                  value={answers['4b']} 
                  onChange={(e) => handleChange('4b', e.target.value)}
                  className={`${styles.answerInput} ${
                    submitted 
                      ? (answers['4b'] === correctAnswers['4b'] 
                        ? styles.correct 
                        : styles.incorrect) 
                      : ''
                  }`}
                  disabled={submitted}
                />
                <span className={styles.answerLabel}>hooves</span>
                {submitted && answers['4b'] !== correctAnswers['4b'] && (
                  <div className={styles.correctAnswerContainer}>
                    <div className={styles.correctAnswer}>정답: {correctAnswers['4b']}</div>
                    <div className={styles.explanation}>{explanations['4b']}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        {!submitted ? (
          <button 
            className={styles.submitButton} 
            onClick={() => setSubmitted(true)}
          >
            정답 확인
          </button>
        ) : (
          <>
            <div className={styles.scoreDisplay}>
              총 점수: {getScore()} / 8
            </div>
            <button 
              className={styles.resetButton} 
              onClick={resetQuiz}
            >
              다시 풀기
            </button>
          </>
        )}
      </div>
    </div>
  );
}