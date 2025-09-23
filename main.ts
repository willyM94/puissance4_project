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
