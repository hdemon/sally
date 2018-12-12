import Empty from './empty'
import NonTerminal from './non_terminal'
import Terminal from './terminal'

type ParsingExpression = Terminal | NonTerminal | Empty
type LazyParsingExpression = () => ParsingExpression

export default LazyParsingExpression
