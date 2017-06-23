import Computer from '../src/computer'
import { stub } from 'sinon'

describe('the computer', () => {
  let random
  let floor

  before(() => {
    random = stub(Math, 'random')
    floor = stub(Math, 'floor')
  })

  beforeEach(() => {
    random.reset()
    floor.reset()
  })

  after(() => {
    random.restore()
    floor.restore()
  })

  it.only('should return a random choice', done => {
    const possibleOptions = [ 1, 2, 3 ]
    const computer = new Computer(possibleOptions)

    random.returns(0.5)
    floor.returns(2)

    computer.play(choice => {
      expect(choice).to.eql(3)

      expect(random.calledOnce).to.be.true
      expect(floor.calledOnce).to.be.true

      done()
    })
  })
})
