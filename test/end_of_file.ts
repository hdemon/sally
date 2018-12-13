import { endOfFile } from '../src/end_of_file'
import { sequence } from '../src/sequence'
import { terminal } from '../src/terminal'
import { zeroOrMore } from '../src/zero_or_more'

// test('Success cases', () => {
//   expect(endOfFile()().parse('')).toEqual({
//     consumed: 0,
//     success: true,
//   })
// })

// test('Failure cases', () => {
//   expect(endOfFile()().parse('1')).toEqual({
//     consumed: 0,
//     success: false,
//   })
//   expect(endOfFile()().parse('123')).toEqual({
//     consumed: 0,
//     success: false,
//   })
// })

let parser: any
beforeEach(() => {
  // parser = sequence([zeroOrMore(terminal('abc')), endOfFile()])
  parser = zeroOrMore(terminal('abc'))
})

test('Success cases', () => {
  expect(parser().parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser().parse('abcabc')).toEqual({ success: true, consumed: 6 })
  expect(parser().parse('')).toEqual({ success: true, consumed: 0 })
})

test('Failure cases', () => {
  expect(parser().parse('abcd')).toEqual({ success: false, consumed: 3 })
})
