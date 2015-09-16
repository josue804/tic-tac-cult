Object.prototype.stringify = function() {
  return JSON.stringify(this);
}

Array.prototype.contains = function(array) {
  return this.filter(function (elem) {
    return array.indexOf(elem) > -1;
  }).length == array.length
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

function getSpace(board, index) {
  var spaces = [board.find(0, 0),
                board.find(0, 1),
                board.find(0, 2),
                board.find(1, 0),
                board.find(1, 1),
                board.find(1, 2),
                board.find(2, 0),
                board.find(2, 1),
                board.find(2, 2)];

  return spaces[index];
}

Game.prototype.move = function(player, index) {
  var otherPlayer = {};
  getSpace(this.board, index).placePlayer(player);
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
    if (playerSpots[0].contains(combo) ||
        playerSpots[1].contains(combo)) {
          gameOver = true;
    }
  });

  return gameOver;
}

$(document).ready(function() {
  var game = new Game();
  var playNumber = 0;

  $(".cell").click(function() {
    var currentPlayer = game.turn();
    var cell = $(this).attr('id');
    game.move(currentPlayer, cell);
    $(this).text(currentPlayer.mark);

    playNumber++;
    if (game.isOver()) {
      alert('Game Over. ' + currentPlayer.mark + ' wins!');
    } else if (playNumber === 9) {
      alert('Cats game; try again.')
    }
  });
});
