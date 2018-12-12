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
