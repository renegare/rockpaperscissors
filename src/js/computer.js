export default class Computer {
  constructor(possibleOptions) {
    this.possibleOptions = possibleOptions
  }

  play (setChoice) {
    const idx = Math.floor(Math.random() * this.possibleOptions.length)
    setChoice(this.possibleOptions[idx])
  }
}
