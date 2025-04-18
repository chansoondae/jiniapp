'use client';

import { useState } from 'react';
import { subjects } from './data/subjects';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

// 동적으로 컴포넌트 불러오기
const SpellingWorksheet = dynamic(() => import('./subjects/english/Grade3/SpellingChapter/SpellingWorksheet'));
const NumberSplitPractice = dynamic(() => import('./subjects/math/Grade1/Addition/NumberSplitPractice'));
const NumberCombinePractice = dynamic(() => import('./subjects/math/Grade1/Addition/NumberCombinePractice'));

export default function Home() {
  const [activeSubject, setActiveSubject] = useState('english');
  const [activeGrade, setActiveGrade] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeSubChapter, setActiveSubChapter] = useState(null);
  
  // 현재 선택된 과목 데이터
  const currentSubject = subjects.find(s => s.id === activeSubject);
  
  // 해당 과목의 학년 목록
  const grades = currentSubject?.grades || [];
  
  // 선택된 학년의 챕터 목록
  const chapters = activeGrade 
    ? grades.find(g => g.id === activeGrade)?.chapters || []
    : [];
  
  // 선택된 챕터의 서브챕터 목록 (있는 경우)
  const subChapters = activeChapter && chapters.find(c => c.id === activeChapter)?.subChapters;
  
  // 렌더링할 컴포넌트 결정
  const renderContent = () => {
    // 학년을 선택하지 않은 경우
    if (!activeGrade) {
      return (
        <div className={styles.gradeSelection}>
          <h2>학년을 선택하세요</h2>
          <div className={styles.gradeGrid}>
            {grades.map(grade => (
              <button 
                key={grade.id}
                className={styles.gradeCard}
                onClick={() => setActiveGrade(grade.id)}
              >
                <div className={styles.gradeIcon}>{grade.id.includes('1') ? '1️⃣' : '3️⃣'}</div>
                <h3>{grade.name}</h3>
              </button>
            ))}
          </div>
        </div>
      );
    }
    
    // 챕터를 선택하지 않은 경우
    if (!activeChapter) {
      return (
        <div className={styles.chapterSelection}>
          <h2>{grades.find(g => g.id === activeGrade).name} 챕터를 선택하세요</h2>
          <div className={styles.chapterGrid}>
            {chapters.map(chapter => (
              <button 
                key={chapter.id}
                className={styles.chapterCard}
                onClick={() => setActiveChapter(chapter.id)}
              >
                <div className={styles.chapterIcon}>{chapter.icon || '📚'}</div>
                <h3>{chapter.name}</h3>
                <p>{chapter.description || '재미있게 배우는 ' + chapter.name}</p>
              </button>
            ))}
          </div>
        </div>
      );
    }
    
    // 서브챕터가 있고 서브챕터를 선택하지 않은 경우
    if (subChapters && !activeSubChapter) {
      return (
        <div className={styles.subChapterSelection}>
          <h2>{chapters.find(c => c.id === activeChapter).name} 유형을 선택하세요</h2>
          <div className={styles.subChapterGrid}>
            {subChapters.map(subChapter => (
              <button 
                key={subChapter.id}
                className={styles.subChapterCard}
                onClick={() => setActiveSubChapter(subChapter.id)}
              >
                <div className={styles.subChapterIcon}>{subChapter.icon || '📝'}</div>
                <h3>{subChapter.name}</h3>
                <p>{subChapter.description}</p>
              </button>
            ))}
          </div>
        </div>
      );
    }
    
    // 컴포넌트 경로 및 파라미터 설정
    const componentPaths = {
      english: {
        grade3: {
          spelling: {
            component: SpellingWorksheet,
            params: {}
          }
        }
      },
      math: {
        grade1: {
          addition: {
            numberSplit: {
              component: NumberSplitPractice,
              params: {}
            },
            numberCombine: {
              component: NumberCombinePractice,
              params: {}
            }
          }
        }
      }
    };
    
    // 컴포넌트 경로 찾기
    try {
      if (activeSubChapter) {
        const componentConfig = componentPaths[activeSubject][activeGrade][activeChapter][activeSubChapter];
        const Component = componentConfig.component;
        return <Component {...componentConfig.params} />;
      } else {
        const componentConfig = componentPaths[activeSubject][activeGrade][activeChapter];
        if (componentConfig.component) {
          const Component = componentConfig.component;
          return <Component {...componentConfig.params} />;
        }
      }
    } catch (error) {
      console.error("컴포넌트를 찾을 수 없습니다:", error);
    }
    
    // 없는 경우 기본 메시지
    return <div className={styles.notFound}>선택한 학습 내용을 찾을 수 없습니다.</div>;
  };
  
  // 뒤로가기 처리
  const handleBack = () => {
    if (activeSubChapter) {
      setActiveSubChapter(null);
    } else if (activeChapter) {
      setActiveChapter(null);
    } else if (activeGrade) {
      setActiveGrade(null);
    }
  };
  
  // 현재 위치(breadcrumb) 생성
  const getBreadcrumb = () => {
    let items = [];
    
    if (activeSubject) {
      items.push({
        id: 'subject',
        name: currentSubject.name
      });
    }
    
    if (activeGrade) {
      const grade = grades.find(g => g.id === activeGrade);
      items.push({
        id: 'grade',
        name: grade.name
      });
    }
    
    if (activeChapter) {
      const chapter = chapters.find(c => c.id === activeChapter);
      items.push({
        id: 'chapter',
        name: chapter.name
      });
    }
    
    if (activeSubChapter && subChapters) {
      const subChapter = subChapters.find(sc => sc.id === activeSubChapter);
      items.push({
        id: 'subChapter',
        name: subChapter.name
      });
    }
    
    return items;
  };

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className="max-w-screen-lg mx-auto p-4">
          {/* 뒤로가기 및 현재 위치 표시 */}
          {(activeGrade || activeChapter || activeSubChapter) && (
            <div className={styles.navigationBar}>
              <button className={styles.backButton} onClick={handleBack}>
                <span>←</span> 뒤로
              </button>
              
              <div className={styles.breadcrumb}>
                {getBreadcrumb().map((item, index, array) => (
                  <div key={item.id} className={styles.breadcrumbItem}>
                    <span>{item.name}</span>
                    {index < array.length - 1 && <span className={styles.breadcrumbSeparator}>/</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 메인 콘텐츠 */}
          <div className={styles.contentContainer}>
            {renderContent()}
          </div>
        </div>
      </main>
      
      <BottomNav 
        subjects={subjects} 
        activeSubject={activeSubject} 
        onSubjectChange={(subjectId) => {
          setActiveSubject(subjectId);
          setActiveGrade(null);
          setActiveChapter(null);
          setActiveSubChapter(null);
        }} 
      />
    </>
  );
}