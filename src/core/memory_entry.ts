import { ResultOfParsing } from './parsing_expression'

export default interface MemoEntry {
  position: number
  result: ResultOfParsing
}
