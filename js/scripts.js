function Player(mark) {
  this.mark = mark;
}

Player.prototype.playerMark = function() {
  return this.mark;
}

function Space(x, y) {
  this.x = x;
  this.y = y;
}

Space.prototype.xCoord = function() {
  return this.x;
}

Space.prototype.yCoord = function() {
  return this.y;
}
