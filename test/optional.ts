import { optional } from '../src/optional'
import { terminal } from '../src/terminal'

let parser: any
beforeEach(() => {
  parser = optional(terminal('abc'))
})

test('Success cases', () => {
  expect(parser().parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser().parse('')).toEqual({ success: true, consumed: 0 })
})

test('Failure cases', () => {
  expect(parser().parse('def')).toEqual({ success: false, consumed: 0 })
})
