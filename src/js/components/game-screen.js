import React, { Component } from 'react'
import Game from '../game'

export default class GameScreen extends Component {
  constructor() {
    super()

    this.state = {
      game: Game.create(play => this.handlePlay(play))
    }
  }

  handlePlay(play) {
    this.setState({ play })
  }

  renderOptions() {
    return null;
    // <div>
    //   {game.getOptions().map((o, n) => (
    //     <button key={n}>{o}</button>
    //   ))}
    // </div>
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
