import { choice } from '../src/choice'
import { terminal } from '../src/terminal'
import { zeroOrMore } from '../src/zero_or_more'

describe('1', () => {
  let parser: any

  beforeEach(() => {
    parser = zeroOrMore(choice([terminal('abc'), terminal('def')]))
  })

  test('Success cases', () => {
    expect(parser().parse('')).toEqual({ success: true, consumed: 0 })
    expect(parser().parse('abc')).toEqual({ success: true, consumed: 3 })
    expect(parser().parse('abcabcdef')).toEqual({ success: true, consumed: 9 })
    expect(parser().parse('abcdefabcdef')).toEqual({
      consumed: 12,
      success: true,
    })
  })

  test('Failure cases', () => {
    expect(parser().parse('abcde')).toEqual({ success: false, consumed: 3 })
  })
})
