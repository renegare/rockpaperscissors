import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'

import StartScreen from '../../src/js/components/start-screen'

describe.only('Start Screen', () => {
  it('should display start game option', () => {
    const onStartGame = stub()
    const wrapper = shallow(<StartScreen onStartGame={onStartGame}/>)
    const startGameBtn = wrapper.findWhere(n => {
      return n.type() === 'button' && n.text() === 'Start a new game'
    })
    expect(startGameBtn).to.length(1)
    startGameBtn.simulate('click')
    expect(onStartGame.calledOnce).to.be.true
  })

  it('should display start demo option', () => {
    const onStartDemo = stub()
    const wrapper = shallow(<StartScreen onStartDemo={onStartDemo}/>)
    const startDemoBtn = wrapper.findWhere(n => {
      return n.type() === 'button' && n.text() === 'Start a demo'
    })
    expect(startDemoBtn).to.length(1)
    startDemoBtn.simulate('click')
    expect(onStartDemo.calledOnce).to.be.true
  })
})
