import Referee, { DrawError, USER, COMPUTER } from '../src/referee'

const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'
const choices = [ ROCK, PAPER, SCISSORS ]

describe.only('Referee', () => {

  it('should resolve winner as USER', () => {
    const referee = new Referee({ choices })

    return referee.decideWinner(ROCK, SCISSORS)
    .then(winner => {
      expect(winner).to.eql(USER)
    })
  })

  it('should resolve winner as COMPUTER', () => {
    const referee = new Referee({
      choices
    })

    return referee.decideWinner(PAPER, SCISSORS)
    .then(winner => {
      expect(winner).to.eql(COMPUTER)
    })
  })

  it('should reject play as a draw', () => {
    const referee = new Referee({ choices })

    return referee.decideWinner(SCISSORS, SCISSORS)
    .catch(err => {
      expect(err).instanceof(DrawError)
    })
  })
})
