import { sequence } from '../src/operator/sequence'
import { terminal } from '../src/operator/terminal'

test('Success cases', () => {
  expect(terminal('123').parse('123')).toMatchObject({
    consumed: 3,
    success: true,
  })
  expect(terminal('12').parse('123')).toMatchObject({
    consumed: 2,
    success: true,
  })
})

test('Failure cases', () => {
  expect(terminal('ABC').parse('123')).toMatchObject({
    consumed: 0,
    success: false,
  })
  expect(terminal('123').parse('12')).toMatchObject({
    consumed: 0,
    success: false,
  })
})
