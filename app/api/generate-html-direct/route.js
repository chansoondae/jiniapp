// app/api/generate-html-direct/route.js
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from './../../../lib/firebase';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { imageUrl } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: '이미지 URL이 제공되지 않았습니다' },
        { status: 400 }
      );
    }

    // 고유 ID 생성
    const uniqueId = uuidv4().substring(0, 8);

    // console.log('Processing image and generating HTML directly:', imageUrl);
    
    try {
      // 이미지를 직접 분석하고 HTML 생성 (단일 API 호출)
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert at creating educational applications. Your task is to:
1. Analyze the educational worksheet/test image
2. Create a complete, standalone HTML file based on the image content that includes:
   - The exact questions, options, and content from the image
   - Complete styling in a <style> tag in the head
   - CSS design should be imitate the worksheet/test image.
   - All JavaScript functionality in a <script> tag at the end of the body
   - A "Check Answer" button that verifies answers and shows the answers
   - A "Try Again" button that resets the form
   - The answers are locateded below the buttons
   - Responsive design with attractive educational styling
   
Your entire response must be ONLY the raw HTML code, starting with <!DOCTYPE html>.
Do not include any markdown formatting, code blocks, or explanations.`
          },
          {
            role: "user",
            content: [
              { 
                type: "text", 
                text: `Please analyze this educational image and create a complete, interactive HTML file that:
1. Recreates the exact problems shown in the image
2. Allows students to input answers
3. Includes a check functionality to verify answers
4. Shows color-coded feedback on correctness:
   - Correct answers should be highlighted in green (#2ecc71 or similar)
   - Incorrect answers should be highlighted in red (#e74c3c or similar)
   - For incorrect answers, show the correct answer between the problems and the buttons
5. Includes a reset button to try again
6. Uses proper height adjustment for iframe display with this function:

function sendResizeMessage() {
  const height = document.body.scrollHeight;
  window.parent.postMessage({ type: 'resize', height: height }, '*');
}

The design should be visually appealing, educational, and user-friendly. It should follow the original image design. Use appropriate fonts and spacing for readability. Make sure to call sendResizeMessage() after content changes, such as when showing answers or resetting the form.

Return ONLY the complete HTML file with no explanations or markdown.` 
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 4000,
      });
      
      // console.log('Direct HTML generation completed');
      
      // HTML 코드 추출 및 정리
      let htmlContent = response.choices[0].message.content.trim();
      
      // 마크다운 코드 블록 제거 (필요한 경우)
      if (htmlContent.startsWith('```html')) {
        htmlContent = htmlContent.replace(/```html\n/, '').replace(/\n```$/, '');
      } else if (htmlContent.startsWith('```')) {
        htmlContent = htmlContent.replace(/```\n/, '').replace(/\n```$/, '');
      }

      // HTML 유효성 확인
      if (!htmlContent.startsWith('<!DOCTYPE html>') && !htmlContent.startsWith('<!doctype html>')) {
        console.error('Generated content does not appear to be valid HTML!');
        htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Educational Content</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .error { color: red; padding: 20px; border: 1px solid red; }
    .correct { background-color: #d4edda; color: #155724; border-color: #c3e6cb; }
    .incorrect { background-color: #f8d7da; color: #721c24; border-color: #f5c6cb; }
    .answer { margin-top: 5px; font-size: 0.9em; font-weight: bold; }
  </style>
</head>
<body>
  <div class="error">
    <h1>Content Generation Error</h1>
    <p>Sorry, there was a problem generating the content. Please try again.</p>
  </div>
  <script>
    function sendResizeMessage() {
      const height = document.body.scrollHeight + 20;
      window.parent.postMessage({ type: 'resize', height: height }, '*');
    }
    // Send initial resize message
    window.addEventListener('load', sendResizeMessage);
    // Send another resize message after a short delay
    setTimeout(sendResizeMessage, 500);
  </script>
</body>
</html>`;
      }

      // Extract title from HTML content
      let title = "Educational Content"; // Default title
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1].trim();
      }

      // Extract subtitle from first h1 tag in body
      let subTitle = "untitled";
      const bodyContent = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyContent && bodyContent[1]) {
        const h1Match = bodyContent[1].match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        if (h1Match && h1Match[1]) {
          // Remove any HTML tags inside the h1 and get just the text
          subTitle = h1Match[1].replace(/<[^>]*>/g, '').trim();
        }
      }

      // Firebase Storage에 HTML 파일 저장 - contentType을 text/html로 설정
      const htmlStorageRef = ref(storage, `generated/${uniqueId}/index.html`);
      const storageMetadata = {
        contentType: 'text/html',
      };
      
      await uploadString(htmlStorageRef, htmlContent, 'raw', storageMetadata);
      const htmlUrl = await getDownloadURL(htmlStorageRef);

      // Firestore에 메타데이터 저장 (title과 subTitle 추가)
      const firestoreMetadata = {
        createdAt: new Date().toISOString(),
        htmlUrl,
        title,
        subTitle, // subTitle 추가
        uniqueId,
        imageUrl
      };

      await addDoc(collection(db, 'generatedFiles'), firestoreMetadata);

      return NextResponse.json({
        message: '파일이 성공적으로 생성되었습니다',
        files: {
          html: htmlUrl
        },
        path: `/view/${uniqueId}`,
        uniqueId,
        title,
        subTitle, // subTitle도 response에 포함
      });
      
    } catch (apiError) {
      console.error('API 호출 오류:', apiError.message, apiError.stack);
      return NextResponse.json(
        { error: `API 오류: ${apiError.message}` },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error generating files:', error);
    return NextResponse.json(
      { error: '파일 생성 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}