const {
  game,
  ROCK,
  PAPER,
  SCISSORS,
  USER,
  COMPUTER
} = require('../src/game')

const { stub } = require('sinon')
const Computer = require('../src/computer')

describe('the game', () => {
  let stubs

  before(() => {
    stubs = {
      computerPlay: stub(Computer, 'play'),
    }
  })

  it('should play a game of <any number> of rounds', () => {
    const computerPlays = [ ROCK, PAPER, SCISSORS ]
    const userPlays = [ ROCK, ROCK, PAPER ]
    const expectedPlays = 3
    const expectedWinner = COMPUTER
    const bestOutof = 3

    const start = game({ bestOutof })

    const play = stub().callsFake(play => play(userPlays.shift()))
    stubs.computerPlay.callsFake(play => play(computerPlays.shift()))

    return start(play)
      .then(result => {
        // did both players play the correct amount of times
        expect(play.callCount).to.eql(expectedPlays)
        expect(stubs.computerPlay.callCount).to.eql(expectedPlays)

        // who won!
        expect(result.winner).to.eql(USER)
      })
  })

})
