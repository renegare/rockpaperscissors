import React from 'react'

/**
 * Displays the current score and the winner of the last
 * play. Not to be confused with the overall winner of the
 * game
 */
export default ({
  user,
  comp,
  plays
}) => {
  const lastPlay = plays.length ? plays[plays.length - 1] : null
  return (
    <aside>
      <ScorePoints
        user={user}
        comp={comp}
      />
      {lastPlay ?
      <LastPlayWinner
        winner={lastPlay.winner}
        user={lastPlay.user}
        comp={lastPlay.comp}
      /> : null}
    </aside>
  )
}

// internal components to ease testing and concise

export const LastPlayWinner = ({ winner }) => (
  <span>{winner}</span>
)

export const ScorePoints = ({
  user,
  comp,
}) => (
  <span>Score: {user}-{comp}</span>
)
