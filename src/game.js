const ROCK = 'ROCK'

class Game {

  start (play) {
    return new Promise((resolve) => {
      play()
      play()
      play()
      resolve()
    })
  }
}

module.exports = {
  Game,
  ROCK,
}
