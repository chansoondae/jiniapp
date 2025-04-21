'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, orderBy, getDocs, limit, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './my.module.css';

export default function MyPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const itemsPerPage = 10;
  // 로그인 기능 추가 시 사용할 상태
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchFiles();
    // 로그인 기능 추가 시 사용자 정보를 가져오는 코드가 여기에 추가될 예정
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      
      // 현재는 모든 파일을 가져오지만, 로그인 기능이 추가되면 아래 주석 처리된 코드처럼 변경될 예정입니다.
      const q = query(
        collection(db, 'generatedFiles'),
        orderBy('createdAt', 'desc'),
        limit(itemsPerPage)
      );
      
      /* 로그인 기능 추가 후 사용할 쿼리
      if (user && user.uid) {
        q = query(
          collection(db, 'generatedFiles'),
          where('authorId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(itemsPerPage)
        );
      }
      */
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setFiles([]);
        setHasMore(false);
      } else {
        const filesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFiles(filesData);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(querySnapshot.docs.length === itemsPerPage);
      }
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('내 학습 자료를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreFiles = async () => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);
      
      // 로그인 기능 추가 시 여기도 변경될 예정
      const q = query(
        collection(db, 'generatedFiles'),
        orderBy('createdAt', 'desc'),
        limit(itemsPerPage),
        lastVisible && lastVisible
      );
      
      /* 로그인 기능 추가 후 사용할 쿼리
      if (user && user.uid) {
        q = query(
          collection(db, 'generatedFiles'),
          where('authorId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(itemsPerPage),
          lastVisible && lastVisible
        );
      }
      */
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setHasMore(false);
      } else {
        const newFilesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setFiles(prevFiles => [...prevFiles, ...newFilesData]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(querySnapshot.docs.length === itemsPerPage);
      }
    } catch (err) {
      console.error('Error loading more files:', err);
      setError('추가 파일을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoadingMore(false);
    }
  };

  // 날짜와 시간을 포맷하는 함수
  const formatDateTime = (dateTimeString) => {
    try {
      const date = new Date(dateTimeString);
      
      // 날짜 형식: YYYY-MM-DD
      const formattedDate = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      
      // 시간 형식: HH:MM:SS
      const formattedTime = date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      return `${formattedDate} ${formattedTime}`;
    } catch (e) {
      console.error('Date formatting error:', e);
      return dateTimeString || '날짜 정보 없음';
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>내 학습 자료를 불러오는 중입니다...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          <h2>오류 발생</h2>
          <p>{error}</p>
          <button 
            className={styles.retryButton} 
            onClick={fetchFiles}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>내 학습 자료</h1>
        <p className={styles.subTitle}>
          내가 만든 모든 학습 자료를 확인하고 관리할 수 있습니다.
        </p>
        <Link href="/upload" className={styles.createButton}>
          새 학습 자료 만들기
        </Link>
      </header>

      {files.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h2>아직 만든 학습 자료가 없습니다</h2>
          <p>새로운 학습 자료를 만들어보세요!</p>
          <Link href="/upload" className={styles.createEmptyButton}>
            학습 자료 만들기
          </Link>
        </div>
      ) : (
        <div className={styles.filesList}>
          {files.map(file => (
            <Link 
              href={`/view/${file.uniqueId}`} 
              key={file.uniqueId || file.id} 
              className={styles.fileCard}
            >
              <div className={styles.fileIcon}>📚</div>
              <div className={styles.fileInfo}>
                <span className={styles.fileTitle}>
                  {file.title} 
                </span>
                <span className={styles.fileSubTitle}>
                  {file.subTitle} 
                </span>
                <span className={styles.fileDate}>
                  {formatDateTime(file.createdAt)}
                </span>
              </div>
              <div className={styles.fileArrow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button 
            className={styles.loadMoreButton}
            onClick={loadMoreFiles}
            disabled={loadingMore}
          >
            {loadingMore ? '불러오는 중...' : '더 보기'}
          </button>
        </div>
      )}
    </div>
  );
}