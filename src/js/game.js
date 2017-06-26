import Computer from './computer'
import Referee, {
  USER,
  COMPUTER,
  DrawError,
  NoWinnerError,
} from './referee'

export const ROCK = 'ROCK'
export const PAPER = 'PAPER'
export const SCISSORS = 'SCISSORS'

export {
  COMPUTER,
  USER,
  DrawError,
  InvalidChoiceError,
  NoWinnerError,
} from './referee'

export const defaultOpts = {
  possibleOptions: [ ROCK, PAPER, SCISSORS ]
}

export default class Game {

  getOptions() {
    throw new Error('Not Implemented')
  }
}

Game.create = () => {
  throw new Error('Not Implemented')
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
