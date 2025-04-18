'use client';

import { useState } from 'react';
import { subjects } from './data/subjects';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

// 컴포넌트 동적 로딩
const SpellingWorksheet = dynamic(() => import('./subjects/english/Grade3/SpellingChapter/SpellingWorksheet').then(m => m.default));
const SpellingRepeatPractice = dynamic(() => import('./subjects/english/Grade3/SpellingChapter/SpellingRepeatPractice').then(m => m.default));
const SpellingChoicePractice = dynamic(() => import('./subjects/english/Grade3/SpellingChapter/SpellingChoicePractice').then(m => m.default));
const DictationPractice = dynamic(() => import('./subjects/english/Grade3/SpellingChapter/DictationPractice').then(m => m.default));
const NumberSplitPractice = dynamic(() => import('./subjects/math/Grade1/Addition/NumberSplitPractice').then(m => m.default));
const NumberCombinePractice = dynamic(() => import('./subjects/math/Grade1/Addition/NumberCombinePractice').then(m => m.default));
const SubtractionWithin9Practice = dynamic(() => import('./subjects/math/Grade1/Subtraction/SubtractionWithin9Practice').then(m => m.default));
const Multiplication2to5Practice = dynamic(() => import('./subjects/math/Grade2/Multiplication/Multiplication2to5Practice').then(m => m.default));
const Multiplication6to9Practice = dynamic(() => import('./subjects/math/Grade2/Multiplication/Multiplication6to9Practice').then(m => m.default));
const ScienceLeafQuiz = dynamic(() => import('./subjects/science/Grade3/LeafChapter/ScienceLeafQuiz').then(m => m.default));
const SocialRegionQuiz = dynamic(() => import('./subjects/social/Grade4/RegionInfo/SocialRegionQuiz').then(m => m.default));
const SocialTimeQuiz = dynamic(() => import('./subjects/social/Grade3/TimeFlow/SocialTimeQuiz').then(m => m.default));

export default function Home() {
  const [activeSubject, setActiveSubject] = useState('english');
  const [navStack, setNavStack] = useState([]);
  const currentSubject = subjects.find(s => s.id === activeSubject);
  const grades = currentSubject?.grades || [];

  const getComponent = (name) => {
    const map = {
      SpellingWorksheet,
      SpellingRepeatPractice,
      SpellingChoicePractice,
      DictationPractice,
      NumberSplitPractice,
      NumberCombinePractice,
      SubtractionWithin9Practice,
      Multiplication2to5Practice,
      Multiplication6to9Practice,
      ScienceLeafQuiz,
      SocialRegionQuiz,
      SocialTimeQuiz
    };
    return map[name];
  };

  const renderContent = () => {
    const current = navStack[navStack.length - 1];
    if (current) {
      const Component = current.component;
      return (
        <>
          <button onClick={() => setNavStack(prev => prev.slice(0, -1))} className="mb-4 text-blue-500 underline">← 뒤로가기</button>
          <Component {...(current.params || {})} />
        </>
      );
    }

    return (
      <div className={styles.chapterSelection}>
        <h2>{currentSubject.name} 학습을 선택하세요</h2>
        <div className={styles.chapterGrid}>
          {grades.map(grade =>
            grade.chapters.map(chapter => {
              const subChapters = chapter.subChapters;
              if (subChapters && subChapters.length > 0) {
                return subChapters.map(sub => {
                  const Component = getComponent(sub.component);
                  return (
                    <button
                      key={grade.id + chapter.id + sub.id}
                      className={styles.chapterCard}
                      onClick={() => setNavStack(prev => [...prev, { component: Component }])}
                    >
                      <div className={styles.chapterIcon}>{sub.icon}</div>
                      <h3>{grade.name} - {chapter.name} - {sub.name}</h3>
                      <p>{sub.description}</p>
                    </button>
                  );
                });
              }
              const Component = getComponent(chapter.component);
              return (
                <button
                  key={grade.id + chapter.id}
                  className={styles.chapterCard}
                  onClick={() => setNavStack(prev => [...prev, { component: Component }])}
                >
                  <div className={styles.chapterIcon}>{chapter.icon}</div>
                  <h3>{grade.name} - {chapter.name}</h3>
                  <p>{chapter.description}</p>
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="max-w-screen-lg mx-auto p-4">
          <div className={styles.contentContainer}>{renderContent()}</div>
        </div>
      </main>
      <BottomNav
        subjects={subjects}
        activeSubject={activeSubject}
        onSubjectChange={(subjectId) => {
          setActiveSubject(subjectId);
          setNavStack([]);
        }}
      />
    </>
  );
}
