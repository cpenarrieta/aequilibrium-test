const RobotType = {
  Autobots: 'Autobots',
  Deceptions: 'Deceptions'
}

const SpecialRobots = {
  "Optimus Prime": 'Optimus Prime',
  Predaking: 'Predaking'
}

const Robot = (robotName, robotType, criteria) => {
  const { strength, intelligence, speed, endurance, rank, courage, firepower, skill } = criteria
  const name = robotName
  const type = robotType

  return {
    name,
    type,
    strength, 
    intelligence, 
    speed, 
    endurance, 
    rank, 
    courage, 
    firepower, 
    skill,
    rating: () => strength + intelligence + speed + endurance + rank + courage + firepower + skill,
  }
}

/*
  A: robotA wins (Autobots)
  D: robotD wins (Deceptions)
  N: tie, both get destroyed
*/
const battle = (robotA, robotD) => {
  if (robotA.name in SpecialRobots && robotD.name in SpecialRobots)
    return 'END'

  // Any Transformer named 'Optimus Prime' or 'Predaking' wins his fight automatically regardless of any other criteria
  if (robotA.name in SpecialRobots)
    return 'A'

  if (robotD.name in SpecialRobots)
    return 'D'

  // If any fighter is down 4 or more points of courage and 3 or more points of strength compared to their opponent, the opponent automatically wins the face-off
  if (robotA.courage - robotD.courage >= 4 && robotA.strength - robotD.strength >= 3)
    return 'A'

  if (robotD.courage - robotA.courage >= 4 && robotD.strength - robotA.strength >= 3)
    return 'D'

  // If one of the fighters is 3 or more points of skill above their opponent, they win the fight regardless of overall rating
  if (robotA.skill - robotD.skill >= 3)
    return 'A'

  if (robotD.skill - robotA.skill >= 3)
    return 'D'

  // The winner is the Transformer with the highest overall rating
  if (robotA.rating() > robotD.rating())
    return 'A'

  if (robotD.rating() > robotA.rating())
    return 'D'

  // In the event of a tie, both Transformers are considered destroyed
  return 'N'
}

/*
  autobotsRobots: Array of Robots of type Autobots
  deceptionsRobots: Array of Robots of type Deceptions
*/
const Game = (autobotsRobots, deceptionsRobots) => {
  autobotsRobots.sort(sortByRank)
  deceptionsRobots.sort(sortByRank)

  var winner = ''
  let loser = ''
  let numberOfBatles = 0
  let winsAutobots = 0
  let winsDeceptions = 0
  let survivorsFromAutobots = []
  let survivorsFromDeceptions = []
  let survivorsFromLosingTeam = []

  return {
    getWinner: () => winner,
    getLoser: () => loser,
    getNumberOfBatles: () => numberOfBatles,
    getSurvivorsFromLosingTeam: () => survivorsFromLosingTeam,

    play: () => {
      const shortestLength = autobotsRobots.length < deceptionsRobots.length ? autobotsRobots.length : deceptionsRobots.length

      for (var i=0; i<shortestLength; i++) {
        const battleWinner = battle(autobotsRobots[i], deceptionsRobots[i])
        
        if (battleWinner === 'A') {
          winsAutobots++
          survivorsFromAutobots.push(autobotsRobots[i])
        } else if (battleWinner === 'D') {
          winsDeceptions++
          survivorsFromDeceptions.push(deceptionsRobots[i])
        } else if (battleWinner === 'END') {
          return 'END'
        }
    
        numberOfBatles++
      }
    
      winner = winsAutobots >= winsDeceptions ? RobotType.Autobots : RobotType.Deceptions
      loser = winner === RobotType.Autobots ? RobotType.Deceptions : RobotType.Autobots
    
      // getting the rest of survivors from loser if needed
      if (winner === RobotType.Autobots && deceptionsRobots.length > autobotsRobots.length) {
        for (i; i<deceptionsRobots.length; i++) {
          survivorsFromDeceptions.push(deceptionsRobots[i])
        }
      } else if (winner === RobotType.Deceptions && autobotsRobots.length > deceptionsRobots.length) {
        for (i; i<autobotsRobots.length; i++) {
          survivorsFromAutobots.push(autobotsRobots[i])
        }
      }

      survivorsFromLosingTeam = winner === RobotType.Autobots ? survivorsFromDeceptions : survivorsFromAutobots
    },

    printResults: () => {
      return `${numberOfBatles} battles\nWining team: ${winner}\nSurvivors from the losing team (${loser}) ${survivorsFromLosingTeam.map(l => l.name)}`
    }
  }
}

const sortByRank = (a, b) => {
  if (a.rank > b.rank)
    return -1

  if (b.rank > a.rank)
    return 1
  
  return 0
}

module.exports = { Robot ,battle, Game, RobotType, SpecialRobots }
