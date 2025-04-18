'use client';

import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';

export default function HelpPage() {
  return (
    <>
      <Header />
      <main className="max-w-screen-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">🆘 도움말</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">앱 이용 방법</h2>
          <p className="text-gray-700">
            1. 하단의 네비게이션 바를 사용하여 원하는 과목을 선택하세요. <br />
            2. 학년별 학습 콘텐츠가 카드 형식으로 보여집니다. <br />
            3. 원하는 챕터나 연습 유형을 눌러 학습을 시작하세요!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">자주 묻는 질문</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Q:</strong> 문제를 다 풀면 어떻게 되나요?<br /><strong>A:</strong> 정답 여부와 점수를 확인할 수 있어요!</li>
            <li><strong>Q:</strong> 뒤로 가기 버튼이 작동하지 않아요.<br /><strong>A:</strong> 화면 하단의 “← 뒤로가기” 버튼을 사용해 주세요.</li>
            <li><strong>Q:</strong> 모바일에서도 잘 작동하나요?<br /><strong>A:</strong> 네, 반응형으로 제작되어 모든 기기에서 사용할 수 있어요.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">문의하기</h2>
          <p className="text-gray-700">
            사용 중 불편한 점이나 건의사항이 있다면 <a href="mailto:artfriendscafe@gmail.com" className="text-blue-500 underline">studyfriends@example.com</a> 으로 메일 주세요!
          </p>
        </section>
      </main>
      <BottomNav subjects={[]} activeSubject={null} onSubjectChange={() => {}} />
    </>
  );
}
