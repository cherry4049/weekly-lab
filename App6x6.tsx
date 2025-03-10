import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const BOARD_SIZE = 6;
const WIN_CONDITION = 3; // Keep classic 3-in-a-row rule

const App = () => {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handlePress = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const player = board[r][c];
        if (!player) continue;

        // Check right
        if (c + WIN_CONDITION - 1 < BOARD_SIZE &&
            board[r][c + 1] === player &&
            board[r][c + 2] === player) {
          setWinner(player);
          return;
        }

        // Check down
        if (r + WIN_CONDITION - 1 < BOARD_SIZE &&
            board[r + 1][c] === player &&
            board[r + 2][c] === player) {
          setWinner(player);
          return;
        }

        // Check diagonal right-down
        if (r + WIN_CONDITION - 1 < BOARD_SIZE && c + WIN_CONDITION - 1 < BOARD_SIZE &&
            board[r + 1][c + 1] === player &&
            board[r + 2][c + 2] === player) {
          setWinner(player);
          return;
        }

        // Check diagonal left-down
        if (r + WIN_CONDITION - 1 < BOARD_SIZE && c - WIN_CONDITION + 1 >= 0 &&
            board[r + 1][c - 1] === player &&
            board[r + 2][c - 2] === player) {
          setWinner(player);
          return;
        }
      }
    }
  };

  const restartGame = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      {winner && <Text style={styles.winnerText}>Winner: {winner}!</Text>}
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity key={colIndex} style={styles.cell} onPress={() => handlePress(rowIndex, colIndex)}>
                <Text style={styles.cellText}>{cell}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <Button title="Restart" onPress={restartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  board: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  cellText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
