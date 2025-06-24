const gridSize = 30;
let grid = [];
let playerPos = { x: 1, y: 1 }; // starting point
const container = document.getElementById('game-container');

const TILE_TYPES = {
  GROUND: { symbol: "", class: "ground" },
  NPC:    { symbol: "", class: "npc" }
};

// Create empty map (all ground)
grid = Array.from({ length: gridSize }, () =>
  Array.from({ length: gridSize }, () => 'GROUND')
);

// Place Glossarion
const glossarionPos = { x: 8, y: 8 };
grid[glossarionPos.y][glossarionPos.x] = 'NPC';

function drawGrid() {
  container.innerHTML = '';

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const type = grid[y][x];
      const div = document.createElement('div');
      div.classList.add('cell');

      if (type === 'NPC') {
        div.classList.add('npc');
        addNPCInteraction(div);
      }

      div.dataset.x = x;
      div.dataset.y = y;
      div.addEventListener('click', () => handleTileClick(x, y));
      container.appendChild(div);
    }
  }

  drawPlayer();
}

drawGrid();

function drawPlayer() {
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('player'));
  const index = playerPos.y * gridSize + playerPos.x;
  container.children[index].classList.add('player');
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
      grid[n.y][n.x] === 'GROUND'
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
  if (grid[y][x] !== 'GROUND') return;
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
  clearDialogue();

  const box = document.createElement('div');
  box.className = 'dialogue-box';

  box.innerHTML = `
    <p><strong>Glossarion:</strong> “Ah... the seeker arrives. Do you speak the language of silence, too?”</p>
    <button onclick="glossarionMore()">Know More</button>
    <button onclick="closeDialogue()">Leave</button>
  `;

  document.body.appendChild(box);
}

function glossarionMore() {
  clearDialogue();

  const box = document.createElement('div');
  box.className = 'dialogue-box';

  box.innerHTML = `
    <p><strong>Glossarion:</strong> “Language is not merely sound, but structure. Which would you explore?”</p>
    <button onclick="glossarionTopic('japanese')">Learn Japanese</button>
    <button onclick="glossarionTopic('russian')">Learn Russian</button>
    <button onclick="closeDialogue()">Leave</button>
  `;

  document.body.appendChild(box);
}

function glossarionTopic(topic) {
  clearDialogue();

  if (topic === 'japanese') {
    startJapaneseCourse();
  } else if (topic === 'russian') {
    // Future placeholder
    alert("Russian course coming soon.");
  }
}

function startJapaneseCourse() {
  clearDialogue();

  const course = document.createElement('div');
  course.id = 'course-container';
  document.body.appendChild(course);

  // Load lesson 1
  loadJapaneseLesson(0);
}

function clearDialogue() {
  const old = document.querySelector('.dialogue-box');
  if (old) old.remove();
}

function closeDialogue() {
  const box = document.querySelector('.dialogue-box');
  if (box) box.remove();
}
