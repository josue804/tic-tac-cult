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
  this.currentTurn = new Player("X");
}

// Game.prototype.move = function(player, space) {
//   var otherPlayer = {};
//   space.placePlayer(player);
//   this.players.forEach(function(thisPlayer) {
//     if (player !== thisPlayer) {
//       otherPlayer = thisPlayer;
//     }
//   });
//   this.currentTurn = otherPlayer;
// }

function getSpace(index) {
  var spaces = [new Space(0, 0),
                new Space(0, 1),
                new Space(0, 2),
                new Space(1, 0),
                new Space(1, 1),
                new Space(1, 2),
                new Space(2, 0),
                new Space(2, 1),
                new Space(2, 2)];
  return spaces[index];
}

Game.prototype.move = function(player, index) {
  var otherPlayer = {};
  getSpace(index).placePlayer(player);
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
  var playerX = new Player("X");
  var playerO = new Player("O");
  var winningCombos = [
    [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]
  ];

  var playerSpots = [[], []];

  for (var i = 0; i < this.board.spaces.length; i++) {

    var player = this.board.spaces[i].player;
    if (player.stringify() === '{"mark":"X"}') {
      playerSpots[0].push(i);
    }
    if (player.stringify() === '{"mark":"O"}') {
      playerSpots[1].push(i);
    }
  }

  winningCombos.forEach(function(combo) {
    if (playerSpots[0].stringify() === combo.stringify() ||
        playerSpots[1].stringify() === combo.stringify()) {
          gameOver = true;
    }
  });

  return gameOver;
}

$(document).ready(function() {
  var game = new Game();
  $(".cell").click(function() {
    var currentPlayer = game.turn();
    game.move(currentPlayer, $(this).attr('id'));
    $(this).text(currentPlayer.mark);
  });
});
