const numbersOfCastlesToBuild = require('../part1')

describe('numbersOfCastlesToBuild', () => {
  test('should validate incorrect inputs', () => {
    const incorrectInputs = [
      { input: [], expected: 0 },
      { input: 2, expected: 0 },
      { input: undefined, expected: 0 }
    ]
  
    incorrectInputs.forEach(({ input, expected }) => {
      const actualResult = numbersOfCastlesToBuild(input)
      expect(actualResult).toBe(expected)
    })
  })
  
  test('should return correct outputs', () => {
    const correctInputs = [
      { input: [6], expected: 1 },
      { input: [1,5,2], expected: 2 },
      { input: [1,1,5,2,2], expected: 2 },
      { input: [2,6,6,6,3], expected: 2 },
      { input: [9,1,9], expected: 2 },
      { input: [9,9,1,9,9], expected: 2 },
      { input: [9,1,1,1,9], expected: 2 },
      { input: [9,1,9,1,9], expected: 4 },
      { input: [1,2,1,2,3,4,1,1,2,9,1,1,2,1,1,2,1], expected: 10 },
      { input: [3,4,4,5,6,1,9,2,2,4,3,8,6,6], expected: 8 },
      { input: [3,3,3,3], expected: 1 },
    ]
  
    correctInputs.forEach(({ input, expected }) => {
      const actualResult = numbersOfCastlesToBuild(input)
      expect(actualResult).toBe(expected)
    })
  })
})
