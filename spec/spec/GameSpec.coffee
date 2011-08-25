describe "World", ->

  it "has an initial height", ->
    world = new World height: 3, width: 3
    expect(world.height).toEqual 3

  it "has an initial width", ->
    world = new World height: 3, width: 3
    expect(world.width).toEqual 3

  it "has all cells dead on creation", ->
    world = new World height: 1, width: 1
    expect(world.alive(0,0)).toEqual false

  it "can spawn and kill life in a cell", ->
    world = new World height: 3, width: 3
    world.spawn(0,0)
    expect(world.alive(0,0)).toEqual true
    world.kill(0,0)
    expect(world.alive(0,0)).toEqual false

describe "Howdy neighbour", ->
  it "should have no neighbours initially", ->
    world = new World height: 3, width: 3
    expect(world.neighbours(0,0)).toEqual 0

  it "should have 1 neighbour", ->
    world = new World height: 3, width: 3
    world.spawn(1,1)
    expect(world.neighbours(1,1)).toEqual 0
    expect(world.neighbours(0,0)).toEqual 1
    expect(world.neighbours(1,0)).toEqual 1
    expect(world.neighbours(2,0)).toEqual 1
    expect(world.neighbours(0,1)).toEqual 1
    expect(world.neighbours(2,1)).toEqual 1
    expect(world.neighbours(0,2)).toEqual 1
    expect(world.neighbours(1,2)).toEqual 1
    expect(world.neighbours(2,2)).toEqual 1

  it "should have correct neighbours", ->
    world = new World height: 1, width: 3
    world.spawn(0,0)
    world.spawn(1,0)
    world.spawn(2,0)
    expect(world.neighbours(0,0)).toEqual 1
    expect(world.neighbours(1,0)).toEqual 2
    expect(world.neighbours(2,0)).toEqual 1


describe "The rules", ->
  it "living cell with fewer than 2 live neighbours should die from loneliness", ->
    world = new World height: 2, width: 2
    world.spawn(0,0)
    expect(world.alive(0,0)).toEqual true
    world.tick()
    expect(world.alive(0,0)).toEqual false

  it "living cell with 2 or 3 live neighbours should live a long and happy life", ->
    world = new World height: 1, width: 3
    world.spawn(0,0)
    world.spawn(1,0)
    world.spawn(2,0)
    world.tick()
    expect(world.alive(0,0)).toEqual false
    expect(world.alive(1,0)).toEqual true
    expect(world.alive(2,0)).toEqual false

  it "living cell with more than 3 live neighbours should die from trampling or disease", ->
    world = new World height: 3, width: 3
    world.spawn(1,1)

    world.spawn(0,0)
    world.spawn(0,1)
    world.spawn(0,2)
    world.spawn(1,0)

    world.tick()
    expect(world.alive(1,1)).toEqual false


  # it "dead cell with exactly 3 live neighbours should be born by strange parenting", ->

  # it "can create next generation", ->
  #

#   it "could wrap in any dimension"
#   it "can create next generation"
#
#
# describe "Creature"
#
