import Parser from '../src/core/parser'
import { choice } from '../src/operator/choice'
import { empty } from '../src/operator/empty'
import { endOfFile } from '../src/operator/end_of_file'
import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'
import { zeroOrMore } from '../src/operator/zero_or_more'

describe('1', () => {
  test('1', () => {
    const p = new Parser()
    p.define('expression', () => terminal('abc'))
    p.startFrom('expression')

    expect(p.parse('abc')).toEqual({ success: true, consumed: 3 })
    expect(p.parse('abcd')).toEqual({ success: true, consumed: 3 })
  })

  test('2', () => {
    const p = new Parser()
    p.define('expression', () => sequence([terminal('abc'), endOfFile()]))
    p.startFrom('expression')

    expect(p.parse('abc')).toEqual({ success: true, consumed: 3 })
    expect(p.parse('abcd')).toEqual({ success: false, consumed: 3 })
  })

  test('3', () => {
    global.enableLog = true
    const p = new Parser()
    p.define('expression', () =>
      // sequence([terminal('abc'), p.refer('expression')])
      sequence([terminal('abc'), choice([p.refer('expression'), endOfFile()])])
    )
    p.startFrom('expression')

    // expect(p.parse('abc')).toEqual({ success: true, consumed: 3 })
    expect(p.parse('abcabc')).toEqual({ success: true, consumed: 6 })
    // expect(p.parse('abcabcd')).toEqual({ success: false, consumed: 6 })
  })
})