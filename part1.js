function numbersOfCastlesToBuild(stretchOfLand) {
  if (!stretchOfLand || !stretchOfLand.length) return 0
  if (stretchOfLand.length === 1) return 1

  let countHouses = 1
  let curr, prev, next, state

  for (var i=1; i<stretchOfLand.length - 1; i++) {
    prev = stretchOfLand[i-1]    
    curr = stretchOfLand[i]
    next = stretchOfLand[i+1]

    // Peak: 1 5 2
    if(curr > prev && curr > next) {
      countHouses++
      state = 'down'
    } 
    // Valley: 9 2 9
    else if(curr < prev && curr < next) {
      countHouses++
      state = 'up'
    } 
    // 2 6 8
    else if (prev < curr && curr >= next) {
      state = 'up'
    }
    // 9 5 2
    else if (curr < prev && curr >= next) {
      state = 'down'
    } 
    // Peak: _ 6 3
    else if (next < curr && state === 'up') {
      countHouses++
      state = 'down'
    }
    // Valley: _ 1 9
    else if (next > curr && state === 'down') {
      countHouses++
      state = 'up'
    }
  }

  return countHouses
}

module.exports = numbersOfCastlesToBuild
