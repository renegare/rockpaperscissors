import React, { Component } from 'react'
import StartScreen from './start-screen'
import GameScreen from './game-screen'
import DemoGameScreen from './demo-game-screen'

const REAL_GAME = 'REAL_GAME'
const DEMO_GAME = 'DEMO_GAME'

export default class GameUI extends Component {
  constructor () {
    super()
    this.state = {
      gameType: null
    }
  }

  startGame () {
    this.setState({ gameType: REAL_GAME })
  }

  startDemoGame() {
    this.setState({ gameType: DEMO_GAME })
  }

  renderScreen() {
    switch(this.state.gameType) {
      case REAL_GAME:
        return (
          <GameScreen />
        )

      case DEMO_GAME:
        return (
          <DemoGameScreen />
        )

      default:
        return (
          <StartScreen
            onStartGame={() => this.startGame()}
            onDemoGame={() => this.startDemoGame()}
          />
        )

    }
  }

  render () {
    return (
      <section>
        {this.renderScreen()}
      </section>
    )
  }
}
