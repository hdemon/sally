import Optional from '../src/optional'
import Terminal from '../src/terminal'

let parser: any
beforeEach(() => {
  parser = new Optional(() => new Terminal('abc'))
})

test('Success cases', () => {
  expect(parser.parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser.parse('')).toEqual({ success: true, consumed: 0 })
})

test('Failure cases', () => {
  expect(parser.parse('def')).toEqual({ success: false, consumed: 0 })
})
