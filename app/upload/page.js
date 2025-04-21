'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './upload.module.css';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [processingStatus, setProcessingStatus] = useState('idle'); // idle, processing, done
  const [generatedFiles, setGeneratedFiles] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const router = useRouter();

  // 60초 동안 로딩 바 움직이는 효과
  useEffect(() => {
    if (processingStatus === 'processing') {
      setProgress(0);
      const totalDuration = 60000; // 60초
      const stepTime = 100; // 100ms마다 업데이트
      const totalSteps = totalDuration / stepTime;
      const stepIncrement = 100 / totalSteps;
      
      progressIntervalRef.current = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + stepIncrement;
          // 95%에서 멈추고 완료 시 100%가 되도록 함
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, stepTime);
      
      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    } else if (processingStatus === 'done') {
      // 처리 완료 시 100%로 설정
      setProgress(100);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  }, [processingStatus]);

  // 처리 완료 시 자동 리다이렉트
  useEffect(() => {
    if (processingStatus === 'done' && generatedFiles && generatedFiles.path) {
      const redirectTimer = setTimeout(() => {
        router.push(generatedFiles.path);
      }, 1000); // 1초 후 리다이렉트 (로딩바가 100%에 도달하는 것을 보여주기 위한 짧은 대기 시간)
      
      return () => clearTimeout(redirectTimer);
    }
  }, [processingStatus, generatedFiles, router]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // 파일 유효성 검사
    if (!selectedFile.type.includes('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setFile(selectedFile);
    setError('');
    
    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    // 파일 유효성 검사
    if (!droppedFile.type.includes('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setFile(droppedFile);
    setError('');
    
    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('파일을 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      setProcessingStatus('processing');

      // FormData 객체 생성
      const formData = new FormData();
      formData.append('file', file);

      // 서버로 이미지 업로드
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const { imageUrl } = await uploadResponse.json();
      
      // 이미지 분석 및 HTML 생성을 위한 통합 API 호출
      const generationResponse = await fetch('/api/generate-html-direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!generationResponse.ok) {
        throw new Error('HTML 생성에 실패했습니다.');
      }

      const generatedData = await generationResponse.json();
      setGeneratedFiles(generatedData);
      setProcessingStatus('done');

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || '오류가 발생했습니다.');
      setProcessingStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>문제지 이미지 업로드</h1>
      <p className={styles.description}>
        문제지 사진을 업로드하면 AI가 분석하여 즉시 인터랙티브한 학습 자료를 만들어드립니다.
      </p>
      
      {/* 로딩 바를 설명 텍스트 아래로 이동 */}
      {processingStatus !== 'idle' && (
        <div className={styles.processingStatus}>
          <h2>처리 상태</h2>
          <div className={styles.progressContainer}>
            <div 
              className={styles.progressBar}
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.5s ease-out'
              }}
            ></div>
          </div>
          <p className={styles.statusText}>
            {processingStatus === 'processing' 
              ? '이미지 분석 및 문제 생성 중...' 
              : '생성 완료! 학습 자료로 이동합니다...'}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div 
          className={styles.dropzone}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <div className={styles.previewContainer}>
              <Image 
                src={preview} 
                alt="업로드한 이미지 미리보기" 
                width={300} 
                height={300} 
                className={styles.preview}
              />
            </div>
          ) : (
            <div className={styles.uploadInstruction}>
              <div className={styles.uploadIcon}>📷</div>
              <p>이미지를 드래그하거나 클릭하여 업로드하세요</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            disabled={loading}
            onChange={handleFileChange}
            accept="image/*"
            className={styles.fileInput}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={!file || loading}
        >
          {loading ? '처리 중...' : '문제 생성 시작'}
        </button>
      </form>

      {/* 결과 표시 영역 제거 - 자동 리다이렉트로 인해 필요 없어짐 */}
    </div>
  );
}