describe('Object', function() {
  it('returns string representation of Player', function() {
    var testPlayer = new Player("X");
    expect(testPlayer.stringify()).to.equal('{"mark":"X"}');
  });

  it('returns string representation of Space', function() {
    var testPlayer = new Space(0, 0);
    expect(testPlayer.stringify()).to.equal('{"x":0,"y":0,"player":{}}');
  });
});

describe('Player', function(){
  it('returns the player\'s mark', function() {
    var testPlayer = new Player("X");
    expect(testPlayer.mark).to.equal("X");
  });
});

describe("Space", function() {
  it("returns space\'s y coordinate", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.yCoord()).to.equal(2)
  });

  it("returns space\'s x coordinate", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.xCoord()).to.equal(1)
  });

  it("returns player at given space", function() {
    var testSpace = new Space(1,2);
    var testPlayer = new Player("X");
    expect(testSpace.player).to.eql({});
    testSpace.placePlayer(testPlayer);
    expect(testSpace.player).to.eql(testPlayer);
  });
});

describe("Board", function() {
  it('creates 9 spaces when initialized', function() {
    var testSpace = new Space(1, 2);
    var testBoard = new Board();
    expect(testBoard.find(1, 2)).to.eql(testSpace);
  });
});

describe("Game", function() {
  it("creates two players to start the game", function() {
    var testPlayer = new Player("X");
    var testPlayer1 = new Player("O");
    var testGame = new Game();
    expect(testGame.players).to.eql([testPlayer, testPlayer1])
  });

  it("creates a board to start the game", function() {
    var testBoard = new Board();
    var testGame = new Game();
    expect(testGame.board).to.eql(testBoard)
  });

  it('can move to the next turn', function() {
    var testPlayer = new Player("X");
    var testPlayer1 = new Player("O");
    var testGame = new Game();
    testGame.move(testPlayer, testGame.board.find(0, 0));
    expect(testGame.board.find(0, 0).player).to.eql(testPlayer);
  });

  it("can tell which player's turn it is", function() {
    var testPlayer = new Player("X");
    var testPlayer1 = new Player("O");
    var testGame = new Game();
    expect(testGame.turn()).to.eql(testPlayer);
    testGame.move(testPlayer, testGame.board.find(0, 1));
    expect(testGame.turn()).to.eql(testPlayer1);
  });

  it("can tell if game is over", function() {
    var testPlayer = new Player("X");
    var testPlayer1 = new Player("O");
    var testGame = new Game();
    expect(testGame.isOver()).to.equal(false);
    testGame.move(testPlayer, testGame.board.find(0, 0));
    testGame.move(testPlayer1, testGame.board.find(1, 2));
    testGame.move(testPlayer, testGame.board.find(1, 0));
    testGame.move(testPlayer1, testGame.board.find(2, 1));
    testGame.move(testPlayer, testGame.board.find(2, 0));
    expect(testGame.isOver()).to.equal(true);
  });
});
