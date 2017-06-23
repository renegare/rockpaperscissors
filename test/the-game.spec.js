const {
  game,

  ROCK,
  PAPER,
  SCISSORS,

  USER,
  COMPUTER,

  NoOverallWinnerError,
  DrawError,

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

  beforeEach(() => {
    stubs.computerPlay.reset()
    stubs.decideWinner.reset()
  })

  after(() => {
    stubs.computerPlay.restore()
    stubs.decideWinner.restore()
  })

  it('should play', () => {
    const { computerPlay, decideWinner } = stubs
    const play = stub().callsArgWith(0, PAPER)
    computerPlay.callsArgWith(0, ROCK)
    decideWinner.returns(Promise.resolve(USER))

    const start = game()
    return start(play)
      .then(result => {
        expect(play.called).to.be.true
        expect(computerPlay.called).to.be.true

        expect(decideWinner.called).to.be.true
        expect(decideWinner.firstCall.args)
          .to.eql([{
            plays: 1,
            userScore: 0,
            compScore: 0,
            possibleOptions,
            userChoice: PAPER,
            compChoice: ROCK
          }])

        expect(result).to.eql({
          plays: 1,
          userScore: 1,
          compScore: 0,
          winner: USER
        })
      })
  })

  it('should play again when there is no overall winner', () => {
    const { computerPlay, decideWinner } = stubs
    const play = stub().callsArgWith(0, PAPER)
    computerPlay.callsArgWith(0, ROCK)

    const err = new NoOverallWinnerError(USER)
    decideWinner.onCall(0).returns(Promise.reject(err))
    decideWinner.onCall(1).returns(Promise.resolve(USER))

    const start = game()
    return start(play)
      .then(result => {
        expect(play.callCount).to.eql(2)
        expect(computerPlay.callCount).to.eql(2)

        expect(decideWinner.callCount).to.eql(2)
        expect(decideWinner.secondCall.args)
          .to.eql([{
            compChoice: ROCK,
            compScore: 0,
            plays: 2,
            possibleOptions,
            userChoice: PAPER,
            userScore: 1,
          }])

        expect(result).to.eql({
          plays: 2,
          compScore: 0,
          userScore: 2,
          winner: USER
        })
      })
  })

  it('should play again when there is a draw', () => {
    const { computerPlay, decideWinner } = stubs
    const play = stub().callsArgWith(0, PAPER)
    computerPlay.callsArgWith(0, ROCK)

    const err = new DrawError()
    decideWinner.onCall(0).returns(Promise.reject(err))
    decideWinner.onCall(1).returns(Promise.resolve(COMPUTER))

    const start = game()
    return start(play)
      .then(result => {
        expect(play.callCount).to.eql(2)
        expect(computerPlay.callCount).to.eql(2)

        expect(decideWinner.callCount).to.eql(2)
        expect(decideWinner.secondCall.args)
          .to.eql([{
            compChoice: ROCK,
            compScore: 1,
            plays: 2,
            possibleOptions,
            userChoice: PAPER,
            userScore: 1,
          }])

        expect(result).to.eql({
          plays: 2,
          compScore: 2,
          userScore: 1,
          winner: COMPUTER
        })
      })
  })
})
