const { Robot, RobotType, SpecialRobots, battle, Game } = require('../part2')

describe('Robot', () => {
  test('should calculate rating', () => {
    const robot = Robot('robot name', RobotType.Autobots, { strength: 1, intelligence: 2, speed: 3, endurance: 4, rank: 5,  courage: 6, firepower: 7, skill: 8 })
    expect(robot.rating()).toBe(36)
  })
})

describe('Battle', () => {
  test('should calculate winner if name is Optimus Prime', () => {
    const robot_a = Robot('Optimus Prime', RobotType.Autobots, { strength: 0, intelligence: 0, speed: 0, endurance: 0, rank: 0,  courage: 0, firepower: 0, skill: 0 })
    const robot_d = Robot('robot name', RobotType.Deceptions, { strength: 10, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 10, firepower: 10, skill: 10 })
    expect(battle(robot_a, robot_d)).toBe('A')
  })

  test('should calculate winner if name is Predaking', () => {
    const robot_a = Robot('robot name', RobotType.Deceptions, { strength: 10, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 10, firepower: 10, skill: 10 })
    const robot_d = Robot('Predaking', RobotType.Autobots, { strength: 0, intelligence: 0, speed: 0, endurance: 0, rank: 0,  courage: 0, firepower: 0, skill: 0 })
    expect(battle(robot_a, robot_d)).toBe('D')
  })

  test('should calculate winner if any fighter is down 4 or more points of courage and 3 or more points of strength', () => {
    const robot_a = Robot('autobot_name', RobotType.Autobots, { strength: 4, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 2, firepower: 10, skill: 10 })
    const robot_d = Robot('decption_name', RobotType.Deceptions, { strength: 7, intelligence: 1, speed: 1, endurance: 1, rank: 9,  courage: 6, firepower: 3, skill: 5 })
    expect(battle(robot_a, robot_d)).toBe('D')
  })

  test('should calculate winner if one of the fighters is 3 or more points of skill above', () => {
    const robot_a = Robot('autobot_name', RobotType.Autobots, { strength: 1, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 1, firepower: 10, skill: 3 })
    const robot_d = Robot('decption_name', RobotType.Deceptions, { strength: 1, intelligence: 1, speed: 1, endurance: 1, rank: 1,  courage: 1, firepower: 1, skill: 8 })
    expect(battle(robot_a, robot_d)).toBe('D')
  })

  test('should calculate winner using the overall rating', () => {
    const robot_a = Robot('autobot_name', RobotType.Autobots, { strength: 1, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 1, firepower: 10, skill: 1 })
    const robot_d = Robot('decption_name', RobotType.Deceptions, { strength: 1, intelligence: 1, speed: 1, endurance: 1, rank: 1,  courage: 1, firepower: 1, skill: 1 })
    expect(battle(robot_a, robot_d)).toBe('A')
  })

  test('should calculate a Tie if both robots have the same overall rating', () => {
    const robot_a = Robot('autobot_name', RobotType.Autobots, { strength: 10, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 10, firepower: 10, skill: 10 })
    const robot_d = Robot('decption_name', RobotType.Deceptions, { strength: 10, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 10, firepower: 10, skill: 10 })
    expect(battle(robot_a, robot_d)).toBe('N')
  })

  test('should detect if both robots have the same Special Name', () => {
    const robot_a = Robot('Optimus Prime', RobotType.Autobots, { strength: 10, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 10, firepower: 10, skill: 10 })
    const robot_d = Robot('Predaking', RobotType.Deceptions, { strength: 10, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 10, firepower: 10, skill: 10 })
    expect(battle(robot_a, robot_d)).toBe('END')
  })
})

describe('Game', () => {
  test('should calculate an overall winner', () => {
    const a_1 = Robot('Optimus Prime', RobotType.Autobots, { strength: 5, intelligence: 3, speed: 2, endurance: 7, rank: 6,  courage: 3, firepower: 8, skill: 1 })
    const a_2 = Robot('Sentinel Prime', RobotType.Autobots, { strength: 2, intelligence: 4, speed: 3, endurance: 3, rank: 10, courage: 2, firepower: 7, skill: 0 })
    const a_3 = Robot('Chromia', RobotType.Autobots, { strength: 3, intelligence: 7, speed: 5, endurance: 8, rank: 3,  courage: 1, firepower: 8, skill: 5 })
    const a_4 = Robot('Ultra Magnus', RobotType.Autobots, { strength: 6, intelligence: 9, speed: 7, endurance: 3, rank: 2,  courage: 4, firepower: 6, skill: 2 })
    const a_5 = Robot('Bulkhead', RobotType.Autobots, { strength: 8, intelligence: 5, speed: 8, endurance: 0, rank: 9,  courage: 5, firepower: 5, skill: 9 })
    const a_6 = Robot('Smokescreen', RobotType.Autobots, { strength: 1, intelligence: 9, speed: 1, endurance: 3, rank: 5,  courage: 6, firepower: 2, skill: 10 })
    
    const d_1 = Robot('Predaking', RobotType.Deceptions, { strength: 1, intelligence: 7, speed: 1, endurance: 7, rank: 10, courage: 1, firepower: 2, skill: 7 })
    const d_2 = Robot('Menasor', RobotType.Deceptions, { strength: 2, intelligence: 6, speed: 2, endurance: 6, rank: 2, courage: 2, firepower: 10, skill: 6 })
    const d_3 = Robot('Bruticus', RobotType.Deceptions, { strength: 3, intelligence: 5, speed: 3, endurance: 5, rank: 3, courage: 3, firepower: 1, skill: 5 })
    const d_4 = Robot('Abominus', RobotType.Deceptions, { strength: 4, intelligence: 4, speed: 4, endurance: 4, rank: 1, courage: 4, firepower: 9, skill: 4 })
    const d_5 = Robot('Piranacon', RobotType.Deceptions, { strength: 5, intelligence: 3, speed: 5, endurance: 3, rank: 7, courage: 5, firepower: 1, skill: 3 })
    const d_6 = Robot('Blitzwing', RobotType.Deceptions, { strength: 6, intelligence: 2, speed: 6, endurance: 0, rank: 6, courage: 6, firepower: 10, skill: 2 })
    const d_7 = Robot('Thundercracker', RobotType.Deceptions, { strength: 7, intelligence: 1, speed: 7, endurance: 2, rank: 5, courage: 7, firepower: 1, skill: 1 })
    const d_8 = Robot('Ramjet', RobotType.Deceptions, { strength: 8, intelligence: 1, speed: 1, endurance: 8, rank: 1, courage: 4, firepower: 8, skill: 0 })
    
    const autobots = [a_1, a_2, a_3, a_4, a_5, a_6]
    const deceptions = [d_1, d_2, d_3, d_4, d_5, d_6, d_7, d_8]

    const game = Game(autobots, deceptions)
    game.play()

    expect(game.getWinner()).toBe(RobotType.Autobots)
    expect(game.getLoser()).toBe(RobotType.Deceptions)
    expect(game.getNumberOfBatles()).toBe(6)
    expect(game.getSurvivorsFromLosingTeam()).toEqual([d_1, d_2, d_4, d_8])
  })

  test('should print results', () => {
    const a_1 = Robot('Optimus Prime', RobotType.Autobots, { strength: 1, intelligence: 1, speed: 1, endurance: 1, rank: 1,  courage: 1, firepower: 1, skill: 1 })
    const d_1 = Robot('Bruticus', RobotType.Deceptions, { strength: 1, intelligence: 7, speed: 1, endurance: 7, rank: 10, courage: 1, firepower: 2, skill: 7 })
    const d_2 = Robot('Blitzwing', RobotType.Deceptions, { strength: 6, intelligence: 2, speed: 6, endurance: 0, rank: 6, courage: 6, firepower: 10, skill: 2 })

    const game = Game([a_1], [d_1, d_2])
    game.play()

    expect(game.printResults()).toMatchSnapshot()
  })

  test('should end game if both robots have the Special Name', () => {
    const a_1 = Robot('Optimus Prime', RobotType.Autobots, { strength: 10, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 10, firepower: 10, skill: 10 })
    const d_1 = Robot('Predaking', RobotType.Deceptions, { strength: 10, intelligence: 10, speed: 10, endurance: 10, rank: 10,  courage: 10, firepower: 10, skill: 10 })

    const game = Game([a_1], [d_1])
    expect(game.play()).toBe('END')
  })
})
