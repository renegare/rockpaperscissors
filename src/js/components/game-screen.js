import React, { Component } from 'react'
import Game from '../game'

export const Score = () => (
  <aside>Score: 0/0</aside>
)

export default class GameScreen extends Component {
  constructor() {
    super()

    const game = Game.create(play => this.setState({ play }))
    game.on('score', score => this.setState({ score }))
    game.on('end', () => this.props.onEnd())
    game.on('error', () => this.props.onError())

    this.state = {
      game,
      play: null,
      score: game.getScore() || {}
    }
  }

  handleSelection(selection) {
    this.state.play(selection)
    this.setState({ play: null })
  }

  renderOptions() {
    const {
      play,
      game
    } = this.state

    if(!this.state.play) return null;

    return (
      <div>
        {game.getOptions().map((o, n) => (
          <button key={n} onClick={() => this.handleSelection(o)}>{o}</button>
        ))}
      </div>
    )
  }

  render() {
    const {
      game,
      play,
      score: {
        user, comp, bestOutOf, plays
      }
    } = this.state

    return (
      <div>
        <h2>Game Screen</h2>

        <Score
          user={user}
          comp={comp}
          bestOutOf={bestOutOf}
          plays={plays}
        />

        {this.renderOptions()}
      </div>
    )
  }
}
