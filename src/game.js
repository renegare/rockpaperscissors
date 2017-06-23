const Computer = require('./computer')
const Referee = require('./referee')
const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'
const COMPUTER = 'COMPUTER'
const USER = 'USER'

const noop = () => {}

const game = ({
  possibleOptions = [ ROCK, PAPER, SCISSORS ]
}) => {
  const score = {
    user: 0,
    comp: 0
  }

  return (play) => {
    return new Promise(resolve => {
      play(noop); play(noop); play(noop);
      Computer.play(noop); Computer.play(noop); Computer.play(noop);

      return resolve({ winner: USER })
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
