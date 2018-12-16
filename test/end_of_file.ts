import { endOfFile } from '../src/alias/end_of_file'

test('Success cases', () => {
  expect(endOfFile().parse('')).toMatchObject({
    consumed: 0,
    success: true,
  })
})

test('Failure cases', () => {
  expect(endOfFile().parse('1')).toMatchObject({
    consumed: 0,
    success: false,
  })
  expect(endOfFile().parse('123')).toMatchObject({
    consumed: 0,
    success: false,
  })
})
