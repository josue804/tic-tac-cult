function Player(mark) {
  this.mark = mark;
}

Player.prototype.playerMark = function() {
  return this.mark;
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

  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      this.spaces.push(new Space(i, j));
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
