export const ROWS = 6;
export const COLS = 7;

export function createGrid(): string[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill('.'));
}

export function printGrid(grid: string[][]): void {
    console.clear();

    // Première ligne vide pour éviter mélange avec [LOG]
    let output = "\n";

    // Numéros des colonnes
    output += "0 1 2 3 4 5 6\n";

    // Séparation ASCII
    output += "-".repeat(COLS * 2 - 1) + "\n";

    // Grille
    output += grid.map(row => row.join(' ')).join('\n');

    console.log(output);
}

export interface Player {
    id: number;
    name: string;
    symbol: string;
}

export const players: Player[] = [
    { id: 1, name: 'Joueur 1', symbol: 'X' },
    { id: 2, name: 'Joueur 2', symbol: 'O' },
];

export function dropToken(grid: string[][], col: number, symbol: string): boolean {
    for (let row = grid.length - 1; row >= 0; row--) {
        if (grid[row][col] === '.') {
            grid[row][col] = symbol;
            return true;
        }
    }
    return false;
}

export function isGridFull(grid: string[][]): boolean {
    return grid.every(row => row.every(cell => cell !== '.'));
}

import { ROWS, COLS } from './grid';

export function checkWin(grid: string[][], symbol: string): boolean {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (c + 3 < COLS && [0,1,2,3].every(i => grid[r][c+i] === symbol)) return true;
            if (r + 3 < ROWS && [0,1,2,3].every(i => grid[r+i][c] === symbol)) return true;
            if (r + 3 < ROWS && c + 3 < COLS && [0,1,2,3].every(i => grid[r+i][c+i] === symbol)) return true;
            if (r + 3 < ROWS && c - 3 >= 0 && [0,1,2,3].every(i => grid[r+i][c-i] === symbol)) return true;
        }
    }
    return false;
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

import { createGrid, printGrid } from './grid';
import { players } from './player';
import { dropToken, isGridFull } from './game';
import { checkWin } from './checkWin';
import { sleep } from './utils';

async function game() {
    let grid = createGrid();
    let currentPlayerIndex = 0;

    while (true) {
        printGrid(grid);
        await sleep(1000);

        const player = players[currentPlayerIndex];
        const input = prompt(`${player.name} (${player.symbol}), choisissez une colonne (0-6) :`);

        if (input === null) {
            console.log("Jeu arrêté par l'utilisateur.");
            break;
        }

        const col = parseInt(input);
        if (isNaN(col) || col < 0 || col >= 7) {
            console.log("Colonne invalide !");
            continue;
        }

        if (!dropToken(grid, col, player.symbol)) {
            console.log("Colonne pleine !");
            continue;
        }

        if (checkWin(grid, player.symbol)) {
            printGrid(grid);
            console.log(`${player.name} gagne ! 🎉`);
            break;
        }

        if (isGridFull(grid)) {
            printGrid(grid);
            console.log("Égalité ! 🤝");
            break;
        }

        currentPlayerIndex = 1 - currentPlayerIndex;
    }
}

game();
