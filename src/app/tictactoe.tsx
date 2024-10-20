'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProfessionalTicTacToe() {
  const [board, setBoard] = useState<Array<number | null>>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<number>(1)
  const [winner, setWinner] = useState<number | 'draw' | null>(null)
  const [scores, setScores] = useState({ player1: 0, player2: 0 })
  const [gameEnded, setGameEnded] = useState(false)
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const calculatedWinner = calculateWinner(board)
    if (calculatedWinner !== null) {
      setWinner(calculatedWinner)
      setScores(prev => ({
        ...prev,
        [calculatedWinner === 1 ? 'player1' : 'player2']: prev[calculatedWinner === 1 ? 'player1' : 'player2'] + 1
      }))
      setGameEnded(true)
    } else if (board.every(square => square !== null)) {
      setWinner('draw')
      setGameEnded(true)
    }
  }, [board])

  const handleClick = (index: number) => {
    if (gameEnded || board[index]) return

    const newBoard = board.slice()
    newBoard[index] = currentPlayer
    setBoard(newBoard)
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
  }

  const renderSquare = (index: number) => (
    <motion.button
      className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-glass rounded-lg text-4xl font-bold flex items-center justify-center shadow-lg transition-all duration-300 ease-out"
      onClick={() => handleClick(index)}
      whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px 5px rgba(0, 255, 204, 0.6)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {board[index] && (
          <motion.span
            key={board[index]}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={board[index] === 1 ? 'text-neon-green' : 'text-neon-pink'}
          >
            {board[index] === 1 ? '✕' : '○'}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer(winner === 2 ? 1 : 2)
    setWinner(null)
    setGameEnded(false)
  }

  const startGame = () => {
    if (player1Name && player2Name) {
      setGameStarted(true);
      resetGame(); // Reset the game when starting
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-pink-500 p-4">
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-8 text-center neon-text"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        Hasnain&apos;s Coding World
      </motion.h1>

      {/* Player Name Input Form */}
      {!gameStarted && (
        <div className="bg-black bg-opacity-30 p-4 sm:p-8 rounded-xl backdrop-blur-md shadow-lg relative w-full max-w-lg">
          <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-6">Enter Player Names</h1>
          <input
            type="text"
            placeholder="Player 1 Name (✕)"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-white"
          />
          <input
            type="text"
            placeholder="Player 2 Name (○)"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-white"
          />
          <motion.button
            className="w-full py-2 px-4 bg-glass-button text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-glow"
            onClick={startGame}
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px 8px rgba(255, 255, 255, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game
          </motion.button>
        </div>
      )}

      {/* Game Board */}
      {gameStarted && (
        <div className="bg-black bg-opacity-30 p-4 sm:p-8 rounded-xl backdrop-blur-md shadow-lg relative w-full max-w-lg">
          <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-6">Professional Tic Tac Toe</h1>
          <div className="flex justify-between mb-4 text-sm sm:text-lg lg:text-xl">
            <div className="text-neon-green font-semibold">{player1Name} (✕): {scores.player1}</div>
            <div className="text-neon-pink font-semibold">{player2Name} (○): {scores.player2}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Array(9).fill(null).map((_, index) => renderSquare(index))}
          </div>
          <motion.div
            className="text-center text-white text-lg sm:text-2xl font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {!gameEnded && (
              <span>
                Current turn: {currentPlayer === 1 ? player1Name : player2Name} ({currentPlayer === 1 ? '✕' : '○'})
              </span>
            )}
          </motion.div>
          <motion.button
            className="w-full py-2 px-4 bg-glass-button text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-glow"
            onClick={resetGame}
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px 8px rgba(255, 255, 255, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            New Game
          </motion.button>

          <AnimatePresence>
            {gameEnded && (
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white p-4 sm:p-8 rounded-xl text-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-pink-700">
                    {winner === 'draw' ? "It's a Draw!" : `Congratulations ${winner === 1 ? player1Name : player2Name} Win!`}
                  </h2>
                  <p className="text-md sm:text-xl mb-6 text-gray-700">
                    {winner === 'draw' 
                      ? "Great game! It's a tie." 
                      : `Congratulations to ${winner === 1 ? player1Name : player2Name} (${winner === 1 ? '✕' : '○'}) for winning the game!`}
                  </p>
                  <motion.button
                    className="py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition-colors"
                    onClick={resetGame}
                    whileHover={{ scale: 1.05 }}
                  >
                    Play Again
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

function calculateWinner(squares: Array<number | null>): number | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] // Return the winning player (1 or 2)
    }
  }
  return null
}
