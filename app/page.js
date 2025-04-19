import Link from 'next/link';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { subjects } from './data/subjects';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <main>
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">학습 과목을 선택하세요</h1>
          <div className={styles.subjectGrid}>
            {subjects.map(subject => (
              <Link 
                key={subject.id}
                href={`/${subject.id}`}
                className={styles.subjectCard}
              >
                <div className={styles.subjectIcon}>{subject.icon}</div>
                <h2 className="text-xl font-bold mt-4">{subject.name}</h2>
                <p className="mt-2 text-gray-600">
                  {subject.grades.length}개 학년, {subject.grades.reduce((acc, grade) => 
                    acc + grade.chapters.reduce((chapAcc, chap) => 
                      chapAcc + (chap.subChapters?.length || 1), 0), 0)}개 활동
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}