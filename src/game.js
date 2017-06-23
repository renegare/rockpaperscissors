const Computer = require('./computer')
const Referee = require('./referee')
const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'
const COMPUTER = 'COMPUTER'
const USER = 'USER'

const noop = () => {}

const defaultOpts = {
  possibleOptions: [ ROCK, PAPER, SCISSORS ]
}

const game = (opts = {}) => {
  const {
    possibleOptions
  } = { ...defaultOpts, ...opts }

  const score = {
    user: 0,
    comp: 0
  }

  return (play) => {
    return new Promise(resolve => {
      play(userChoice => Computer.play(compChoice => {
        Referee.decideWinner(userChoice, compChoice)
        resolve({ winner: USER })
      }))
    })
  }
}

module.exports = {
  game,
  ROCK,
  PAPER,
  SCISSORS,
  COMPUTER,
  USER
}
