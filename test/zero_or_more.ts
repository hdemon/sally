import { endOfFile } from '../src/end_of_file'
import { sequence } from '../src/sequence'
import { terminal } from '../src/terminal'
import { zeroOrMore } from '../src/zero_or_more'

let parser: any

beforeEach(() => {
  parser = zeroOrMore(terminal('abc'))
})

test('Success cases', () => {
  expect(parser().parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser().parse('abcabc')).toEqual({ success: true, consumed: 6 })
  expect(parser().parse('')).toEqual({ success: true, consumed: 0 })
})

test('Failure cases', () => {
  expect(parser().parse('abcdef')).toEqual({ success: false, consumed: 3 })
  expect(parser().parse('def')).toEqual({ success: false, consumed: 0 })
})

describe('With EndOfFile Operator', () => {
  test('Failure cases', () => {
    parser = sequence([zeroOrMore(terminal('abc')), endOfFile()])
    expect(parser().parse('abcdef')).toEqual({ success: false, consumed: 3 })
  })
})
