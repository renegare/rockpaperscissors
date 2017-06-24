import React, { Component } from 'react'

export default ({ onStartGame, onStartDemo }) => (
  <section>
    <button onClick={onStartGame}>Start a new game</button>
    <button onClick={onStartDemo}>Start a demo</button>
  </section>
)
