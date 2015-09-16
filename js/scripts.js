Object.prototype.stringify = function() {
  return JSON.stringify(this);
}

function Player(mark) {
  this.mark = mark;
}

function Space(x, y) {
  this.x = x;
  this.y = y;

  this.player = {};
}

Space.prototype.xCoord = function() {
  return this.x;
}

Space.prototype.yCoord = function() {
  return this.y;
}

Space.prototype.placePlayer = function(player) {
  this.player = player;
}

function Board() {
  this.spaces = [];

  for(var x = 0; x < 3; x++) {
    for(var y = 0; y < 3; y++) {
      this.spaces.push(new Space(x, y));
    }
  }
}

Board.prototype.find = function(x, y) {
  var foundSpace = {};
  this.spaces.forEach(function(space) {
    if (space.xCoord() === x && space.yCoord() === y) {
      foundSpace = space;
    }
  });
  return foundSpace;
}


function Game() {
  this.players = [new Player("X"), new Player("O")];
  this.board = new Board();
  this.currentTurn = new Player ("X")
}

Game.prototype.move = function(player, space) {
  var otherPlayer = {};
  space.placePlayer(player);
  this.players.forEach(function(thisPlayer) {
    if (player !== thisPlayer) {
      otherPlayer = thisPlayer;
    }
  });
  this.currentTurn = otherPlayer;
}

Game.prototype.turn = function()  {
  return this.currentTurn;
}

Game.prototype.isOver = function() {

  var gameOver = false;
  var thisBoard = [];
  // this.board.spaces.forEach(function(space) {
  //   thisBoard.push(space.player);
  // });
  //

  var playerX = new Player("X");
  var playerO = new Player("O");
  var winningCombos = [
    {0: playerX, 3: playerX, 6: playerX}
  ];

  var playerSpots = [[], []];
  // var thisBoard = this.board;
  for (var i = 0; i < this.board.length; i++) {
    if (this.board.space.player.stringify() === '{"mark":"X"}') {
      playerSpots[0].push(i);
    }
    if (this.board.space.player.stringify() === '{"mark":"O"}') {
      playerSpots[1].push(i);
    }
  }

  winningCombos.forEach(function(combo) {
    if (playerSpots[0].stringify() === combo.stringify() ||
        playerSpots[1].stringify() === combo.stringify()) {
          gameOver = true;
    }
  });



  // winningBoards.forEach(function(winningBoard) {
  //   for(var i = 0; i < thisBoard.length; i++) {
  //     if (thisBoard[i].stringify() !== winningBoard[i].stringify()) {
  //       gameOver = false;
  //     }
  //   }
  // });
  return gameOver;
}



// var players = [playerX, playerO];
// var winningBoards = [];
//
// for(var i = 0; i < players.length; i++) {
//   if (i = 0) {
//     winningBoards.push([players[i], {}, {}, players[i], {}, players[i+1], players[i], players[i+1], {}]);
//   } else {
//     winningBoards.push([players[i], {}, {}, players[i], {}, players[i-1], players[i], players[i-1], {}]);
//   }
// }

// var winningBoards = [
//   [new Player("X"), {}, {}, new Player("X"), {}, new Player("O"), new Player("X"), new Player("O"), {}],
//   [new Player("O"), {}, {}, new Player("O"), {}, new Player("X"), new Player("O"), new Player("X"), {}]
//   ];
