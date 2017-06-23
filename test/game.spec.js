import { stub } from 'sinon'
import Computer from '../src/computer'
import Referee from '../src/referee'
import {
  game,

  ROCK,
  PAPER,
  SCISSORS,

  USER,
  COMPUTER,

  NoOverallWinnerError,
  DrawError,

  defaultOpts
} from '../src/game'

const { possibleOptions } = defaultOpts

describe('the game', () => {
  let stubs

  before(() => {
    stubs = {
      computerPlay: stub(Computer.prototype, 'play'),
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

  describe('unexpected errors should halt the game', () => {
    it('should halt when user play throws an error', () => {
      const { computerPlay, decideWinner } = stubs
      const unexpectedError = new Error('Unexpected')
      const play = stub().throws(unexpectedError)

      const start = game()
      return start(play).catch(err => {
        expect(err).to.eql(unexpectedError)
      })
    })

    it('should halt when computer play throws an error', () => {
      const { computerPlay, decideWinner } = stubs
      const unexpectedError = new Error('Unexpected')
      const play = stub().callsArgWith(0, PAPER)
      computerPlay.throws(unexpectedError)

      const start = game()
      return start(play).catch(err => {
        expect(err).to.eql(unexpectedError)
      })
    })

    it('should halt when referee check throws an error', () => {
      const { computerPlay, decideWinner } = stubs
      const unexpectedError = new Error('Unexpected')
      const play = stub().callsArgWith(0, PAPER)
      computerPlay.callsArgWith(0, ROCK)

      decideWinner.throws(unexpectedError)

      const start = game()
      return start(play).catch(err => {
        expect(err).to.eql(unexpectedError)
      })
    })

    it('should halt when referee check rejects with an unexpected error', () => {
      const { computerPlay, decideWinner } = stubs
      const unexpectedError = new Error('Unexpected')
      const play = stub().callsArgWith(0, PAPER)
      computerPlay.callsArgWith(0, ROCK)

      decideWinner.returns(Promise.reject(unexpectedError))

      const start = game()
      return start(play).catch(err => {
        expect(err).to.eql(unexpectedError)
      })
    })

    it('should proceed with game after a halt', () => {
      const { computerPlay, decideWinner } = stubs
      const unexpectedError = new Error('Unexpected')
      const play = stub().callsArgWith(0, PAPER)
      computerPlay.callsArgWith(0, ROCK)

      decideWinner.returns(Promise.reject(unexpectedError))

      const start = game()
      return start(play).catch(err => {
        decideWinner.reset()
        decideWinner.returns(Promise.resolve(USER))

        return start(play).then(result => {
          expect(result).to.eql({
            plays: 2,
            userScore: 1,
            compScore: 0,
            winner: USER
          })
        })
      })
    })
  })
})
