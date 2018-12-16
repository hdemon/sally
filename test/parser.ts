import Parser from '../src/core/parser'
import { choice } from '../src/operator/choice'
import { empty } from '../src/operator/empty'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'
const jsome = require('jsome')

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
    const p = new Parser()
    p.define('expression', () =>
      sequence([terminal('abc'), choice([p.refer('expression'), empty()])])
    )
    p.startFrom('expression')

    expect(p.parse('abc')).toMatchObject({ success: true, consumed: 3 })
    expect(p.parse('abcd')).toMatchObject({ success: false, consumed: 3 })
    expect(p.parse('abcabc')).toMatchObject({ success: true, consumed: 6 })
    expect(p.parse('abcabcd')).toMatchObject({ success: false, consumed: 6 })
    expect(p.parse('abcabcabcd')).toMatchObject({ success: false, consumed: 9 })
  })
})
