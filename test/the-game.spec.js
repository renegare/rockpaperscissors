const {
  Game,
  ROCK,
} = require('../src/game')
const { stub } = require('sinon')

describe('the game', () => {

  it('should do something', () => {
    const game = new Game()
    const playStub = stub().returns(ROCK)
    return game.start(playStub)
      .then(() => {
        expect(playStub.callCount).to.eql(3)
      })

  })

})
