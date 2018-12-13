import { endOfFile } from '../src/end_of_file'

test('Success cases', () => {
  expect(endOfFile()().parse('')).toEqual({
    consumed: 0,
    success: true,
  })
})

test('Failure cases', () => {
  expect(endOfFile()().parse('1')).toEqual({
    consumed: 0,
    success: false,
  })
  expect(endOfFile()().parse('123')).toEqual({
    consumed: 0,
    success: false,
  })
})
