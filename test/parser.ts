import Parser from '../src/core/parser'
import { choice } from '../src/operator/choice'
import { empty } from '../src/operator/empty'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'

describe('`parse` method', () => {
  const p = new Parser()
  p.define('expression', () => terminal('abc'))
  p.startFrom('expression')

  test('It returns false when all the inputted string has been consumed.', () => {
    expect(p.parse('abc')).toMatchObject({ success: true, consumed: 3 })
  })

  test("It returns false when all the inputted string hasn't been consumed.", () => {
    expect(p.parse('abcd')).toMatchObject({ success: false, consumed: 3 })
  })

  test('3', () => {
    const p2 = new Parser()
    p2.define('expression', () =>
      sequence([terminal('abc'), choice([p2.refer('expression'), empty()])])
    )
    p2.startFrom('expression')

    expect(p2.parse('abc')).toMatchObject({ success: true, consumed: 3 })
    expect(p2.parse('abcd')).toMatchObject({ success: false, consumed: 3 })
    expect(p2.parse('abcabc')).toMatchObject({ success: true, consumed: 6 })
    expect(p2.parse('abcabcd')).toMatchObject({ success: false, consumed: 6 })
    expect(p2.parse('abcabcabcd')).toMatchObject({
      success: false,
      consumed: 9,
    })
  })
})
