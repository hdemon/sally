import { oneOrMore } from '../src/one_or_more'
import { terminal } from '../src/terminal'

let parser: any

beforeEach(() => {
  parser = oneOrMore(terminal('abc'))
})

test('Success cases', () => {
  expect(parser().parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser().parse('abcabc')).toEqual({ success: true, consumed: 6 })
  expect(parser().parse('')).toEqual({ success: false, consumed: 0 })
})

test('Failure cases', () => {
  expect(parser().parse('abcdef')).toEqual({ success: false, consumed: 3 })
  expect(parser().parse('def')).toEqual({ success: false, consumed: 0 })
})
