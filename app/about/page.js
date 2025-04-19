'use client';

import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function AboutPage() {
  return (
    <>
      <main className="max-w-screen-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">📘 Gungeum 소개</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Gungeum은 초등학생을 위한 학습 앱입니다.
          영어, 수학, 과학, 사회 등 다양한 과목을 재미있게 공부할 수 있어요.
        </p>
        <div className="bg-white shadow rounded-xl p-6 text-gray-800">
          <h2 className="text-xl font-semibold mb-2">🎯 우리의 목표</h2>
          <p className="mb-4">학생들이 즐겁고 효과적으로 학습할 수 있도록 돕는 것이 우리의 목표입니다.</p>
          <h2 className="text-xl font-semibold mb-2">📚 제공하는 기능</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>문제 기반의 자기주도 학습</li>
            <li>과목별, 학년별 맞춤 학습 콘텐츠</li>
            <li>퀴즈, 철자 연습, 계산 훈련 등 다양한 활동</li>
          </ul>
        </div>
      </main>
    </>
  );
}
