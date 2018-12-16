import { oneOrMore } from '../src/alias/one_or_more'
import { terminal } from '../src/operator/terminal'

let parser: any

beforeEach(() => {
  parser = oneOrMore(terminal('abc'))
})

test('Success and all characters will be consumed.', () => {
  expect(parser.parse('abc')).toMatchObject({ success: true, consumed: 3 })
  expect(parser.parse('abcabc')).toMatchObject({ success: true, consumed: 6 })
})

test("Success but some characters won't be consumed.", () => {
  expect(parser.parse('abcdef')).toMatchObject({ success: true, consumed: 3 })
})

test('Failure cases', () => {
  expect(parser.parse('')).toMatchObject({ success: false, consumed: 0 })
  expect(parser.parse('def')).toMatchObject({ success: false, consumed: 0 })
})
