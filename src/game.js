import ExtendableError from 'es6-error';

import Computer from './computer'
import Referee, {
  USER,
  COMPUTER,
  DrawError,
  InvalidChoiceError,
} from './referee'

export const ROCK = 'ROCK'
export const PAPER = 'PAPER'
export const SCISSORS = 'SCISSORS'

export {
  COMPUTER,
  USER,
  DrawError
} from './referee'

export const defaultOpts = {
  possibleOptions: [ ROCK, PAPER, SCISSORS ]
}

export class NoWinnerError extends ExtendableError {
  constructor(winner, message='NoOverall Winner Error') {
    super(message)
    this.winner = winner
  }
}

export const game = (opts = {}) => {
  const {
    possibleOptions
  } = { ...defaultOpts, ...opts }

  let user = 0
  let comp = 0
  let plays = 0

  const computer = new Computer(possibleOptions)
  const referee = new Referee({
    choices: possibleOptions
  })

  const play = (userPlay) => {
    return new Promise((resolve, reject) => {
      userPlay(userChoice => computer.play(compChoice => {
        ++plays
        referee.getPlayResult(userChoice, compChoice)
        .catch(err => {
          if (err.constructor !== DrawError) throw err
        })
        .then(winner => {
          if(winner === USER)
            ++user
          else if (winner === COMPUTER)
            ++comp
        })
        .then(() => referee.getWinner(plays, user, comp))
        .then(winner => resolve({
          plays,
          user,
          comp,
          winner
        }))
        .catch(err => {
          if (err.constructor !== NoWinnerError)
            return reject(err)

          play(userPlay).then(resolve, reject)
        })
      }))

    })
  }

  return play
}
