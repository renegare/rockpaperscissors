import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'

import GameUI from '../../src/js/components/game-ui'
import StartScreen from '../../src/js/components/start-screen'
import GameScreen from '../../src/js/components/game-screen'
import DemoGameScreen from '../../src/js/components/demo-game-screen'

describe.only('Game UI', () => {
  it('should display start game option and demo option', () => {
    const wrapper = shallow(<GameUI />)
    expect(wrapper.find(StartScreen)).to.length(1)
  })

  it('should start game', () => {
    const wrapper = shallow(<GameUI />)
    wrapper.find(StartScreen).first().prop('onStartGame')()
    expect(wrapper.find(GameScreen)).to.length(1)
  })

  it('should start demo', () => {
    const wrapper = shallow(<GameUI />)
    wrapper.find(StartScreen).first().prop('onDemoGame')()
    expect(wrapper.find(DemoGameScreen)).to.length(1)
  })
})
