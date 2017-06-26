import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import GameScreen from '../../src/js/components/game-screen'
import Game from '../../src/js/game'

describe.only('Game Screen', () => {
  let getOptions

  before(() => {
    getOptions = stub(Game.prototype, 'getOptions')
  })

  beforeEach(() => {
    getOptions.reset()
  })

  after(() => {
    getOptions.restore()
  })

  it('should display options to choose from', () => {
    const expectOptions = [ 'ROCK', 'PAPER', 'SCISSORS' ]
    getOptions.returns(expectOptions)
    const wrapper = shallow(<GameScreen />)
    const buttons = wrapper.find('button')
    expect(buttons).to.have.length(expectOptions.length)
    const options = buttons.map(n => n.text())
    expect(options).to.eql(expectOptions)
  })
})
