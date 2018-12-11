import Empty from '../src/empty'
import NonTerminal from '../src/non_terminal'
import Terminal from '../src/terminal'

type ParsingExpression = Terminal | NonTerminal | Empty
type LazyParsingExpression = () => ParsingExpression

export default LazyParsingExpression
