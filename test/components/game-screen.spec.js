import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import GameScreen, { Score } from '../../src/js/components/game-screen'
import Game from '../../src/js/game'

const findAndVerifyEventListener = (registerStub, name) => {
    expect(registerStub.callCount).least(1)
    const { args: [ , listener ] } = registerStub.getCalls()
      .find(({ args: [ event ] }) => event === name )
    return listener
}

describe.only('Game Screen', () => {
  let getOptions
  let create
  let registerListener

  before(() => {
    create = stub(Game, 'create')
    getOptions = stub(Game.prototype, 'getOptions')
    registerListener = stub(Game.prototype, 'on')
  })

  beforeEach(() => {
    create.reset()
    getOptions.reset()
    registerListener.reset()

    create.callsFake((...args) => new Game(...args))
  })

  after(() => {
    create.restore()
    getOptions.restore()
    registerListener.restore()
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

    const wrapper = shallow(<GameScreen />)
    expect(wrapper.find('button')).to.length(0)

    create.firstCall.args[0](selectedOption => {
      expect(selectedOption).to.eql(expectedOptions[1])

      setTimeout(() => {
        expect(wrapper.find('button')).length(0)
        done()
      }, 0)
    })

    const buttons = wrapper.find('button')
    expect(buttons).length(3)
    buttons.at(1).simulate('click')
  })

  it('should listen for score updates', () => {
    const wrapper = shallow(<GameScreen />)
    expect(wrapper.find(Score).find({
      user: 0,
      comp: 0,
      bestOutOf: 3,
      plays: 0
    })).to.length(1)

    const listener = findAndVerifyEventListener(registerListener, 'score')

    listener({
      user: 200,
      comp: 10,
      plays:4,
      bestOutOf:3
    })

    wrapper.update()

    expect(wrapper.find(Score).find({
      user: 200,
      comp: 10,
      bestOutOf: 3,
      plays: 4
    })).to.length(1)
  })

  it('should trigger onEnd when game has completed', () => {
    const onEndStub = stub()
    const wrapper = shallow(<GameScreen onEnd={onEndStub} />)
    const listener = findAndVerifyEventListener(registerListener, 'end')
    expect(listener).instanceof(Function)
    listener()
    expect(onEndStub.calledOnce).to.be.true
  })

  it('should trigger onError when game has and error', () => {
    const onErrorStub = stub()
    const wrapper = shallow(<GameScreen onError={onErrorStub} />)
    const listener = findAndVerifyEventListener(registerListener, 'error')
    expect(listener).instanceof(Function)
    listener()
    expect(onErrorStub.calledOnce).to.be.true
  })
})
