import { choice } from '../src/choice'
import { sequence } from '../src/sequence'
import { terminal } from '../src/terminal'
import { zeroOrMore } from '../src/zero_or_more'

let parser: any

global.enableLog = true
beforeEach(() => {
  parser = sequence([
    choice([terminal('abc'), terminal('def')]),
    choice([terminal('abc'), terminal('def')]),
  ])
})
test('Success cases', () => {
  // expect(parser().parse('abc')).toEqual({ success: true, consumed: 3 })
  expect(parser().parse('abcabcdef')).toEqual({ success: true, consumed: 9 })
})

test('Failure cases', () => {
  expect(parser().parse('abcde')).toEqual({ success: false, consumed: 3 })
})

// input: abcabcdef try to match with: abc -> is terminal? true
//   abcabcdef -> choice? true
//   abcabcdef -> sequence? false
//   abcabcdef -> choice? false
//   abcabcdef -> empty? false
//   abcabcdef -> choice? false
//   abcabcdef -> zero_or_more? false
