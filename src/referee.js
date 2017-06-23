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
 * The decider of a given play
 * @type Referee
 */
export default class Referee {
  /**
   * provide options for the referee of a game to decide with
   * @param {Object}  options
   * @param {Array<Any>}   options.choices Array of possible values that a user or computer can play with. The order of the values are important. e.g [ROCK, PAPER, SCISSORS] where the chosen item can be defeated by the proceeding 'n' number of items. Basically: `n = floor(totalLengthOfChoices / 2)`. If not enough items are found after a given choice then the remaining required amount of items is taken from the start of the array.
   */
  constructor({ choices }) {
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
   */
  decideWinner(user, comp) {
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
}
