import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { stub } from 'sinon'
import Score, { LastPlayWinner, ScorePoints } from '../../src/js/components/score'
import { USER, COMPUTER } from '../../src/js/referee'

// example props
// {
//   user: 0,                   // number
//   comp: 0,                   // number
//   bestOutOf: 3,              // number
//   plays: [{
//    winner: USER || COMPUTER  // string
//    comp: *COMPUTER CHOICE*   // string
//    user: *USER CHOICE*       // string
//   }] // 0...
// }
//
describe('<Score />', () => {
  it('should display no one as the winner of the last play', () => {
    const wrapper = shallow(<Score
      user={0}
      comp={0}
      bestOutOf={3}
      plays={[]}
    />)

    expect(wrapper.find(LastPlayWinner)).length(0)
  })

  it('should display the winner of the last play', () => {
    const wrapper = shallow(<Score
      user={0}
      comp={0}
      bestOutOf={3}
      plays={[{
        winner: COMPUTER,
        comp: 'ROCK',
        user: 'SCISSORS'
      }, {
        winner: USER,
        comp: 'PAPER',
        user: 'SCISSORS'
      }]}
    />)

    expect(wrapper.find(LastPlayWinner).find({
      winner: USER,
      comp: 'PAPER',
      user: 'SCISSORS'
    })).length(1)
  })

  it('should display the current score', () => {
    const wrapper = shallow(
      <Score
        user={10}
        comp={11}
        bestOutOf={3}
        plays={[]}
      />
    )

    expect(wrapper.find(ScorePoints).find({
      user: 10,
      comp: 11
    })).to.length(1)
  })
})
