const container = document.getElementById('game-container');
const gridSize = 30;

const TILE_TYPES = {
  EMBER:   { symbol: "∞", class: "tile-ember" },
  ECHO:    { symbol: "Ψ", class: "tile-echo" },
  LENS:    { symbol: "👁️", class: "tile-lens" },
  MIRROR:  { symbol: "🔍", class: "tile-mirror" },
  MARK:    { symbol: "❓", class: "tile-mark" },
  MAPLESS: { symbol: "🗺️✖️", class: "tile-mapless" },
  STONE:   { symbol: "⚙️", class: "tile-stone" },
};

let grid = [];
let specialTiles = [];
let playerPos = { x: 1, y: 1 };

// Helper to avoid placing special tiles on walls or near player
function isValidSpecialTile(x, y) {
  if (x === 1 && y === 1) return false;
  if (grid[y]?.[x] === 'wall') return false;
  return true;
}

// Function to place special tiles
function placeSpecialTiles(type, count) {
  let placed = 0;
  while (placed < count) {
    let x = Math.floor(Math.random() * gridSize);
    let y = Math.floor(Math.random() * gridSize);
    if (isValidSpecialTile(x, y) && !specialTiles.find(t => t.x === x && t.y === y)) {
      specialTiles.push({ x, y, type });
      placed++;
    }
  }
}

// Place each truth tile 2 times
for (let key in TILE_TYPES) {
  placeSpecialTiles(key, 2);
}

// Generate grid with walls and special tiles
for (let y = 0; y < gridSize; y++) {
  let row = [];
  for (let x = 0; x < gridSize; x++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.x = x;
    div.dataset.y = y;

    // Is this a special tile?
    const special = specialTiles.find(t => t.x === x && t.y === y);
    if (special) {
      const { symbol, class: tileClass } = TILE_TYPES[special.type];
      div.classList.add('truth', tileClass);
      div.textContent = symbol;
      row.push(special.type); // track by type key
    } else if (Math.random() < 0.15 && !(x === 1 && y === 1)) {
      div.classList.add('wall');
      row.push('wall');
    } else {
      row.push('ground');
    }

    div.addEventListener('click', () => handleTileClick(x, y));
    container.appendChild(div);
  }
  grid.push(row);
}

function drawPlayer() {
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('player'));
  const index = playerPos.y * gridSize + playerPos.x;
  container.children[index].classList.add('player');
}
drawPlayer();


// A* Pathfinding
function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getNeighbors(node) {
  const dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 }
  ];
  return dirs
    .map(d => ({ x: node.x + d.x, y: node.y + d.y }))
    .filter(n =>
      n.x >= 0 && n.y >= 0 &&
      n.x < gridSize && n.y < gridSize &&
      grid[n.y][n.x] !== 'wall'
    );
}

function aStar(start, goal) {
  const key = ({ x, y }) => `${x},${y}`;
  let openSet = [start];
  let cameFrom = new Map();
  let gScore = { [key(start)]: 0 };
  let fScore = { [key(start)]: heuristic(start, goal) };

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[key(a)] - fScore[key(b)]);
    const current = openSet.shift();
    if (current.x === goal.x && current.y === goal.y) {
      let path = [];
      let temp = current;
      while (cameFrom.has(key(temp))) {
        path.push(temp);
        temp = cameFrom.get(key(temp));
      }
      return path.reverse();
    }

    for (let neighbor of getNeighbors(current)) {
      const tentativeG = gScore[key(current)] + 1;
      if (tentativeG < (gScore[key(neighbor)] ?? Infinity)) {
        cameFrom.set(key(neighbor), current);
        gScore[key(neighbor)] = tentativeG;
        fScore[key(neighbor)] = tentativeG + heuristic(neighbor, goal);
        if (!openSet.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  return null;
}

function handleTileClick(x, y) {
  if (grid[y][x] === 'wall') return;
  const path = aStar(playerPos, { x, y });
  if (!path) return;
  moveAlongPath(path);
}

function moveAlongPath(path) {
  if (path.length === 0) return;
  const next = path.shift();
  playerPos = next;
  drawPlayer();

  const tileType = grid[next.y][next.x];
  if (TILE_TYPES[tileType]) {
    console.log(`Stepped on: ${tileType} → ${TILE_TYPES[tileType].symbol}`);
  }

  setTimeout(() => moveAlongPath(path), 60);
}
