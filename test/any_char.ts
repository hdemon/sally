import { anyChar } from '../src/operator/any_char'
import { endOfFile } from '../src/alias/end_of_file'
import { sequence } from '../src/operator/sequence'

test('Success cases', () => {
  expect(anyChar().parse('1')).toMatchObject({
    consumed: 1,
    success: true,
  })
  expect(anyChar().parse('123')).toMatchObject({
    consumed: 1,
    success: true,
  })
})

test('Failure cases', () => {
  expect(anyChar().parse('')).toMatchObject({
    consumed: 0,
    success: false,
  })
})
