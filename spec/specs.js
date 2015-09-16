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
});

describe("Board", function() {
  it('creates 9 spaces when initialized', function() {
    var testSpace = new Space(1, 2);
    var testBoard = new Board();
    expect(testBoard.find(1, 2)).to.eql(testSpace);
  });
});
