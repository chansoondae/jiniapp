// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: '파일이 제공되지 않았습니다' },
        { status: 400 }
      );
    }

    // 파일 버퍼로 변환
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // 고유한 파일 이름 생성
    const filename = `${uuidv4()}-${file.name.replace(/\s/g, '_')}`;
    
    // Firebase Storage에 파일 업로드
    const storageRef = ref(storage, `uploads/${filename}`);
    
    // 업로드 수행
    await uploadBytes(storageRef, buffer, {
      contentType: file.type
    });
    
    // 업로드된 파일의 공개 URL 가져오기
    const imageUrl = await getDownloadURL(storageRef);
    
    return NextResponse.json(
      { 
        message: '파일이 성공적으로 업로드되었습니다', 
        imageUrl 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}