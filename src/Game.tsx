/*
 * (#)Game.tsx  0.1.0   10/16/2025
 *
 * @author  Jonathan Parker
 * @version 0.1.0
 * @since   0.1.0
 *
 * MIT License
 *
 * Copyright (c) 2025 Jonathan M. Parker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import './styles/App.css';          // Runs the CSS file without importing it
import type { JSX } from "react";
import Board from './Board.jsx';
import { useState } from 'react';   // Imports the useState function

/**
 * The Game component.
 *
 * @returns {JSX.Element}
 */
function Game(): JSX.Element {
    // An array with a single array of nine elements; will be appended to
    const [history, setHistory] = useState([new Array<string | null>(9).fill(null)]);

    // A move counter
    const [currentMove, setCurrentMove] = useState<number>(0);

    // The current squares are always the currently selected move in the history
    const currentSquares: Array<string | null> = history[currentMove];

    // X is next when the current move is even
    const xIsNext: boolean = currentMove % 2 === 0;

    /**
     * Handle the play.
     *
     * @param {Array<string | null>}    nextSquares
     */
    function handlePlay(nextSquares: Array<string | null>): void {
        // The spread operator (...) enumerates everything in history so this call appends nextSquares to history
        // The history is from the beginning only to the current move

        const nextHistory: (string|null)[][] = [...history.slice(0, currentMove + 1), nextSquares];

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    /**
     * Go to the specified move.
     *
     * @param {number}  nextMove
     */
    function gotoMove(nextMove: number): void {
        setCurrentMove(nextMove);
    }

    /**
     * Start the game over.
     */
    function startOver(): void {
        const freshHistory: (string|null)[][] = [new Array<string | null>(9).fill(null)];
        const freshCurrentMove = 0;

        setHistory(freshHistory);
        setCurrentMove(freshCurrentMove);
    }

    // One <li> returned for each move in the history array
    // The underscore prepended to squares indicates that the parameter is unused

    const moves: JSX.Element[] = history.map((_squares: Array<string | null>, move: number): JSX.Element => {
        let description;

        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={move}>
                <button
                    disabled={history.length === 1}
                    className="fixed-button"
                    onClick={() => gotoMove(move)}>
                    {description}
                </button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    onStartOver={startOver} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;
