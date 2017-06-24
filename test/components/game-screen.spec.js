import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'

import GameScreen from '../../src/js/components/game-screen'

describe.only('Game Screen', () => {
  it('should display options to choose from', () => {
    const wrapper = shallow(<GameScreen />)
    expect(wrapper.find('button')).to.length(3)
  })
})
