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
  let plays = 0

  const play = (userPlay) => {
    ++plays
    return new Promise((resolve, reject) => {
      userPlay(userChoice => Computer.play(compChoice => {
        Referee.decideWinner({
          plays,
          possibleOptions,
          userScore,
          compScore,
          userChoice,
          compChoice
        })
        .then(winner => {
          if(winner === USER)
            ++userScore
          else
            ++compScore

          resolve({
            plays,
            userScore,
            compScore,
            winner
          })
        })
        .catch(err => {
          if (err.winner === USER)
            ++userScore
          else
            ++compScore
          play(userPlay).then(resolve, reject)
          // only expected error case is a Draw
          // ++userScore
          // ++compScore
          // play(userPlay).then(resolve, reject)
        })

        // catch error
        //  > No Overall Winner error
        //  > Draw error
        //  > Unexpected error
      }))

    })
  }

  return play
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
