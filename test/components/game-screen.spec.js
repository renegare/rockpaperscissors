import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import GameScreen from '../../src/js/components/game-screen'
import Game from '../../src/js/game'

describe.only('Game Screen', () => {
  let getOptions
  let create

  before(() => {
    create = stub(Game, 'create')
    getOptions = stub(Game.prototype, 'getOptions')
  })

  beforeEach(() => {
    create.reset()
    getOptions.reset()

    create.callsFake((...args) => new Game(...args))
  })

  after(() => {
    create.restore()
    getOptions.restore()
  })

  it('should display options to choose from', () => {
    const expectedOptions = [ 'ROCK', 'PAPER', 'SCISSORS' ]
    getOptions.returns(expectedOptions)

    const wrapper = shallow(<GameScreen />)
    expect(wrapper.find('button')).to.length(0)

    // verify a game instance has been created
    expect(create.calledOnce).to.be.true
    const componentPlayHandler = create.firstCall.args[0]

    // simulate game calling for the users selection
    componentPlayHandler(() => {})

    // verify options have been rendered
    const buttons = wrapper.find('button')
    const options = buttons.map(n => n.text())
    expect(buttons).to.have.length(expectedOptions.length)
    expect(options).to.eql(expectedOptions)
  })

  it('should disable options after user has made a selection', done => {
    const expectedOptions = [ 'ROCK', 'PAPER', 'SCISSORS' ]
    getOptions.returns(expectedOptions)
    create.callsFake((...args) => new Game(...args))

    const wrapper = shallow(<GameScreen />)
    expect(wrapper.find('button')).to.length(0)

    create.firstCall.args[0](selectedOption => {
      expect(selectedOption).to.eql(expectedOptions[1])

      setTimeout(() => {
        expect(wrapper.find('button')).length(0)
        done()
      })
    })

    const buttons = wrapper.find('button')
    expect(buttons).length(3)
    buttons.at(1).simulate('click')
  })
})
