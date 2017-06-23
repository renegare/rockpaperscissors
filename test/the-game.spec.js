const {
  game,
  ROCK,
  PAPER,
  SCISSORS,
  USER,
  COMPUTER,
  defaultOpts: { possibleOptions }
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
    decideWinner.returns(Promise.resolve(USER))

    const start = game()
    return start(play)
      .then(result => {
        // did both players play the correct amount of times
        expect(play.called).to.be.true
        expect(computerPlay.called).to.be.true

        expect(decideWinner.called).to.be.true
        expect(decideWinner.firstCall.args)
          .to.eql([{
            playCount: 0,
            userScore: 0,
            compScore: 0,
            possibleOptions,
            userChoice: PAPER,
            compChoice: ROCK
          }])

        // who won!
        expect(result).to.eql({
          plays: 1,
          userScore: 1,
          compScore: 0,
          winner: USER
        })
      })
  })

  // it('should ')

})
