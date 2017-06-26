import React, { Component } from 'react'
import Game from '../game'

export default class GameScreen extends Component {
  constructor() {
    super()

    this.state = {
      game: Game.create(play => this.setState({ play })),
      play: null
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
      play
    } = this.state

    return (
      <div>
        <h2>Game Screen</h2>

        {this.renderOptions()}
      </div>
    )
  }
}
