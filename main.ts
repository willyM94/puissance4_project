const ROWS = 6;
const COLS = 7;

function createGrid(): string[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill('.'));
}

function printGrid(grid: string[][]): void {
    console.clear();

    // On construit tout le texte d’un coup
    let output = "\n"; // Première ligne vide
    output += "0 1 2 3 4 5 6\n"; // Entêtes colonnes

    // Ligne de séparation ASCII
    output += "-".repeat(COLS * 2 - 1) + "\n";

    // Affichage de la grille
    output += grid.map((row: string[]) => row.join(' ')).join('\n');

    console.log(output);
}

interface Player {
    id: number;
    name: string;
    symbol: string;
}

const players: Player[] = [
    { id: 1, name: 'Joueur 1', symbol: 'X' },
    { id: 2, name: 'Joueur 2', symbol: 'O' },
];

function dropToken(grid: string[][], col: number, symbol: string): boolean {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (grid[row][col] === '.') {
            grid[row][col] = symbol;
            return true;
        }
    }
    return false;
}

function isGridFull(grid: string[][]): boolean {
    return grid.every(row => row.every(cell => cell !== '.'));
}

function checkWin(grid: string[][], symbol: string): boolean {
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

// Fonction pause
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// -------------------
// Main interactif
// -------------------
async function game() {
    let grid = createGrid();
    let currentPlayerIndex = 0;

    while (true) {
        printGrid(grid);
        await sleep(1000); // pause 1s avant le prompt

        const player = players[currentPlayerIndex];
        const input = prompt(`${player.name} (${player.symbol}), choisissez une colonne (0-${COLS-1}) :`);

        if (input === null) {
            console.log("Jeu arrêté par l'utilisateur.");
            break;
        }

        const col = parseInt(input);
        if (isNaN(col) || col < 0 || col >= COLS) {
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

        currentPlayerIndex = 1 - currentPlayerIndex; // change de joueur
    }
}

game();
