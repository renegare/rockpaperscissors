import React, { Component } from 'react'
import StartScreen from './start-screen'

export default class GameUI extends Component {

  render () {
    const {
      onStartGame,
      onDemoGame,
    } = this.props

    return (
      <section>
        <StartScreen
          onStartGame={onStartGame}
          onDemoGame={onDemoGame}
        />
      </section>
    )
  }
}
