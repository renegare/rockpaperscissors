import ExtendableError from 'es6-error';

import Computer from './computer'
import Referee from './referee'

export const ROCK = 'ROCK'
export const PAPER = 'PAPER'
export const SCISSORS = 'SCISSORS'
export const COMPUTER = 'COMPUTER'
export const USER = 'USER'

export const defaultOpts = {
  possibleOptions: [ ROCK, PAPER, SCISSORS ]
}

export class NoOverallWinnerError extends ExtendableError {
  constructor(winner, message='NoOverall Winner Error') {
    super(message)
    this.winner = winner
  }
}

export class DrawError extends ExtendableError {
  constructor(message='Draw Error') {
    super(message)
  }
}

export const game = (opts = {}) => {
  const {
    possibleOptions
  } = { ...defaultOpts, ...opts }

  let userScore = 0
  let compScore = 0
  let plays = 0
  const computer = new Computer(possibleOptions)

  const play = (userPlay) => {
    ++plays
    return new Promise((resolve, reject) => {
      userPlay(userChoice => computer.play(compChoice => {
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
