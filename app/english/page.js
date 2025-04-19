import Link from 'next/link';
import styles from './page.module.css';
import { subjects } from './../data/subjects';

export default function EnglishPage() {
  // 영어 과목 데이터 가져오기
  const englishSubject = subjects.find(s => s.id === 'english');
  
  return (
    <>
      <main className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">{englishSubject.name} 학습</h1>
        
        <div className={styles.chapterGrid}>
          {/* 모든 학년의 컨텐츠를 한 페이지에 표시 */}
          {englishSubject.grades.map(grade => 
            grade.chapters.map(chapter => {
              // 서브챕터가 있는 경우
              if (chapter.subChapters && chapter.subChapters.length > 0) {
                return chapter.subChapters.map(sub => (
                  <Link 
                    key={`${grade.id}-${chapter.id}-${sub.id}`}
                    href={`/english/${grade.id}/${chapter.id}/${sub.id}`}
                    className={styles.chapterCard}
                  >
                    <div className={styles.chapterIcon}>{sub.icon}</div>
                    <h3 className="font-bold">{grade.name} - {chapter.name} - {sub.name}</h3>
                    <p className="text-gray-600">{sub.description}</p>
                  </Link>
                ));
              }
              
              // 서브챕터가 없는 경우
              return (
                <Link 
                  key={`${grade.id}-${chapter.id}`}
                  href={`/english/${grade.id}/${chapter.id}`}
                  className={styles.chapterCard}
                >
                  <div className={styles.chapterIcon}>{chapter.icon}</div>
                  <h3 className="font-bold">{grade.name} - {chapter.name}</h3>
                  <p className="text-gray-600">{chapter.description}</p>
                </Link>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}