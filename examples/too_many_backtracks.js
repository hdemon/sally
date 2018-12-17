const { Parser, choice, sequence, terminal } = require('../dist/sally')
const p = new Parser()

// The definition below was borrowed from http://kmizu.hatenablog.com/entry/20090226/1235649181

p.startFrom('S')
p.define('S', () => p.refer('A'))
p.define('A', () =>
  choice([
    sequence([p.refer('P'), terminal('+'), p.refer('A')]),
    sequence([p.refer('P'), terminal('-'), p.refer('A')]),
    p.refer('P'),
  ])
)

p.define('P', () =>
  choice([
    sequence([terminal('('), p.refer('A'), terminal(')')]),
    terminal('1'),
  ])
)

console.time('without packrat parsing')
p.parse(`(((((((((((((1)))))))))))))`, { packratParsing: false })
console.timeEnd('without packrat parsing')

console.time('with packrat parsing')
p.parse(`(((((((((((((1)))))))))))))`)
console.timeEnd('with packrat parsing')
