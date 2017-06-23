import ExtendableError from 'es6-error';

export const USER = 'USER'
export const COMPUTER = 'COMPUTER'

/**
 * When a play is deemed a draw, use this
 * @type DrawError
 */
export class DrawError extends ExtendableError {
  constructor(message='It\'s a draw') {
    super(message)
  }
}

/**
 * When a game is tied or there are more plays to have
 * @type NoWinnerError
 */
export class NoWinnerError extends ExtendableError {
  constructor(winner, message='NoOverall Winner Error') {
    super(message)
    this.winner = winner
  }
}

/**
 * When a user plays an invalid choice
 * @type InvalidChoiceError
 */
export class InvalidChoiceError extends ExtendableError {}

/**
 * The decider of a given play
 * @type Referee
 */
export default class Referee {
  /**
   * provide options for the referee of a game to decide with
   * @param {Object}  options
   * @param {Array<Any>}   options.choices Array of possible values that a user or computer can play with. The order of the values are important. e.g [ROCK, PAPER, SCISSORS] where the chosen item can be defeated by the proceeding 'n' number of items. Basically: `n = floor(totalLengthOfChoices / 2)`. If not enough items are found after a given choice then the remaining required amount of items is taken from the start of the array.
   */
  constructor({ choices, bestOutOf=1 }) {
    this.bestOutOf = bestOutOf
    this.choices = choices
    this.choiceCount = choices.length
  }

  /**
   * based on the available choices, a comparrisant is made to determine the winner.
   * @param  {Any} user the choice of the user which must exist in the available choices
   * @param  {Any} comp the choice of the computer which must exist in the available choices
   * @return {Promise}
   * @resolve {string} one of the constants USER or COMPUTER
   * @rejects {DrawError} when both user and computer choices match
   * @rejects !{InvalidChoiceError} when both user and computer choices match
   */
  getPlayResult(user, comp) {
    return new Promise((resolve, reject) => {
      if(user === comp) return reject(new DrawError())

      const { choices, choiceCount } = this
      const userIdx = choices.indexOf(user)
      const compIdx = choices.indexOf(comp)

      const winners = new Array(Math.floor(choiceCount / 2))
        .fill('')
        .map(i => {
          const idx = (userIdx + i + 1) % choiceCount
          return choices[idx]
        })

      resolve(winners.indexOf(comp) > -1 ? COMPUTER : USER)
    })
  }

  /**
   * based on the current state of play decide if there is a winner or if they should play on
   * @param {string} plays number of games played
   * @param {number} user user's current score
   * @param {number} comp computer's current score
   * @return {[type]} [description]
   */
  getWinner(plays, user, comp) {
    return new Promise((resolve, reject) => {
      const { bestOutOf } = this
      if (!(plays < bestOutOf)) {
        if(user === comp) return reject(new NoWinnerError())
        return resolve(user > comp ? USER : COMPUTER)
      }

      if ((bestOutOf - plays) + user < comp) resolve(COMPUTER)
      if ((bestOutOf - plays) + comp < user) resolve(USER)

      return reject(new NoWinnerError())
    })
  }
}
