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
  NPC:     { symbol: "", class: "npc" }
};

// Base grid filled with ground tiles
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('ground'));

// Handcrafted walls and truth tiles
const predefinedWalls = [
  [4, 4], [5, 4], [6, 4],
  [6, 5], [6, 6]
];

const predefinedSpecialTiles = [
  { x: 10, y: 10, type: 'EMBER' },
  { x: 12, y: 10, type: 'ECHO' },
  { x: 14, y: 10, type: 'LENS' }
];

// Simple NPC placement
const predefinedNPCs = [
  { x: 8, y: 8 }
];

predefinedWalls.forEach(([x, y]) => {
  if (grid[y] && grid[y][x] !== undefined) {
    grid[y][x] = 'wall';
  }
});

predefinedSpecialTiles.forEach(({ x, y, type }) => {
  if (grid[y] && grid[y][x] !== undefined) {
    grid[y][x] = type;
  }
});

predefinedNPCs.forEach(({ x, y }) => {
  if (grid[y] && grid[y][x] !== undefined) {
    grid[y][x] = 'NPC';
  }
});

let playerPos = { x: 1, y: 1 };

// Build DOM based on predefined layout
for (let y = 0; y < gridSize; y++) {
  for (let x = 0; x < gridSize; x++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.x = x;
    div.dataset.y = y;

    const tileType = grid[y][x];
    if (tileType === 'wall') {
      div.classList.add('wall');
    } else if (tileType === 'NPC') {
      div.classList.add('npc');
      addNPCInteraction(div);
    } else if (TILE_TYPES[tileType]) {
      const { symbol, class: tileClass } = TILE_TYPES[tileType];
      div.classList.add('truth', tileClass);
      div.textContent = symbol;
    }

    div.addEventListener('click', () => handleTileClick(x, y));
    container.appendChild(div);
  }
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

function addNPCInteraction(div) {
  let lastTap = 0;
  div.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      openDialogue();
    }
    lastTap = now;
  });
}

function openDialogue() {
  const oldBox = document.querySelector('.dialogue-box');
  if (oldBox) oldBox.remove();

  const box = document.createElement('div');
  box.className = 'dialogue-box';
  box.innerHTML = `
    <p><strong>Echo:</strong> “The unexamined life is not worth living.”</p>
    <button onclick="closeDialogue()">Close</button>
  `;
  document.body.appendChild(box);
}

function closeDialogue() {
  const box = document.querySelector('.dialogue-box');
  if (box) box.remove();
}
