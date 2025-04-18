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
              component: 'SpellingWorksheet',
              description: '단어의 빠진 글자를 채워 넣는 연습',
              icon: '✏️'
            },
            // 향후 추가될 챕터들...
          ]
        },
        // 향후 추가될 학년들...
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
            // 향후 추가될 챕터들...
          ]
        },
        // 향후 추가될 학년들...
      ]
    },
    {
      id: 'science',
      name: '과학',
      icon: '🔬',
      comingSoon: true,
      grades: []
    },
    {
      id: 'social',
      name: '사회',
      icon: '🌏',
      comingSoon: true,
      grades: []
    }
  ];