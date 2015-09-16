describe('Player', function(){
  it('returns the player\'s mark', function() {
    var testPlayer = new Player("X");
    expect(testPlayer.playerMark()).to.equal("X");
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

  it("can tell which player's turn it is", function () {
    var testPlayer = new Player("X");
    var testPlayer1 = new Player("O");
    var testGame = new Game();
    expect(testGame.turn()).to.eql(testPlayer);
    testGame.move(testPlayer, testGame.board.find(0, 1));
    expect(testGame.turn()).to.eql(testPlayer1);
  });
});
