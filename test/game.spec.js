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

  NoWinnerError,
  DrawError,

  defaultOpts
} from '../src/game'

const { possibleOptions } = defaultOpts

describe('the game', () => {
  let computerPlay
  let getPlayResult
  let getWinner

  before(() => {
    computerPlay = stub(Computer.prototype, 'play')
    getPlayResult = stub(Referee.prototype, 'getPlayResult')
    getWinner = stub(Referee.prototype, 'getWinner')
  })

  beforeEach(() => {
    computerPlay.reset()
    getPlayResult.reset()
    getWinner.reset()
  })

  after(() => {
    computerPlay.restore()
    getPlayResult.restore()
    getWinner.restore()
  })

  it('should play (Happy Path)', () => {
    const play = stub().callsArgWith(0, PAPER)
    computerPlay.callsArgWith(0, ROCK)
    getPlayResult.returns(Promise.resolve(USER))
    getWinner.returns(Promise.resolve(USER))

    const start = game()
    return start(play)
      .then(result => {
        expect(play.calledOnce).to.be.true
        expect(computerPlay.calledOnce).to.be.true

        expect(getPlayResult.calledOnce).to.be.true
        expect(getPlayResult.firstCall.args).to.eql([PAPER, ROCK])

        expect(getWinner.calledOnce).to.be.true
        expect(getWinner.firstCall.args).to.eql([1, 1, 0])

        expect(result).to.eql({
          plays: 1,
          user: 1,
          comp: 0,
          winner: USER
        })
      })
  })

  it('should play again when the play is a draw', () => {
    const play = stub()
    play.onCall(0).callsArgWith(0, PAPER)
    play.onCall(1).callsArgWith(0, ROCK)

    computerPlay.callsArgWith(0, PAPER)

    const drawErr = new DrawError()
    getPlayResult.onCall(0).returns(Promise.reject(drawErr))
    getPlayResult.onCall(1).returns(Promise.resolve(COMPUTER))

    const noWinnerError = new NoWinnerError()
    getWinner.onCall(0).returns(Promise.reject(noWinnerError))
    getWinner.onCall(1).returns(Promise.resolve(COMPUTER))

    const start = game()
    return start(play)
      .then(result => {
        expect(play.calledTwice).to.be.true
        expect(computerPlay.calledTwice).to.be.true

        expect(getPlayResult.calledTwice).to.be.true
        expect(getPlayResult.firstCall.args).to.eql([PAPER, PAPER])
        expect(getPlayResult.secondCall.args).to.eql([ROCK, PAPER])

        expect(getWinner.calledTwice).to.be.true
        expect(getWinner.firstCall.args).to.eql([1, 0, 0])
        expect(getWinner.secondCall.args).to.eql([2, 0, 1])

        expect(result).to.eql({
          plays: 2,
          user: 0,
          comp: 1,
          winner: COMPUTER
        })
      })
  })

  describe('unexpected errors should halt the game', () => {
    it('should halt when user play throws an error', () => {
      const unexpectedError = new Error('Unexpected')
      const play = stub().throws(unexpectedError)

      const start = game()
      return start(play).catch(err => {
        expect(err).to.eql(unexpectedError)
      })
    })

    it('should halt when computer play throws an error', () => {
      const unexpectedError = new Error('Unexpected')
      const play = stub().callsArgWith(0, PAPER)
      computerPlay.throws(unexpectedError)

      const start = game()
      return start(play).catch(err => {
        expect(err).to.eql(unexpectedError)
      })
    })

    it('should halt when referee getPlayResults throws an error', () => {
      const unexpectedError = new Error('Unexpected')
      const play = stub().callsArgWith(0, PAPER)
      computerPlay.callsArgWith(0, ROCK)

      getPlayResult.throws(unexpectedError)

      const start = game()
      return start(play).catch(err => {
        expect(err).to.eql(unexpectedError)
      })
    })

    it('should halt when referee getWinner rejects with an error', () => {
      const unexpectedError = new Error('Unexpected')
      const play = stub().callsArgWith(0, PAPER)
      computerPlay.callsArgWith(0, ROCK)

      getWinner.returns(Promise.reject(unexpectedError))

      const start = game()
      return start(play).catch(err => {
        expect(err).to.eql(unexpectedError)
      })
    })

    it('should proceed with game after a halt', () => {
      const unexpectedError = new Error('Unexpected')
      const play = stub().callsArgWith(0, PAPER)
      computerPlay.callsArgWith(0, ROCK)

      getPlayResult.throws(unexpectedError)

      const start = game()
      return start(play).catch(err => {
        expect(getPlayResult.calledOnce).to.be.true
        expect(getPlayResult.firstCall.args).to.eql([PAPER, ROCK])

        getPlayResult.reset()
        getPlayResult.returns(Promise.resolve(USER))

        expect(getWinner.called).to.be.false
        getWinner.returns(Promise.resolve(USER))

        return start(play).then(result => {
          expect(getPlayResult.calledOnce).to.be.true
          expect(getPlayResult.firstCall.args).to.eql([PAPER, ROCK])

          expect(getWinner.calledOnce).to.be.true
          expect(getWinner.firstCall.args).to.eql([2, 1, 0])

          expect(result).to.eql({
            plays: 2,
            user: 1,
            comp: 0,
            winner: USER
          })
        })
      })
    })
  })
})
