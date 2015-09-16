describe('Player', function(){
  it('returns the player\'s mark', function() {
    var testPlayer = new Player("X");
    expect(testPlayer.playerMark()).to.equal("X");
  });
});

describe("Space", function() {
  it("returns the players mark", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.yCoord()).to.equal(2)
  });
  it("returns the players mark", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.xCoord()).to.equal(1)
  });
});
