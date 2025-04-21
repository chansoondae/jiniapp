'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';

const VocabularyCrossword = () => {
  // Word bank
  const wordBank = [
    'sticky', 'stuffy', 'ripe', 'frowny', 'wobble', 
    'oozing', 'feast', 'scrumptious', 'vegetarian', 
    'sprinkle', 'suspicious', 'urgent'
  ];

  // Words with their correct positions in the grid
  // Note: x, y coordinates are 0-indexed 
  const words = [
    { word: 'SUSPICIOUS', direction: 'down', x: 5, y: 0, number: 1 },
    { word: 'VEGETARIAN', direction: 'down', x: 9, y: 1, number: 2 },
    { word: 'OOZING', direction: 'across', x: 2, y: 4, number: 3 },
    { word: 'STICKY', direction: 'across', x: 8, y: 5, number: 4 },
    { word: 'SPRINKLE', direction: 'down', x: 7, y: 7, number: 5 },
    { word: 'SCRUMPTIOUS', direction: 'across', x: 2, y: 8, number: 6 },
    { word: 'STUFFY', direction: 'down', x: 12, y: 8, number: 7 },
    { word: 'FROWNY', direction: 'across', x: 3, y: 11, number: 8 },
    { word: 'FEAST', direction: 'across', x: 12, y: 11, number: 9 },
    { word: 'URGENT', direction: 'across', x: 4, y: 14, number: 10 },
    { word: 'RIPE', direction: 'down', x: 5, y: 14, number: 11 },
    { word: 'WOBBLE', direction: 'across', x: 0, y: 17, number: 12 }
  ];

  // Clues
  const clues = {
    down: {
      1: 'causing a feeling that something is wrong',
      2: 'a person who does not eat meat',
      5: 'splash, scatter',
      7: 'very formal, serious, old-fashioned',
      11: 'fully grown'
    },
    across: {
      3: 'to flow out slowly',
      4: 'gluey',
      6: 'delicious, very good to taste',
      8: 'appearing displeased',
      9: 'festival',
      10: 'very important and needs to be done right away',
      12: 'move unsteadily'
    }
  };

  // Size of the grid (needs to be large enough for all words)
  const gridSize = 18;

  // Initialize empty grid
  const createEmptyGrid = () => {
    return Array(gridSize).fill().map(() => 
      Array(gridSize).fill(null).map(() => ({
        letter: '',
        isActive: false,
        number: null,
        correctLetter: null
      }))
    );
  };

  // Initialize the grid with words placed at correct positions
  const initializeGrid = () => {
    const grid = createEmptyGrid();
    
    // Place each word on the grid
    words.forEach(({ word, direction, x, y, number }) => {
      for (let i = 0; i < word.length; i++) {
        const row = direction === 'down' ? y + i : y;
        const col = direction === 'across' ? x + i : x;
        
        grid[row][col] = {
          letter: '',
          isActive: true,
          number: i === 0 ? number : null,
          correctLetter: word[i]
        };
      }
    });
    
    return grid;
  };

  // State variables
  const [grid, setGrid] = useState(initializeGrid);
  const [currentCell, setCurrentCell] = useState({ row: 0, col: 0 });
  const [cellRefs] = useState(() => {
    const refs = {};
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        refs[`${row}-${col}`] = React.createRef();
      }
    }
    return refs;
  });
  const [showAnswers, setShowAnswers] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState(false);

  // Handle input change in a cell
  const handleCellChange = (row, col, value) => {
    // Only allow letters
    if (value && !/^[A-Za-z]$/.test(value)) return;
    
    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      letter: value.toUpperCase()
    };
    setGrid(newGrid);
    
    // Auto-advance to next cell if value is entered
    if (value) {
      moveToNextCell(row, col);
    }
  };

  // Move to the next cell
  const moveToNextCell = (row, col) => {
    // Try to move based on the current word direction
    const wordDirection = getWordDirectionAtCell(row, col);
    
    if (wordDirection === 'across') {
      if (col + 1 < gridSize && grid[row][col + 1].isActive) {
        focusCell(row, col + 1);
        return;
      }
    } else if (wordDirection === 'down') {
      if (row + 1 < gridSize && grid[row + 1][col].isActive) {
        focusCell(row + 1, col);
        return;
      }
    }
    
    // If we couldn't move based on direction, try right then down
    if (col + 1 < gridSize && grid[row][col + 1].isActive) {
      focusCell(row, col + 1);
    } else if (row + 1 < gridSize && grid[row + 1][col].isActive) {
      focusCell(row + 1, col);
    }
  };

  // Get the word direction at a specific cell
  const getWordDirectionAtCell = (row, col) => {
    // Check if this cell is part of an across word
    if (col > 0 && grid[row][col - 1]?.isActive) {
      return 'across';
    }
    // Check if this cell is part of a down word
    if (row > 0 && grid[row - 1][col]?.isActive) {
      return 'down';
    }
    // Default to across
    return 'across';
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, row, col) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        moveRight(row, col);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveLeft(row, col);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveDown(row, col);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveUp(row, col);
        break;
      case 'Backspace':
        if (!grid[row][col].letter) {
          e.preventDefault();
          // Move to previous cell and delete its content
          const prev = getPreviousCell(row, col);
          if (prev) {
            focusCell(prev.row, prev.col);
            // Clear the previous cell
            const newGrid = [...grid];
            newGrid[prev.row][prev.col] = {
              ...newGrid[prev.row][prev.col],
              letter: ''
            };
            setGrid(newGrid);
          }
        }
        break;
      default:
        break;
    }
  };

  // Find the previous cell
  const getPreviousCell = (row, col) => {
    const wordDirection = getWordDirectionAtCell(row, col);
    
    if (wordDirection === 'across' && col > 0 && grid[row][col - 1].isActive) {
      return { row, col: col - 1 };
    } else if (wordDirection === 'down' && row > 0 && grid[row - 1][col].isActive) {
      return { row: row - 1, col };
    }
    
    return null;
  };

  // Move right if possible
  const moveRight = (row, col) => {
    for (let c = col + 1; c < gridSize; c++) {
      if (grid[row][c].isActive) {
        focusCell(row, c);
        return;
      }
    }
  };

  // Move left if possible
  const moveLeft = (row, col) => {
    for (let c = col - 1; c >= 0; c--) {
      if (grid[row][c].isActive) {
        focusCell(row, c);
        return;
      }
    }
  };

  // Move down if possible
  const moveDown = (row, col) => {
    for (let r = row + 1; r < gridSize; r++) {
      if (grid[r][col].isActive) {
        focusCell(r, col);
        return;
      }
    }
  };

  // Move up if possible
  const moveUp = (row, col) => {
    for (let r = row - 1; r >= 0; r--) {
      if (grid[r][col].isActive) {
        focusCell(r, col);
        return;
      }
    }
  };

  // Focus on a specific cell
  const focusCell = (row, col) => {
    setCurrentCell({ row, col });
    if (cellRefs[`${row}-${col}`]?.current) {
      cellRefs[`${row}-${col}`].current.focus();
    }
  };

  // Check all answers in the grid
  const checkAnswers = () => {
    let allCorrect = true;
    const newGrid = [...grid];
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (grid[row][col].isActive) {
          if (grid[row][col].letter !== grid[row][col].correctLetter) {
            allCorrect = false;
          }
        }
      }
    }
    
    setCheckedAnswers(true);
    
    if (allCorrect) {
      alert("Congratulations! All answers are correct!");
    } else {
      alert("Some answers are incorrect. Keep trying!");
    }
  };

  // Show or hide all answers
  const toggleAnswers = () => {
    const newGrid = [...grid];
    
    if (!showAnswers) {
      // Show answers
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (newGrid[row][col].isActive) {
            newGrid[row][col] = {
              ...newGrid[row][col],
              letter: newGrid[row][col].correctLetter
            };
          }
        }
      }
    } else {
      // Hide answers (clear all cells)
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (newGrid[row][col].isActive) {
            newGrid[row][col] = {
              ...newGrid[row][col],
              letter: ''
            };
          }
        }
      }
    }
    
    setGrid(newGrid);
    setShowAnswers(!showAnswers);
    setCheckedAnswers(false);
  };

  // Reset the puzzle
  const resetPuzzle = () => {
    const newGrid = [...grid];
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (newGrid[row][col].isActive) {
          newGrid[row][col] = {
            ...newGrid[row][col],
            letter: ''
          };
        }
      }
    }
    
    setGrid(newGrid);
    setShowAnswers(false);
    setCheckedAnswers(false);
  };

  // Render the grid
  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={`row-${rowIndex}`} className={styles.row}>
        {row.map((cell, colIndex) => {
          if (!cell.isActive) {
            return <div key={`cell-${rowIndex}-${colIndex}`} className={styles.emptyCell} />;
          }
          
          const isCorrect = checkedAnswers && cell.letter === cell.correctLetter;
          const isIncorrect = checkedAnswers && cell.letter !== '' && cell.letter !== cell.correctLetter;
          
          return (
            <div 
              key={`cell-${rowIndex}-${colIndex}`} 
              className={`${styles.cell} ${isCorrect ? styles.correctCell : ''} ${isIncorrect ? styles.incorrectCell : ''}`}
            >
              {cell.number && <span className={styles.cellNumber}>{cell.number}</span>}
              <input
                ref={cellRefs[`${rowIndex}-${colIndex}`]}
                className={styles.cellInput}
                type="text"
                maxLength="1"
                value={cell.letter}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                onFocus={() => setCurrentCell({ row: rowIndex, col: colIndex })}
              />
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className={styles.crosswordContainer}>
      <div className={styles.header}>
        <h1>VOCABULARY</h1>
        <p>Complete the crossword puzzle below.</p>
      </div>
      
      <div className={styles.wordBank}>
        <h3>Word Bank</h3>
        <div className={styles.wordList}>
          {wordBank.map((word, index) => (
            <span key={`word-${index}`} className={styles.word}>
              {word}{index < wordBank.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.gridContainer}>
          {renderGrid()}
        </div>
        
        <div className={styles.clues}>
          <div className={styles.downClues}>
            <h3>down</h3>
            <ul>
              {Object.entries(clues.down).map(([number, clue]) => (
                <li key={`down-${number}`}>
                  <span className={styles.clueNumber}>{number}.</span> {clue}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.acrossClues}>
            <h3>across</h3>
            <ul>
              {Object.entries(clues.across).map(([number, clue]) => (
                <li key={`across-${number}`}>
                  <span className={styles.clueNumber}>{number}.</span> {clue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button onClick={checkAnswers}>Check Answers</button>
        <button onClick={toggleAnswers}>
          {showAnswers ? 'Hide Answers' : 'Show Answers'}
        </button>
        <button onClick={resetPuzzle}>Reset</button>
      </div>

      <div className={styles.images}>
        {/* These would be your images from the puzzle */}
        <div className={styles.imageContainer}></div>
      </div>
    </div>
  );
};

export default VocabularyCrossword;