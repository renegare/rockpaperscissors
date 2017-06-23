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
const Referee = require('../src/referee')

describe('the game', () => {
  let stubs

  before(() => {
    stubs = {
      computerPlay: stub(Computer, 'play'),
      decideWinner: stub(Referee, 'decideWinner')
    }
  })

  it('should play a game of <any number> of rounds', () => {
    const { computerPlay, decideWinner } = stubs
    const play = stub().callsArgWith(0, PAPER)
    computerPlay.callsArgWith(0, ROCK)

    const start = game()
    return start(play)
      .then(result => {
        // did both players play the correct amount of times
        expect(play.called).to.be.true
        expect(stubs.computerPlay.called).to.be.true
        expect(stubs.decideWinner.called).to.be.true

        expect(stubs.decideWinner.firstCall.args).to.eql([ PAPER, ROCK ])
        // expect(stubs.decideWinner.firstCall).to.eql(3)

        // who won!
        expect(result.winner).to.eql(USER)
      })
  })

  // it('should ')

})
