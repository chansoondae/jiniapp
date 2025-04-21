'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './view.module.css';
import ReactMarkdown from 'react-markdown';

export default function ViewPage({ params }) {
  const { id } = use(params); // ✅ 비동기 params 처리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fileData, setFileData] = useState(null);
  const [iframeHeight, setIframeHeight] = useState(600); // 기본 높이
  const [questions, setQuestions] = useState([]);
  const iframeRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'generatedFiles'), where('uniqueId', '==', id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error('해당 파일을 찾을 수 없습니다.');
        }

        const data = querySnapshot.docs[0].data();
        setFileData(data);
        
        // 분석 데이터에서 questions 또는 problems 추출
        if (data.analysis) {
          if (data.analysis.questions && Array.isArray(data.analysis.questions)) {
            setQuestions(data.analysis.questions);
          } else if (data.analysis.problems && Array.isArray(data.analysis.problems)) {
            setQuestions(data.analysis.problems);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // iframe 높이 조정을 위한 메시지 핸들러
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'resize' && typeof event.data.height === 'number') {
        setIframeHeight(Math.max(event.data.height, 600)); // 최소 높이 유지
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (loading) {
    return <div className={styles.loading}>문제를 준비하는 중입니다...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h1>오류 발생</h1>
        <p>{error}</p>
        <button 
          className={styles.backButton}
          onClick={() => router.push('/upload')}
        >
          업로드 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {/* <h1>생성된 학습 자료</h1> */}
        <div className={styles.metadata}>
          <p>생성 시간: {new Date(fileData.createdAt).toLocaleString()}</p>
          {/* <p>문제 유형: {fileData.questionType}</p> */}
        </div>
      </header>

      <main className={styles.main}>
        {fileData.htmlUrl ? (
          <div className={styles.iframeContainer}>
            <iframe
              ref={iframeRef}
              src={fileData.htmlUrl}
              title="생성된 학습 자료"
              className={styles.contentFrame}
              style={{ height: `${iframeHeight}px` }}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          </div>
        ) : (
          <p>콘텐츠를 불러올 수 없습니다.</p>
        )}

        {questions.length > 0 && (
          <section className={styles.jsonContainer}>
            <h2>분석된 문제 데이터 (JSON)</h2>
            
            {questions.map((question, index) => (
              <div key={index} className={styles.jsonItem}>
                <h3>문제 {index + 1}</h3>
                <pre className={styles.jsonCode}>
                  {JSON.stringify(question, null, 2)}
                </pre>
              </div>
            ))}
          </section>
        )}
      </main>

      <div className={styles.codeLinks}>
        <a href={fileData.htmlUrl} target="_blank" rel="noopener noreferrer" className={styles.codeLink}>
          HTML 코드 보기
        </a>
        {fileData.imageUrl && (
          <a href={fileData.imageUrl} target="_blank" rel="noopener noreferrer" className={styles.codeLink}>
            원본 이미지 보기
          </a>
        )}
      </div>
    </div>
  );
}