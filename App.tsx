import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

// Tic-Tac-Toe component
const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Array of 9 cells, initially empty
  const [isXNext, setIsXNext] = useState(true); // State to track the next player (X or O)

  // Function to handle a square being pressed
  const handlePress = (index: number) => {
    // If the square is already filled or the game is over, do nothing
    if (board[index] || calculateWinner(board)) return;

    // Create a copy of the board to modify
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Function to calculate the winner
  const calculateWinner = (board: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  // Function to render a square
  const renderSquare = (index: number) => (
    <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  // Function to reset the game
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // Display winner or draw alert
  if (winner) {
    Alert.alert(`Player ${winner} wins!`, '', [
      { text: 'OK', onPress: handleReset },
    ]);
  } else if (board.every(cell => cell !== null)) {
    Alert.alert('It\'s a draw!', '', [
      { text: 'OK', onPress: handleReset },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: "red",
    marginBottom: 20,
  },
  board: {
    backgroundColor: "orange",
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'green',
  },
  squareText: {
    fontSize: 50,
    color: "red",
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 15,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 30,
  },
});

export default App;
