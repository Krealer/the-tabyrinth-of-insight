const gridSize = 30;
const container = document.getElementById('game-container');

// Definition for the 7 core tiles of truth
const TILE_TYPES = {
  EMBER: { name: 'Ember of Compounding', symbol: '∞', class: 'tile-ember' },
  ECHO: { name: 'Echo of Silence', symbol: 'Ψ', class: 'tile-echo' },
  LENS: { name: 'Lens of Attention', symbol: '👁️', class: 'tile-lens' },
  MIRROR: { name: 'Mirror of Bias', symbol: '🔍', class: 'tile-mirror' },
  MARK: { name: 'Questioner\u2019s Mark', symbol: '❓', class: 'tile-mark' },
  MAPLESS: { name: 'Mapless Path', symbol: '🗺️✖️', class: 'tile-mapless' },
  STONE: { name: 'Stone of Momentum', symbol: '⚙️', class: 'tile-stone' },
};

let grid = [];
let playerPos = { x: 1, y: 1 };

// Build grid
for (let y = 0; y < gridSize; y++) {
  let row = [];
  for (let x = 0; x < gridSize; x++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.x = x;
    div.dataset.y = y;

    // Random walls (skip player's starting point)
    if (Math.random() < 0.15 && !(x === 1 && y === 1)) {
      div.classList.add('wall');
      row.push('wall');
    } else {
      row.push('ground');
    }

    // Handle click/tap
    div.addEventListener('click', () => handleTileClick(x, y));
    container.appendChild(div);
  }
  grid.push(row);
}

placeSpecialTiles();

function placeSpecialTiles() {
  const cells = Array.from(container.children);
  for (const [key, tile] of Object.entries(TILE_TYPES)) {
    const count = 1 + Math.floor(Math.random() * 2); // 1 or 2 of each
    for (let i = 0; i < count; i++) {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        if (grid[y][x] === 'ground' && !(x === playerPos.x && y === playerPos.y)) {
          grid[y][x] = key;
          const index = y * gridSize + x;
          const cell = cells[index];
          cell.classList.add('special-tile', tile.class);
          cell.dataset.symbol = tile.symbol;
          cell.title = tile.name;
          placed = true;
        }
      }
    }
  }
}

function drawPlayer() {
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('player'));
  const index = playerPos.y * gridSize + playerPos.x;
  container.children[index].classList.add('player');
}
drawPlayer();
function checkSpecialTile() {
  const key = grid[playerPos.y][playerPos.x];
  const tile = TILE_TYPES[key];
  if (tile) {
    console.log(`${tile.name} activated`);
  }
}


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
  checkSpecialTile();
  setTimeout(() => moveAlongPath(path), 60);
}
