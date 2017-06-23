import ExtendableError from 'es6-error';

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

class NoOverallWinnerError extends ExtendableError {
  constructor(winner, message='NoOverall Winner Error') {
    super(message)
    this.winner = winner
  }
}

class DrawError extends ExtendableError {
  constructor(message='Draw Error') {
    super(message)
  }
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
          switch(err.constructor) {
            case NoOverallWinnerError:
              if (err.winner === USER)
                ++userScore
              else
                ++compScore
              break

            case DrawError:
              ++userScore
              ++compScore
              break

            default:
              return reject(err)
          }

          play(userPlay).then(resolve, reject)
        })
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
  USER,

  NoOverallWinnerError,
  DrawError,
}
