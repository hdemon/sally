import { endOfFile } from '../src/end_of_file'
import { oneOrMore } from '../src/one_or_more'
import { sequence } from '../src/sequence'
import { terminal } from '../src/terminal'

let parser: any

beforeEach(() => {
  parser = sequence([terminal('abc'), terminal('def')])
})

test('Success cases', () => {
  expect(parser().parse('abcdef')).toEqual({ success: true, consumed: 6 })
  expect(parser().parse('abcdefghe')).toEqual({ success: true, consumed: 6 })
})

test('Failure cases', () => {
  expect(parser().parse('abcde')).toEqual({ success: false, consumed: 3 })
})

describe('With EndOfFile Operator', () => {
  test('Failure cases', () => {
    global.enableLog = true
    parser = sequence([
      sequence([terminal('abc'), terminal('def')]),
      endOfFile(),
    ])
    expect(parser().parse('abcdefghe')).toEqual({ success: false, consumed: 6 })
  })
})
