import Referee, {
  USER,
  COMPUTER,
  DrawError,
  NoWinnerError
} from '../src/referee'

const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'
const choices = [ ROCK, PAPER, SCISSORS ]

describe('Referee', () => {

  describe('getPlayResult', () => {
    it('should resolve winner as USER', () => {
      const referee = new Referee({ choices })

      return referee.getPlayResult(ROCK, SCISSORS)
      .then(winner => {
        expect(winner).to.eql(USER)
      })
    })

    it('should resolve winner as COMPUTER', () => {
      const referee = new Referee({
        choices
      })

      return referee.getPlayResult(PAPER, SCISSORS)
      .then(winner => {
        expect(winner).to.eql(COMPUTER)
      })
    })

    it('should reject play as a draw', () => {
      const referee = new Referee({ choices })

      return referee.getPlayResult(SCISSORS, SCISSORS)
      .catch(err => {
        expect(err).instanceof(DrawError)
      })
    })
  })

  describe('getWinner', () => {
    it('should declare the USER as winner', () => {
      const referee = new Referee({ choices })
      return referee.getWinner(1, 1, 0)
        .then(winner => expect(winner).eql(USER))
    })

    it('should declare the COMPUTER as winner', () => {
      const referee = new Referee({ choices })
      return referee.getWinner(1, 0, 1)
        .then(winner => expect(winner).eql(COMPUTER))
    })

    it('should reject with a NoWinnerError when the game is tied', () => {
      const referee = new Referee({ choices })
      return referee.getWinner(1, 0, 0)
        .then(winner => {
          throw new Error(`Got ${winner} as the winner but Expected a NoWinnerError`)
        })
        .catch(err => expect(err.constructor).eql(NoWinnerError))
    })

    it('should reject with a NoWinnerError when the game is still to be won', () => {
      const referee = new Referee({ choices, bestOutOf: 2 })
      return referee.getWinner(1, 0, 1)
        .then(winner => {
          throw new Error(`Got ${winner} as the winner but Expected a NoWinnerError`)
        })
        .catch(err => expect(err.constructor).eql(NoWinnerError))
    })

    it('should declare the USER as the winner when they have the best of the game', () => {
      const referee = new Referee({ choices, bestOutOf: 3 })
      return referee.getWinner(2, 2, 0)
        .then(winner => expect(winner).eql(USER))
    })

    it('should declare the COMPUTER as the winner when they have the best of the game', () => {
      const referee = new Referee({ choices, bestOutOf: 10 })
      return referee.getWinner(7, 1, 6)
        .then(winner => expect(winner).eql(COMPUTER))
    })
  })
})
