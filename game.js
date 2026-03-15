// Word Database
const WORD_DATABASE = {
  animals: [
    'Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox', 'Rabbit', 'Mouse',
    'Horse', 'Cow', 'Pig', 'Chicken', 'Duck', 'Bird', 'Fish', 'Shark', 'Whale', 'Dolphin',
    'Snake', 'Lizard', 'Frog', 'Turtle', 'Crab', 'Octopus', 'Butterfly', 'Bee', 'Spider', 'Ant',
    'Giraffe', 'Zebra', 'Monkey', 'Gorilla', 'Panda', 'Koala', 'Penguin', 'Polar Bear', 'Owl', 'Eagle'
  ],
  food: [
    'Pizza', 'Burger', 'Pasta', 'Rice', 'Bread', 'Egg', 'Cheese', 'Milk', 'Apple', 'Banana',
    'Orange', 'Grape', 'Strawberry', 'Watermelon', 'Mango', 'Tomato', 'Potato', 'Carrot', 'Broccoli', 'Onion',
    'Garlic', 'Chicken', 'Beef', 'Pork', 'Fish', 'Shrimp', 'Lobster', 'Ice Cream', 'Cake', 'Cookie',
    'Chocolate', 'Candy', 'Coffee', 'Tea', 'Juice', 'Water', 'Wine', 'Beer', 'Soup', 'Salad'
  ],
  movies: [
    'Titanic', 'Avatar', 'Frozen', 'Spider-Man', 'Batman', 'Superman', 'Iron Man', 'Star Wars', 'Harry Potter',
    'The Matrix', 'Jurassic Park', 'The Lion King', 'Finding Nemo', 'Toy Story', 'Shrek', 'Inception',
    'Gladiator', 'The Godfather', 'Pulp Fiction', 'Forrest Gump', 'The Avengers', 'Joker', 'Black Panther',
    'Moana', 'Coco', 'Up', 'Wall-E', 'Inside Out', 'Minions', 'Despicable Me'
  ],
  countries: [
    'USA', 'China', 'India', 'Russia', 'Brazil', 'Japan', 'Germany', 'UK', 'France', 'Italy',
    'Canada', 'Australia', 'Mexico', 'Spain', 'South Korea', 'Indonesia', 'Turkey', 'Saudi Arabia', 'Switzerland', 'Sweden',
    'Poland', 'Netherlands', 'Belgium', 'Norway', 'Denmark', 'Finland', 'Austria', 'Greece', 'Portugal', 'Ireland',
    'Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Thailand', 'Vietnam'
  ],
  sports: [
    'Soccer', 'Basketball', 'Baseball', 'Football', 'Tennis', 'Golf', 'Hockey', 'Boxing', 'Wrestling', 'Swimming',
    'Running', 'Cycling', 'Skiing', 'Snowboarding', 'Surfing', 'Volleyball', 'Badminton', 'Table Tennis', 'Cricket', 'Rugby',
    'Bowling', 'Fishing', 'Rock Climbing', 'Gymnastics', 'Archery', 'Fencing', 'Rowing', 'Sailing', 'Kayaking', 'Polo'
  ],
  objects: [
    'Phone', 'Computer', 'Television', 'Clock', 'Chair', 'Table', 'Lamp', 'Bed', 'Pillow', 'Blanket',
    'Mirror', 'Window', 'Door', 'Key', 'Lock', 'Wallet', 'Watch', 'Glasses', 'Hat', 'Scarf',
    'Umbrella', 'Backpack', 'Bottle', 'Cup', 'Plate', 'Fork', 'Knife', 'Spoon', 'Bag', 'Shoe',
    'Car', 'Bicycle', 'Motorcycle', 'Train', 'Plane', 'Boat', 'Book', 'Pen', 'Pencil', 'Paper'
  ],
  jobs: [
    'Doctor', 'Nurse', 'Teacher', 'Engineer', 'Lawyer', 'Police', 'Firefighter', 'Chef', 'Pilot', 'Driver',
    'Farmer', 'Fisherman', 'Miner', 'Builder', 'Painter', 'Singer', 'Actor', 'Dancer', 'Writer', 'Artist',
    'Photographer', 'Journalist', 'Banker', 'Shopkeeper', 'Butcher', 'Baker', 'Carpenter', 'Plumber', 'Electrician', 'Mechanic',
    'Soldier', 'Scientist', 'Programmer', 'Designer', 'Manager', 'Secretary', 'Receptionist', 'Dentist', 'Veterinarian', 'Architect'
  ],
  vehicles: [
    'Car', 'Truck', 'Motorcycle', 'Bicycle', 'Bus', 'Train', 'Airplane', 'Helicopter', 'Boat', 'Ship',
    'Submarine', 'Scooter', 'Van', 'Taxi', 'Ambulance', 'Fire Truck', 'Police Car', 'Tractor', 'Crane', 'Excavator',
    'Bulldozer', 'Forklift', 'RV', 'Limousine', 'Sports Car', 'Jeep', 'SUV', 'Sedan', 'Hatchback', 'Convertible'
  ],
  places: [
    'Beach', 'Mountain', 'Forest', 'Desert', 'Island', 'Lake', 'River', 'Ocean', 'Valley', 'Cave',
    'Park', 'School', 'Hospital', 'Airport', 'Station', 'Mall', 'Restaurant', 'Hotel', 'Museum', 'Library',
    'Zoo', 'Aquarium', 'Stadium', 'Theater', 'Cinema', 'Church', 'Temple', 'Mosque', 'Castle', 'Palace',
    'Farm', 'Factory', 'Office', 'Gym', 'Pool', 'Garden', 'Market', 'Bakery', 'Cafe', 'Bar'
  ]
};

const ALL_WORDS = Object.values(WORD_DATABASE).flat();

// Game State
let gameState = {
  players: [],
  category: 'animals',
  imposterCount: 1,
  gameDuration: 5,
  currentRound: 1,
  currentPlayerIndex: 0,
  words: [],
  imposters: [],
  clues: [],
  timeRemaining: 0,
  timerInterval: null,
  votingComplete: [],
  eliminatedPlayers: []
};

// DOM Elements
const screens = {
  home: document.getElementById('home-screen'),
  howto: document.getElementById('howto-screen'),
  setup: document.getElementById('setup-screen'),
  reveal: document.getElementById('reveal-screen'),
  gameplay: document.getElementById('gameplay-screen'),
  discussion: document.getElementById('discussion-screen'),
  voting: document.getElementById('voting-screen'),
  voteResults: document.getElementById('vote-results-screen'),
  results: document.getElementById('results-screen')
};

// Utility Functions
function showScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[screenName].classList.add('active');
  
  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.screen === screenName) {
      link.classList.add('active');
    }
  });
  
  // Hide mobile menu
  const menu = document.querySelector('.mobile-menu');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  if (menu) menu.classList.remove('active');
  if (menuBtn) menuBtn.classList.remove('active');
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getCategoryWords(category) {
  if (category === 'random') {
    return shuffleArray(ALL_WORDS).slice(0, 20);
  }
  return shuffleArray(WORD_DATABASE[category] || WORD_DATABASE.animals);
}

// Navigation
document.querySelectorAll('[data-screen]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const screenName = el.dataset.screen;
    if (screenName) showScreen(screenName);
  });
});

// Mobile menu - ensure it's hidden on load
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.mobile-menu');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  
  // Function to toggle menu with animation
  const toggleMenu = () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
  };
  
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }
  
  // Ensure menu starts hidden
  if (menu) {
    menu.style.display = '';
  }
});

// Setup Screen
const playerNameInput = document.getElementById('player-name-input');
const addPlayerBtn = document.getElementById('add-player-btn');
const playerList = document.getElementById('player-list');
const beginGameBtn = document.getElementById('begin-game-btn');
const imposterCountSlider = document.getElementById('imposter-count');
const imposterCountDisplay = document.getElementById('imposter-count-display');
const timerSelect = document.getElementById('timer-select');
const timerDisplay = document.getElementById('timer-display');
const categorySelect = document.getElementById('category-select');
const playerCountNum = document.getElementById('player-count-num');

imposterCountSlider.addEventListener('input', (e) => {
  imposterCountDisplay.textContent = e.target.value;
  gameState.imposterCount = parseInt(e.target.value);
  updateBeginButton();
});

timerSelect.addEventListener('input', (e) => {
  timerDisplay.textContent = e.target.value;
  gameState.gameDuration = parseInt(e.target.value);
});

categorySelect.addEventListener('change', (e) => {
  gameState.category = e.target.value;
});

function updateBeginButton() {
  const maxImposters = Math.min(3, Math.floor(gameState.players.length / 2));
  const canStart = gameState.players.length >= 3 && gameState.imposterCount <= maxImposters;
  beginGameBtn.disabled = !canStart;
  if (!canStart && gameState.players.length >= 3) {
    beginGameBtn.title = `Maximum ${maxImposters} imposters for ${gameState.players.length} players`;
  } else {
    beginGameBtn.title = '';
  }
}

addPlayerBtn.addEventListener('click', addPlayer);
playerNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addPlayer();
});

function addPlayer() {
  const name = playerNameInput.value.trim();
  if (name && gameState.players.length < 12) {
    gameState.players.push({ name, isImposter: false, eliminated: false });
    renderPlayerList();
    playerNameInput.value = '';
    updateBeginButton();
  }
}

function renderPlayerList() {
  playerCountNum.textContent = gameState.players.length;
  playerList.innerHTML = gameState.players.map((player, index) => `
    <li>
      <span>${player.name}</span>
      <button class="remove-player" data-index="${index}">&times;</button>
    </li>
  `).join('');
  
  document.querySelectorAll('.remove-player').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      gameState.players.splice(index, 1);
      renderPlayerList();
      updateBeginButton();
    });
  });
}

beginGameBtn.addEventListener('click', startGame);

function startGame() {
  gameState.category = categorySelect.value;
  gameState.imposterCount = parseInt(imposterCountSlider.value);
  gameState.gameDuration = parseInt(timerSelect.value);
  gameState.currentRound = 1;
  gameState.currentPlayerIndex = 0;
  gameState.clues = [];
  gameState.votingComplete = [];
  gameState.eliminatedPlayers = [];
  
  // Select words
  const categoryWords = getCategoryWords(gameState.category);
  const mainWord = categoryWords[0];
  
  let imposterWord;
  if (gameState.category !== 'random') {
    const similarWords = {
      animals: ['Cat', 'Dog', 'Mouse', 'Bird', 'Fish'],
      food: ['Pizza', 'Pasta', 'Rice', 'Bread', 'Cake'],
      movies: ['Titanic', 'Avatar', 'Frozen', 'Spider-Man', 'Batman'],
      countries: ['USA', 'China', 'India', 'Japan', 'France'],
      sports: ['Soccer', 'Basketball', 'Tennis', 'Golf', 'Swimming'],
      objects: ['Phone', 'Chair', 'Table', 'Lamp', 'Book'],
      jobs: ['Doctor', 'Teacher', 'Engineer', 'Chef', 'Pilot'],
      vehicles: ['Car', 'Bus', 'Train', 'Boat', 'Bike'],
      places: ['Beach', 'Mountain', 'Park', 'School', 'Mall']
    };
    const similar = similarWords[gameState.category] || categoryWords.slice(1, 4);
    imposterWord = similar[Math.floor(Math.random() * similar.length)];
  } else {
    imposterWord = categoryWords[1];
  }
  
  // Reset players
  gameState.players.forEach(p => {
    p.isImposter = false;
    p.eliminated = false;
  });
  
  gameState.words = gameState.players.map(() => mainWord);
  gameState.imposters = [];
  
  // Assign imposters
  const playerIndices = shuffleArray([...Array(gameState.players.length).keys()]);
  for (let i = 0; i < gameState.imposterCount; i++) {
    const playerIndex = playerIndices[i];
    gameState.players[playerIndex].isImposter = true;
    gameState.words[playerIndex] = imposterWord;
    gameState.imposters.push(playerIndex);
  }
  
  showScreen('reveal');
  showRevealCard();
}

// Reveal Screen
const flipCard = document.getElementById('flip-card');
const revealPlayerName = document.getElementById('reveal-player-name');
const revealRoleLabel = document.getElementById('reveal-role-label');
const revealWord = document.getElementById('reveal-word');
const revealCurrent = document.getElementById('reveal-current');
const revealTotal = document.getElementById('reveal-total');
const nextPlayerBtn = document.getElementById('next-player-btn');

flipCard.addEventListener('click', () => {
  flipCard.classList.toggle('flipped');
});

function showRevealCard() {
  revealTotal.textContent = gameState.players.length;
  revealCurrent.textContent = gameState.currentPlayerIndex + 1;
  
  const player = gameState.players[gameState.currentPlayerIndex];
  revealPlayerName.textContent = player.name;
  revealRoleLabel.textContent = player.isImposter ? '🎭 You are the Imposter!' : '✅ You are a Civilian';
  revealWord.textContent = gameState.words[gameState.currentPlayerIndex];
  flipCard.classList.remove('flipped');
  
  if (gameState.currentPlayerIndex === gameState.players.length - 1) {
    nextPlayerBtn.textContent = '🎮 Start Game';
  } else {
    nextPlayerBtn.textContent = 'Next Player →';
  }
}

nextPlayerBtn.addEventListener('click', () => {
  if (gameState.currentPlayerIndex < gameState.players.length - 1) {
    gameState.currentPlayerIndex++;
    showRevealCard();
  } else {
    startGameplay();
  }
});

// Gameplay Screen
const timerFill = document.getElementById('timer-fill');
const timerText = document.getElementById('timer-text');
const currentRoundSpan = document.getElementById('current-round');
const currentPlayerName = document.getElementById('current-player-name');
const clueInput = document.getElementById('clue-input');
const submitClueBtn = document.getElementById('submit-clue-btn');
const cluesList = document.getElementById('clues-list');

function startGameplay() {
  showScreen('gameplay');
  gameState.currentPlayerIndex = 0;
  gameState.clues = [];
  startTimer();
  showCurrentPlayer();
}

function startTimer() {
  gameState.timeRemaining = gameState.gameDuration * 60;
  updateTimerDisplay();
  
  gameState.timerInterval = setInterval(() => {
    gameState.timeRemaining--;
    updateTimerDisplay();
    
    if (gameState.timeRemaining <= 0) {
      clearInterval(gameState.timerInterval);
      endCluePhase();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(gameState.timeRemaining / 60);
  const seconds = gameState.timeRemaining % 60;
  timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  const percentage = (gameState.timeRemaining / (gameState.gameDuration * 60)) * 100;
  timerFill.style.width = `${percentage}%`;
}

function showCurrentPlayer() {
  currentRoundSpan.textContent = gameState.currentRound;
  const player = gameState.players[gameState.currentPlayerName];
  currentPlayerName.textContent = player.name;
  clueInput.value = '';
  clueInput.focus();
}

function showCurrentPlayer() {
  // Skip eliminated players
  while (gameState.currentPlayerIndex < gameState.players.length && 
         gameState.players[gameState.currentPlayerIndex].eliminated) {
    gameState.currentPlayerIndex++;
  }
  
  if (gameState.currentPlayerIndex >= gameState.players.length) {
    endCluePhase();
    return;
  }
  
  currentRoundSpan.textContent = gameState.currentRound;
  const player = gameState.players[gameState.currentPlayerIndex];
  currentPlayerName.textContent = player.name;
  clueInput.value = '';
  clueInput.focus();
}

submitClueBtn.addEventListener('click', submitClue);
clueInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') submitClue();
});

function submitClue() {
  const clue = clueInput.value.trim();
  if (!clue) return;
  
  gameState.clues.push({
    playerIndex: gameState.currentPlayerIndex,
    playerName: gameState.players[gameState.currentPlayerIndex].name,
    clue: clue
  });
  
  renderClues();
  
  if (gameState.currentPlayerIndex < gameState.players.length - 1) {
    gameState.currentPlayerIndex++;
    showCurrentPlayer();
  } else {
    endCluePhase();
  }
}

function renderClues() {
  cluesList.innerHTML = gameState.clues.map(c => `
    <li>
      <span class="player-name">${c.playerName}</span>
      <span class="clue-text">"${c.clue}"</span>
    </li>
  `).join('');
}

function endCluePhase() {
  clearInterval(gameState.timerInterval);
  showScreen('discussion');
  startDiscussion();
}

// Discussion Screen
const discussionTimerDisplay = document.getElementById('discussion-timer');
const startVoteBtn = document.getElementById('start-vote-btn');

let discussionTime = 180;

function startDiscussion() {
  discussionTime = 180;
  discussionTimerDisplay.textContent = formatTime(discussionTime);
  
  gameState.timerInterval = setInterval(() => {
    discussionTime--;
    discussionTimerDisplay.textContent = formatTime(discussionTime);
    
    if (discussionTime <= 0) {
      clearInterval(gameState.timerInterval);
    }
  }, 1000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

startVoteBtn.addEventListener('click', () => {
  clearInterval(gameState.timerInterval);
  startVoting();
});

// Voting Screen
const voteList = document.getElementById('vote-list');
const voterName = document.getElementById('voter-name');
let currentVoterIndex = 0;

function startVoting() {
  showScreen('voting');
  currentVoterIndex = 0;
  gameState.votingComplete = [];
  showVotingForPlayer();
}

function showVotingForPlayer() {
  // Skip eliminated voters
  while (currentVoterIndex < gameState.players.length && 
         gameState.players[currentVoterIndex].eliminated) {
    currentVoterIndex++;
  }
  
  if (currentVoterIndex >= gameState.players.length) {
    showVoteResults();
    return;
  }
  
  const voter = gameState.players[currentVoterIndex];
  voterName.textContent = voter.name;
  
  const activePlayers = gameState.players.filter((p, i) => !p.eliminated && i !== currentVoterIndex);
  
  voteList.innerHTML = activePlayers.map((player, index) => `
    <li data-index="${gameState.players.indexOf(player)}">${player.name}</li>
  `).join('');
  
  document.querySelectorAll('.vote-list-modern li').forEach(li => {
    li.addEventListener('click', (e) => {
      const votedIndex = parseInt(e.target.dataset.index);
      gameState.votingComplete.push({
        voterIndex: currentVoterIndex,
        votedForIndex: votedIndex,
        voterName: gameState.players[currentVoterIndex].name,
        votedForName: gameState.players[votedIndex].name
      });
      
      currentVoterIndex++;
      showVotingForPlayer();
    });
  });
}

// Vote Results Screen
const voteResultsContent = document.getElementById('vote-results-content');
const continueBtn = document.getElementById('continue-btn');

function showVoteResults() {
  showScreen('vote-results');
  
  const voteCounts = {};
  gameState.votingComplete.forEach(vote => {
    voteCounts[vote.votedForIndex] = (voteCounts[vote.votedForIndex] || 0) + 1;
  });
  
  const sortedVotes = Object.entries(voteCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([index, count]) => ({ index: parseInt(index), count }));
  
  let resultsHTML = '';
  sortedVotes.forEach(v => {
    const player = gameState.players[v.index];
    const isImposter = player.isImposter;
    resultsHTML += `
      <p style="padding: 12px; background: ${isImposter ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)'}; border-radius: 10px; margin-bottom: 8px;">
        <strong>${player.name}</strong> — ${v.count} vote${v.count > 1 ? 's' : ''} ${isImposter ? '🎭' : ''}
      </p>
    `;
  });
  
  // Find eliminated player
  const eliminatedIndex = sortedVotes[0]?.index;
  const eliminatedPlayer = gameState.players[eliminatedIndex];
  
  if (eliminatedPlayer) {
    eliminatedPlayer.eliminated = true;
    gameState.eliminatedPlayers.push(eliminatedIndex);
    resultsHTML += `
      <p style="text-align: center; margin-top: 15px; padding: 12px; background: rgba(239,68,68,0.15); border-radius: 10px;">
        <strong>${eliminatedPlayer.name}</strong> has been eliminated!
      </p>
    `;
  }
  
  voteResultsContent.innerHTML = resultsHTML;
  
  // Check win conditions
  const remainingImposters = gameState.players.filter(p => p.isImposter && !p.eliminated).length;
  const remainingCivilians = gameState.players.filter(p => !p.isImposter && !p.eliminated).length;
  
  continueBtn.onclick = () => {
    if (remainingImposters === 0) {
      showResults(true);
    } else if (remainingImposters >= remainingCivilians) {
      showResults(false);
    } else {
      gameState.currentRound++;
      gameState.clues = [];
      startGameplay();
    }
  };
}

// Results Screen
const resultTitle = document.getElementById('result-title');
const resultContent = document.getElementById('result-content');
const resultIcon = document.getElementById('result-icon');
const playAgainBtn = document.getElementById('play-again-btn');

function showResults(civiliansWin) {
  showScreen('results');
  
  if (civiliansWin) {
    resultIcon.textContent = '🎉';
    resultTitle.textContent = 'Civilians Win!';
    resultTitle.className = 'result-title civilians-win';
  } else {
    resultIcon.textContent = '🎭';
    resultTitle.textContent = 'Imposters Win!';
    resultTitle.className = 'result-title imposters-win';
  }
  
  const impostersList = gameState.players.filter(p => p.isImposter).map(p => p.name).join(', ');
  const civiliansList = gameState.players.filter(p => !p.isImposter).map(p => p.name).join(', ');
  
  resultContent.innerHTML = `
    <p>🎭 Imposters: <strong>${impostersList}</strong></p>
    <p>✅ Civilians: <strong>civiliansList</strong></p>
  `;
}

playAgainBtn.addEventListener('click', () => {
  gameState.players = [];
  gameState.currentRound = 1;
  gameState.clues = [];
  gameState.votingComplete = [];
  gameState.eliminatedPlayers = [];
  renderPlayerList();
  showScreen('home');
});