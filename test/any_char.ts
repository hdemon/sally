import { anyChar } from '../src/any_char'

test('Success cases', () => {
  expect(anyChar()().parse('1')).toEqual({
    consumed: 1,
    success: true,
  })
})

test('Failure cases', () => {
  expect(anyChar()().parse('123')).toEqual({
    consumed: 1,
    success: false,
  })
  expect(anyChar()().parse('')).toEqual({
    consumed: 0,
    success: false,
  })
})
