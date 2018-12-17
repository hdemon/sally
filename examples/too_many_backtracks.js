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

const number = process.argv[3]
const input = [
  ...Array(Number(number)).fill('('),
  '1',
  ...Array(Number(number)).fill(')'),
]
let label, enablePackratParsing

if (process.argv[2] === '--disable-packrat') {
  enablePackratParsing = false
  label = 'with packrat parsing'
} else {
  label = 'without packrat parsing'
}

console.time(label)
const result = p.parse(input, { enablePackratParsing })
console.timeEnd(label)
if (result.success) {
  console.log('Parsing has succeeded.')
} else {
  console.log('Parsing has failed.')
}
