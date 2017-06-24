require('../css/main.scss');

import React from 'react';
import { render } from 'react-dom'
import GameUI from './components/game-ui'


render(
  <GameUI />,
  document.querySelector('#game')
)


// on document ready

// show button to start game or demo
//
// on start game
//  set class start-game-view on dom
//  create new game
//    on user click option
//      update game
//      update state of dom
//    on game complete
//      set class results-view on dom
//      show new game or demo
//    on game halt
//      update state of dom
//    on resume
//      update state of dom
//    on restart
//
//
