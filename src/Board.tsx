/*
 * (#)Board.tsx 0.1.0   10/16/2025
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
import Square from './Square';
import { calculateWinner, isGameOver } from "./utils";  // Import the functions

type PlayFunction = (squares: Array<string | null>) => void;
type StartOverFunction = () => void;

/** The interface for the component's props for clarity and type safety. */
interface BoardProps {
    xIsNext: boolean;
    squares: Array<string | null>;
    onPlay: PlayFunction;
    onStartOver: StartOverFunction;
}

/**
 * The Board component.
 *
 * @param   {props} BoardProps
 * @returns         {JSX.Element}
 */
export function Board({ xIsNext,
                        squares,
                        onPlay,
                        onStartOver }: BoardProps): JSX.Element {
    /**
     * Handles a click event on a square.
     *
     * @param   {number}    index
     * @returns             {void}
     */
    function handleClick(index: number): void {
        if (squares[index] || calculateWinner(squares)) {
            return;
        }

        const nextSquares: (string | null)[] = squares.slice();  // Copy the squares array

        if (xIsNext) {
            nextSquares[index] = 'X';
        } else {
            nextSquares[index] = 'O';
        }

        onPlay(nextSquares);
    }

    const winner: string | null = calculateWinner(squares);
    let status: string;

    if (winner) {
        status = 'Winner: ' + winner + '!';
    } else if (isGameOver(squares)) {
        status = 'Game over';
    } else {
        status = 'Next player: ' + (xIsNext ? "X" : "O");
    }

    const rows: JSX.Element[] = [0, 3, 6].map((item, index): JSX.Element => {
        return (
            <div className="board-row" key={index}>
                <Square value={squares[item]} onSquareClick={() => handleClick(item)} />
                <Square value={squares[item + 1]} onSquareClick={() => handleClick(item + 1)} />
                <Square value={squares[item + 2]} onSquareClick={() => handleClick(item + 2)} />
            </div>
        )
    });

    // Fragments <></> can wrap multiple elements together
    // Arrow functions are called when the square is clicked

    return (
        <>
            <div className="status">{status}</div>
            {rows}
            <div className="start-over">
                <button className="start-over-button" onClick={onStartOver}>Start over</button>
            </div>
        </>
    );
}

export default Board;
