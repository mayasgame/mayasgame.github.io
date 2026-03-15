// Word Database
const WORD_DATABASE = {
  animals: ['Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox', 'Rabbit', 'Mouse', 'Horse', 'Cow', 'Pig', 'Chicken', 'Duck', 'Bird', 'Fish', 'Shark', 'Whale', 'Dolphin', 'Snake', 'Lizard', 'Frog', 'Turtle', 'Crab', 'Octopus', 'Butterfly', 'Bee', 'Spider', 'Ant', 'Giraffe', 'Zebra', 'Monkey', 'Gorilla', 'Panda', 'Koala', 'Penguin', 'Polar Bear', 'Owl', 'Eagle'],
  food: ['Pizza', 'Burger', 'Pasta', 'Rice', 'Bread', 'Egg', 'Cheese', 'Milk', 'Apple', 'Banana', 'Orange', 'Grape', 'Strawberry', 'Watermelon', 'Mango', 'Tomato', 'Potato', 'Carrot', 'Broccoli', 'Onion', 'Garlic', 'Chicken', 'Beef', 'Pork', 'Fish', 'Shrimp', 'Lobster', 'Ice Cream', 'Cake', 'Cookie', 'Chocolate', 'Candy', 'Coffee', 'Tea', 'Juice', 'Water', 'Wine', 'Beer', 'Soup', 'Salad'],
  movies: ['Titanic', 'Avatar', 'Frozen', 'Spider-Man', 'Batman', 'Superman', 'Iron Man', 'Star Wars', 'Harry Potter', 'The Matrix', 'Jurassic Park', 'The Lion King', 'Finding Nemo', 'Toy Story', 'Shrek', 'Inception', 'Gladiator', 'The Godfather', 'Pulp Fiction', 'Forrest Gump', 'The Avengers', 'Joker', 'Black Panther', 'Moana', 'Coco', 'Up', 'Wall-E', 'Inside Out', 'Minions', 'Despicable Me'],
  countries: ['USA', 'China', 'India', 'Russia', 'Brazil', 'Japan', 'Germany', 'UK', 'France', 'Italy', 'Canada', 'Australia', 'Mexico', 'Spain', 'South Korea', 'Indonesia', 'Turkey', 'Saudi Arabia', 'Switzerland', 'Sweden', 'Poland', 'Netherlands', 'Belgium', 'Norway', 'Denmark', 'Finland', 'Austria', 'Greece', 'Portugal', 'Ireland', 'Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Thailand', 'Vietnam'],
  sports: ['Soccer', 'Basketball', 'Baseball', 'Football', 'Tennis', 'Golf', 'Hockey', 'Boxing', 'Wrestling', 'Swimming', 'Running', 'Cycling', 'Skiing', 'Snowboarding', 'Surfing', 'Volleyball', 'Badminton', 'Table Tennis', 'Cricket', 'Rugby', 'Bowling', 'Fishing', 'Rock Climbing', 'Gymnastics', 'Archery', 'Fencing', 'Rowing', 'Sailing', 'Kayaking', 'Polo'],
  objects: ['Phone', 'Computer', 'Television', 'Clock', 'Chair', 'Table', 'Lamp', 'Bed', 'Pillow', 'Blanket', 'Mirror', 'Window', 'Door', 'Key', 'Lock', 'Wallet', 'Watch', 'Glasses', 'Hat', 'Scarf', 'Umbrella', 'Backpack', 'Bottle', 'Cup', 'Plate', 'Fork', 'Knife', 'Spoon', 'Bag', 'Shoe', 'Car', 'Bicycle', 'Motorcycle', 'Train', 'Plane', 'Boat', 'Book', 'Pen', 'Pencil', 'Paper'],
  jobs: ['Doctor', 'Nurse', 'Teacher', 'Engineer', 'Lawyer', 'Police', 'Firefighter', 'Chef', 'Pilot', 'Driver', 'Farmer', 'Fisherman', 'Miner', 'Builder', 'Painter', 'Singer', 'Actor', 'Dancer', 'Writer', 'Artist', 'Photographer', 'Journalist', 'Banker', 'Shopkeeper', 'Butcher', 'Baker', 'Carpenter', 'Plumber', 'Electrician', 'Mechanic', 'Soldier', 'Scientist', 'Programmer', 'Designer', 'Manager', 'Secretary', 'Receptionist', 'Dentist', 'Veterinarian', 'Architect'],
  vehicles: ['Car', 'Truck', 'Motorcycle', 'Bicycle', 'Bus', 'Train', 'Airplane', 'Helicopter', 'Boat', 'Ship', 'Submarine', 'Scooter', 'Van', 'Taxi', 'Ambulance', 'Fire Truck', 'Police Car', 'Tractor', 'Crane', 'Excavator', 'Bulldozer', 'Forklift', 'RV', 'Limousine', 'Sports Car', 'Jeep', 'SUV', 'Sedan', 'Hatchback', 'Convertible'],
  places: ['Beach', 'Mountain', 'Forest', 'Desert', 'Island', 'Lake', 'River', 'Ocean', 'Valley', 'Cave', 'Park', 'School', 'Hospital', 'Airport', 'Station', 'Mall', 'Restaurant', 'Hotel', 'Museum', 'Library', 'Zoo', 'Aquarium', 'Stadium', 'Theater', 'Cinema', 'Church', 'Temple', 'Mosque', 'Castle', 'Palace', 'Farm', 'Factory', 'Office', 'Gym', 'Pool', 'Garden', 'Market', 'Bakery', 'Cafe', 'Bar']
};

const ALL_WORDS = Object.values(WORD_DATABASE).flat();

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

document.addEventListener('DOMContentLoaded', function() {
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

  function showScreen(name) {
    if (!screens[name]) return;
    Object.values(screens).forEach(function(s) { if (s) s.classList.remove('active'); });
    screens[name].classList.add('active');
    document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
    var activeLink = document.querySelector('.nav-link[data-screen="' + name + '"]');
    if (activeLink) activeLink.classList.add('active');
    var menu = document.querySelector('.mobile-menu');
    var menuBtn = document.querySelector('.mobile-menu-btn');
    if (menu) menu.classList.remove('active');
    if (menuBtn) menuBtn.classList.remove('active');
  }

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function getCategoryWords(cat) {
    if (cat === 'random') return shuffleArray(ALL_WORDS).slice(0, 20);
    return shuffleArray(WORD_DATABASE[cat] || WORD_DATABASE.animals);
  }

  document.querySelectorAll('[data-screen]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      if (el.dataset.screen) showScreen(el.dataset.screen);
    });
  });

  var menu = document.querySelector('.mobile-menu');
  var menuBtn = document.querySelector('.mobile-menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      var cs = window.getComputedStyle(menu).display;
      menu.style.display = cs === 'flex' ? 'none' : 'flex';
    });
  }

  var playerNameInput = document.getElementById('player-name-input');
  var addPlayerBtn = document.getElementById('add-player-btn');
  var playerList = document.getElementById('player-list');
  var beginGameBtn = document.getElementById('begin-game-btn');
  var imposterCountSlider = document.getElementById('imposter-count');
  var imposterCountDisplay = document.getElementById('imposter-count-display');
  var timerSelect = document.getElementById('timer-select');
  var timerDisplay = document.getElementById('timer-display');
  var categorySelect = document.getElementById('category-select');
  var playerCountNum = document.getElementById('player-count-num');

  imposterCountSlider.addEventListener('input', function(e) {
    imposterCountDisplay.textContent = e.target.value;
    gameState.imposterCount = parseInt(e.target.value);
    updateBeginButton();
  });

  timerSelect.addEventListener('input', function(e) {
    timerDisplay.textContent = e.target.value;
    gameState.gameDuration = parseInt(e.target.value);
  });

  categorySelect.addEventListener('change', function(e) {
    gameState.category = e.target.value;
  });

  function updateBeginButton() {
    var maxImp = Math.min(3, Math.floor(gameState.players.length / 2));
    var canStart = gameState.players.length >= 3 && gameState.imposterCount <= maxImp;
    beginGameBtn.style.opacity = canStart ? '1' : '0.5';
    beginGameBtn.style.cursor = canStart ? 'pointer' : 'not-allowed';
  }

  addPlayerBtn.addEventListener('click', addPlayer);
  playerNameInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') addPlayer(); });

  function addPlayer() {
    var name = playerNameInput.value.trim();
    if (name && gameState.players.length < 12) {
      gameState.players.push({ name: name, isImposter: false, eliminated: false });
      renderPlayerList();
      playerNameInput.value = '';
      updateBeginButton();
    }
  }

  function renderPlayerList() {
    playerCountNum.textContent = gameState.players.length;
    playerList.innerHTML = gameState.players.map(function(p, i) {
      return '<li><span>' + p.name + '</span><button class="remove-player" data-index="' + i + '">&times;</button></li>';
    }).join('');
    document.querySelectorAll('.remove-player').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        gameState.players.splice(parseInt(e.target.dataset.index), 1);
        renderPlayerList();
        updateBeginButton();
      });
    });
  }

  beginGameBtn.addEventListener('click', startGame);

  function startGame() {
    if (gameState.players.length < 3) { alert('Need at least 3 players!'); return; }
    gameState.category = categorySelect.value;
    gameState.imposterCount = parseInt(imposterCountSlider.value);
    gameState.gameDuration = parseInt(timerSelect.value);
    gameState.currentRound = 1;
    gameState.currentPlayerIndex = 0;
    gameState.clues = [];
    gameState.votingComplete = [];
    gameState.eliminatedPlayers = [];

    var words = getCategoryWords(gameState.category);
    var mainWord = words[0];
    var similar = { animals: ['Cat','Dog','Mouse','Bird','Fish'], food: ['Pizza','Pasta','Rice','Bread','Cake'], movies: ['Titanic','Avatar','Frozen','Spider-Man','Batman'], countries: ['USA','China','India','Japan','France'], sports: ['Soccer','Basketball','Tennis','Golf','Swimming'], objects: ['Phone','Chair','Table','Lamp','Book'], jobs: ['Doctor','Teacher','Engineer','Chef','Pilot'], vehicles: ['Car','Bus','Train','Boat','Bike'], places: ['Beach','Mountain','Park','School','Mall'] };
    var impWord = (similar[gameState.category] || words.slice(1,5))[Math.floor(Math.random() * 5)];

    gameState.players.forEach(function(p) { p.isImposter = false; p.eliminated = false; });
    gameState.words = gameState.players.map(function() { return mainWord; });
    var idxs = shuffleArray([0,1,2,3,4,5,6,7,8,9,10,11].slice(0, gameState.players.length));
    for (var i = 0; i < gameState.imposterCount; i++) {
      var pi = idxs[i];
      gameState.players[pi].isImposter = true;
      gameState.words[pi] = impWord;
    }
    showScreen('reveal');
    showRevealCard();
  }

  var flipCard = document.getElementById('flip-card');
  var nextPlayerBtn = document.getElementById('next-player-btn');

  if (flipCard) flipCard.addEventListener('click', function() { flipCard.classList.toggle('flipped'); });

  function showRevealCard() {
    document.getElementById('reveal-total').textContent = gameState.players.length;
    document.getElementById('reveal-current').textContent = gameState.currentPlayerIndex + 1;
    var p = gameState.players[gameState.currentPlayerIndex];
    document.getElementById('reveal-player-name').textContent = p.name;
    document.getElementById('reveal-role-label').textContent = p.isImposter ? '🎭 You are the Imposter!' : '✅ You are a Civilian';
    document.getElementById('reveal-word').textContent = gameState.words[gameState.currentPlayerIndex];
    document.getElementById('flip-card').classList.remove('flipped');
    nextPlayerBtn.textContent = (gameState.currentPlayerIndex === gameState.players.length - 1) ? '🎮 Start Game' : 'Next Player →';
  }

  window.goToNext = function() {
    if (gameState.currentPlayerIndex < gameState.players.length - 1) {
      gameState.currentPlayerIndex++;
      showRevealCard();
    } else {
      showScreen('discussion');
      startDiscussion();
    }
  };

  var timerFill = document.getElementById('timer-fill');
  var timerText = document.getElementById('timer-text');

  function startTimer() {
    gameState.timeRemaining = gameState.gameDuration * 60;
    updateTimerDisplay();
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(function() {
      gameState.timeRemaining--;
      updateTimerDisplay();
      if (gameState.timeRemaining <= 0) clearInterval(gameState.timerInterval);
    }, 1000);
  }

  function updateTimerDisplay() {
    var m = Math.floor(gameState.timeRemaining / 60);
    var s = gameState.timeRemaining % 60;
    timerText.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    timerFill.style.width = (gameState.timeRemaining / (gameState.gameDuration * 60) * 100) + '%';
  }

  var discussionTimerDisplay = document.getElementById('discussion-timer');
  var startVoteBtn = document.getElementById('start-vote-btn');
  var discussionTime = 180;

  function startDiscussion() {
    showScreen('discussion');
    discussionTime = 180;
    discussionTimerDisplay.textContent = formatTime(discussionTime);
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(function() {
      discussionTime--;
      discussionTimerDisplay.textContent = formatTime(discussionTime);
      if (discussionTime <= 0) clearInterval(gameState.timerInterval);
    }, 1000);
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  if (startVoteBtn) startVoteBtn.addEventListener('click', function() {
    clearInterval(gameState.timerInterval);
    startVoting();
  });

  var voteList = document.getElementById('vote-list');
  var voterName = document.getElementById('voter-name');
  var currentVoterIndex = 0;

  function startVoting() {
    showScreen('voting');
    currentVoterIndex = 0;
    gameState.votingComplete = [];
    showVotingForPlayer();
  }

  function showVotingForPlayer() {
    while (currentVoterIndex < gameState.players.length && gameState.players[currentVoterIndex].eliminated) currentVoterIndex++;
    if (currentVoterIndex >= gameState.players.length) { showVoteResults(); return; }
    voterName.textContent = gameState.players[currentVoterIndex].name;
    var active = gameState.players.filter(function(p, i) { return !p.eliminated && i !== currentVoterIndex; });
    if (active.length === 0) { showVoteResults(); return; }
    voteList.innerHTML = '';
    active.forEach(function(player) {
      var pi = gameState.players.indexOf(player);
      var li = document.createElement('li');
      li.textContent = player.name;
      li.dataset.index = pi;
      li.style.cursor = 'pointer';
      li.onclick = function() {
        var vi = parseInt(this.dataset.index);
        gameState.votingComplete.push({
          voterIndex: currentVoterIndex,
          votedForIndex: vi,
          voterName: gameState.players[currentVoterIndex].name,
          votedForName: gameState.players[vi].name
        });
        currentVoterIndex++;
        showVotingForPlayer();
      };
      voteList.appendChild(li);
    });
  }

  var voteResultsContent = document.getElementById('vote-results-content');
  var continueBtn = document.getElementById('continue-btn');

  function showVoteResults() {
    showScreen('voteResults');
    var counts = {};
    gameState.votingComplete.forEach(function(v) { counts[v.votedForIndex] = (counts[v.votedForIndex] || 0) + 1; });
    var sorted = Object.entries(counts).sort(function(a,b){return b[1]-a[1]}).map(function(e){return{index:parseInt(e[0]),count:e[1]}});
    var html = sorted.length === 0 ? '<p>No votes recorded</p>' : '';
    sorted.forEach(function(v) {
      var pl = gameState.players[v.index];
      html += '<p style="padding:12px;background:' + (pl.isImposter ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)') + ';border-radius:10px;margin-bottom:8px"><strong>' + pl.name + '</strong> — ' + v.count + ' vote' + (v.count>1?'s':'') + (pl.isImposter?' 🎭':'') + '</p>';
    });
    if (sorted[0]) {
      var elimIdx = sorted[0].index;
      var elimPl = gameState.players[elimIdx];
      elimPl.eliminated = true;
      gameState.eliminatedPlayers.push(elimIdx);
      html += '<p style="text-align:center;margin-top:15px;padding:12px;background:rgba(239,68,68,0.15);border-radius:10px"><strong>' + elimPl.name + '</strong> has been eliminated!</p>';
    }
    voteResultsContent.innerHTML = html;
    var remImp = gameState.players.filter(function(p){return p.isImposter && !p.eliminated}).length;
    var remCiv = gameState.players.filter(function(p){return !p.isImposter && !p.eliminated}).length;
    continueBtn.onclick = function() {
      if (remImp === 0) showResults(true);
      else if (remImp >= remCiv) showResults(false);
      else { gameState.currentRound++; showScreen('discussion'); startDiscussion(); }
    };
  }

  var resultTitle = document.getElementById('result-title');
  var resultContent = document.getElementById('result-content');
  var resultIcon = document.getElementById('result-icon');
  var playAgainBtn = document.getElementById('play-again-btn');

  function showResults(civWin) {
    showScreen('results');
    resultIcon.textContent = civWin ? '🎉' : '🎭';
    resultTitle.textContent = civWin ? 'Civilians Win!' : 'Imposters Win!';
    resultTitle.className = 'result-title ' + (civWin ? 'civilians-win' : 'imposters-win');
    var imps = gameState.players.filter(function(p){return p.isImposter}).map(function(p){return p.name}).join(', ');
    var cogs = gameState.players.filter(function(p){return !p.isImposter}).map(function(p){return p.name}).join(', ');
    resultContent.innerHTML = '<p>🎭 Imposters: <strong>' + imps + '</strong></p><p>✅ Civilians: <strong>' + cogs + '</strong></p>';
  }

  playAgainBtn.addEventListener('click', function() {
    gameState.players = [];
    gameState.currentRound = 1;
    gameState.clues = [];
    gameState.votingComplete = [];
    gameState.eliminatedPlayers = [];
    renderPlayerList();
    showScreen('home');
  });
});