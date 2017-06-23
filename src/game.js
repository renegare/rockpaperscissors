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

  let userScore = 0
  let compScore = 0

  return (play) => {
    const playCount = 0
    return new Promise(resolve => {
      play(userChoice => Computer.play(compChoice => {
        Referee.decideWinner({
          playCount,
          possibleOptions,
          userScore,
          compScore,
          userChoice,
          compChoice
        })
        .then(winner => {
          if(winner)
            ++userScore
          else
            ++compScore

          resolve({ plays: 1, userScore, compScore, winner })
        })

        // catch error
        //  > Draw error
        //  > No Overall Winner error
        //  > Unexpected error
        //  > call start again but with playCount? incremented
      }))

    })
  }
}

module.exports = {
  defaultOpts,
  game,
  ROCK,
  PAPER,
  SCISSORS,
  COMPUTER,
  USER
}
