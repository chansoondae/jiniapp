export const subjects = [
  {
    id: 'english',
    name: '영어',
    icon: '🔤',
    grades: [
      {
        id: 'grade3',
        name: '3학년',
        chapters: [
          {
            id: 'spelling',
            name: '철자 학습',
            icon: '✏️',
            description: '단어의 빠진 글자를 채워 넣는 연습',
            subChapters: [
              {
                id: 'missingLetters',
                name: '빠진 글자 채우기',
                component: 'SpellingWorksheet',
                description: '단어의 빠진 글자를 입력하는 연습',
                icon: '🔡'
              },
              {
                id: 'repeatWrite',
                name: '두 번 따라 쓰기',
                component: 'SpellingRepeatPractice',
                description: '단어를 두 번씩 써보며 철자를 익혀요',
                icon: '✍️'
              },
              {
                id: 'correctSpelling',
                name: '정확한 철자 고르기',
                component: 'SpellingChoicePractice',
                description: '보기 중에서 올바른 철자를 골라요',
                icon: '🔍'
              },
              {
                id: 'dictation',
                name: '받아쓰기 문장',
                component: 'DictationPractice',
                description: '문장을 듣고 따라 쓰며 문법과 철자 연습',
                icon: '🗣️'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'math',
    name: '수학',
    icon: '🔢',
    grades: [
      {
        id: 'grade1',
        name: '1학년',
        chapters: [
          {
            id: 'addition',
            name: '덧셈',
            icon: '➕',
            subChapters: [
              {
                id: 'numberSplit',
                name: '두 수 가르기',
                component: 'NumberSplitPractice',
                description: '하나의 수를 두 수로 나누는 연습',
                icon: '✂️'
              },
              {
                id: 'numberCombine',
                name: '두 수 모으기',
                component: 'NumberCombinePractice',
                description: '두 수를 더해 하나의 수를 만드는 연습',
                icon: '🧩'
              }
            ]
          },
          {
            id: 'subtraction',
            name: '뺄셈',
            icon: '➖',
            subChapters: [
              {
                id: 'subWithin9',
                name: '몇-몇 뺄셈',
                component: 'SubtractionWithin9Practice',
                description: '뺄셈 결과가 9 이하인 문제 연습',
                icon: '🧠'
              }
            ]
          }
        ]
      },
      {
        id: 'grade2',
        name: '2학년',
        chapters: [
          {
            id: 'multiplication',
            name: '곱셈',
            icon: '✖️',
            subChapters: [
              {
                id: 'multi2to5',
                name: '2~5단 곱셈',
                component: 'Multiplication2to5Practice',
                description: '2~5단 곱셈 문제를 연습해요',
                icon: '🐣'
              },
              {
                id: 'multi6to9',
                name: '6~9단 곱셈',
                component: 'Multiplication6to9Practice',
                description: '6~9단 곱셈 문제를 연습해요',
                icon: '🐥'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    name: '과학',
    icon: '🔬',
    grades: [
      {
        id: 'grade3',
        name: '3학년',
        chapters: [
          {
            id: 'leafLife',
            name: '식물의 생활',
            icon: '🌿',
            description: '식물의 잎과 생김새, 특징을 이해해요',
            subChapters: [
              {
                id: 'leafQuiz',
                name: '잎의 특징 퀴즈',
                component: 'ScienceLeafQuiz',
                description: '잎의 생김새와 특징을 퀴즈로 확인해요',
                icon: '📝'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'social',
    name: '사회',
    icon: '🌏',
    grades: [
      {
        id: 'grade3',
        name: '3학년',
        chapters: [
          {
            id: 'timeFlow',
            name: '시간의 흐름',
            icon: '⏳',
            description: '일상에서 경험하는 시간의 흐름 이해',
            subChapters: [
              {
                id: 'timeQuiz',
                name: '시간 퀴즈',
                component: 'SocialTimeQuiz',
                description: '시간 표현과 순서 정리를 퀴즈로 확인해요',
                icon: '🕰️'
              }
            ]
          }
        ]
      },
      {
        id: 'grade4',
        name: '4학년',
        chapters: [
          {
            id: 'regionInfo',
            name: '지역 정보',
            icon: '🗺️',
            description: '주어진 지역의 정보와 기후를 이해해요',
            subChapters: [
              {
                id: 'regionQuiz',
                name: '지역 정보 퀴즈',
                component: 'SocialRegionQuiz',
                description: '면적, 인구, 기온, 강수량 등을 문제로 확인해요',
                icon: '📊'
              }
            ]
          }
        ]
      }
    ]
  }
];