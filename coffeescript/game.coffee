class World

  constructor: (options) ->
    @width = options.width
    @height = options.height
    @grid = new Array(options.height)

    for row, j in @grid
      @grid[j] = new Array(options.width)
      for cell, i in @grid[j]
        @grid[j][i] = false

  randomize: ->
    for row, j in @grid
      for cell, i in @grid[j]
        @grid[j][i] = (Math.random() > 0.5)

  spawn: (x, y) ->
    @grid[y][x] = true

  kill: (x, y) ->
    @grid[y][x] = false

  alive: (x, y) ->
    @grid[y][x]

  dead: (x, y) ->
    !@grid[y][x]

  to_html: ->
    html = "<table id='world'>"
    for row, j in @grid
      html += "<tr>"
      for cell, i in @grid[j]
        html += "<td class='#{if @alive(i,j) then 'on' else 'off'}'></td>"
      html += "</tr>"
    html += "</table>"
    $('#world').html html
    html

  neighbours: (x, y) ->
    count = 0
    for j in [-1..1]
      for i in [-1..1]
        nx = x + i
        ny = y + j
        if nx >= 0 and ny >= 0 and nx < @width and ny < @height
          currentCell = (j == 0 and i == 0)
          if @alive(nx,ny) and !currentCell
            count += 1
    count

  tick: ->
    newWorld = new World width: @width, height: @height
    newGrid = newWorld.grid
    for row, j in newGrid
      newGrid[j] = new Array(@width)
      for col, i in newGrid[j]
        newGrid[j][i] = if @alive(i,j) and @neighbours(i, j) < 2
          false
        else if @alive(i,j) and @neighbours(i, j) > 3
          false
        else if @alive(i,j)
          true
        else if @dead(i,j) and @neighbours(i, j) == 3
          true
        else
          false
    @grid = newGrid


window.World = World