import './globals.css';
import Header from './components/Header';
import SimpleBottomNav from './components/BottomNav';
import { subjects } from './data/subjects';

export const metadata = {
  title: 'Gungeum - 궁금한 문제를 푸는 즐거운 학습',
  description: '초등학생을 위한 영어, 수학 학습 앱입니다. 즐겁게 배우며 성장하세요!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6c5ce7" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16 pb-20">
          {children}
        </main>
        <SimpleBottomNav subjects={subjects} />
        <div id="modal-root"></div>
      </body>
    </html>
  );
}