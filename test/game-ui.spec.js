import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'

import GameUI from '../src/js/components/game-ui'
import StartScreen from '../src/js/components/start-screen'

describe.only('Game UI', () => {

  it('should display start game option and demo option', () => {
    const wrapper = shallow(<GameUI />)
    expect(wrapper.find(StartScreen)).to.length(1)
  })

  it('should start game', () => {
    const onStartGameStub = stub()
    const wrapper = shallow(<GameUI onStartGame={onStartGameStub} />)
    wrapper.find(StartScreen).first().prop('onStartGame')()
    expect(onStartGameStub.calledOnce).to.be.true
  })

  it('should start demo', () => {
    const onDemoGameStub = stub()
    const wrapper = shallow(<GameUI onDemoGame={onDemoGameStub} />)
    wrapper.find(StartScreen).first().prop('onDemoGame')()
    expect(onDemoGameStub.calledOnce).to.be.true
  })
})
