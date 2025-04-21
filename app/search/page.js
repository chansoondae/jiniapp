'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, where, orderBy, getDocs, limit, startAfter } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './search.module.css';

export default function SearchPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const itemsPerPage = 10;

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setLoading(true);
      setFiles([]);
      setLastVisible(null);
      setHasMore(true);
      
      if (!searchTerm.trim()) {
        setFiles([]);
        setLoading(false);
        return;
      }
      
      // 제목과 부제목 기준으로 검색하는 쿼리 생성
      const titleQuery = query(
        collection(db, 'generatedFiles'),
        where('title', '>=', searchTerm),
        where('title', '<=', searchTerm + '\uf8ff'),
        orderBy('title'),
        orderBy('createdAt', 'desc'),
        limit(itemsPerPage)
      );
      
      const titleSnapshot = await getDocs(titleQuery);
      
      // 부제목으로 검색하는 쿼리 생성
      const subTitleQuery = query(
        collection(db, 'generatedFiles'),
        where('subTitle', '>=', searchTerm),
        where('subTitle', '<=', searchTerm + '\uf8ff'),
        orderBy('subTitle'),
        orderBy('createdAt', 'desc'),
        limit(itemsPerPage)
      );
      
      const subTitleSnapshot = await getDocs(subTitleQuery);
      
      // 결과 합치기
      const titleResults = titleSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      const subTitleResults = subTitleSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // 중복 제거를 위한 Set으로 통합
      const combinedResults = [...titleResults];
      
      subTitleResults.forEach(subTitleDoc => {
        // id가 중복되지 않는 경우에만 추가
        if (!combinedResults.some(doc => doc.id === subTitleDoc.id)) {
          combinedResults.push(subTitleDoc);
        }
      });
      
      // 결과 정렬 (최신순)
      combinedResults.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setFiles(combinedResults);
      
      // 더 보기 버튼 상태 설정
      if (combinedResults.length === 0) {
        setHasMore(false);
      } else {
        // 마지막 문서 저장 (더 보기 위함)
        // 여기서는 간소화를 위해 더 보기 기능을 비활성화
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error searching files:', err);
      setError('검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>학습 자료 검색</h1>
        <p className={styles.subTitle}>
          제목이나 부제목으로 학습 자료를 검색할 수 있습니다.
        </p>
      </header>

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            검색
          </button>
        </form>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>검색 중입니다...</div>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <div className={styles.error}>
            <h2>오류 발생</h2>
            <p>{error}</p>
            <button 
              className={styles.retryButton} 
              onClick={handleSearch}
            >
              다시 시도
            </button>
          </div>
        </div>
      ) : searchTerm && files.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h2>검색 결과가 없습니다</h2>
          <p>다른 검색어로 다시 시도해보세요!</p>
          <Link href="/upload" className={styles.createEmptyButton}>
            학습 자료 만들기
          </Link>
        </div>
      ) : files.length > 0 ? (
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
      ) : searchTerm ? (
        <div className={styles.initialState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h2>검색어를 입력해주세요</h2>
        </div>
      ) : null}
    </div>
  );
}