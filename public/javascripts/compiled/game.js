(function() {
  var World;
  World = (function() {
    function World(options) {
      var cell, i, j, row, _len, _len2, _ref, _ref2;
      this.width = options.width;
      this.height = options.height;
      this.grid = new Array(options.height);
      _ref = this.grid;
      for (j = 0, _len = _ref.length; j < _len; j++) {
        row = _ref[j];
        this.grid[j] = new Array(options.width);
        _ref2 = this.grid[j];
        for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
          cell = _ref2[i];
          this.grid[j][i] = false;
        }
      }
    }
    World.prototype.randomize = function() {
      var cell, i, j, row, _len, _ref, _results;
      _ref = this.grid;
      _results = [];
      for (j = 0, _len = _ref.length; j < _len; j++) {
        row = _ref[j];
        _results.push((function() {
          var _len2, _ref2, _results2;
          _ref2 = this.grid[j];
          _results2 = [];
          for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
            cell = _ref2[i];
            _results2.push(this.grid[j][i] = Math.random() > 0.5);
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    World.prototype.spawn = function(x, y) {
      return this.grid[y][x] = true;
    };
    World.prototype.kill = function(x, y) {
      return this.grid[y][x] = false;
    };
    World.prototype.alive = function(x, y) {
      return this.grid[y][x];
    };
    World.prototype.dead = function(x, y) {
      return !this.grid[y][x];
    };
    World.prototype.to_html = function() {
      var cell, html, i, j, row, _len, _len2, _ref, _ref2;
      html = "<table id='world'>";
      _ref = this.grid;
      for (j = 0, _len = _ref.length; j < _len; j++) {
        row = _ref[j];
        html += "<tr>";
        _ref2 = this.grid[j];
        for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
          cell = _ref2[i];
          html += "<td class='" + (this.alive(i, j) ? 'on' : 'off') + "'></td>";
        }
        html += "</tr>";
      }
      html += "</table>";
      $('#world').html(html);
      return html;
    };
    World.prototype.neighbours = function(x, y) {
      var count, currentCell, i, j, nx, ny, _ref, _ref2;
      count = 0;
      for (j = _ref = -1; _ref <= 1 ? j <= 1 : j >= 1; _ref <= 1 ? j++ : j--) {
        for (i = _ref2 = -1; _ref2 <= 1 ? i <= 1 : i >= 1; _ref2 <= 1 ? i++ : i--) {
          nx = x + i;
          ny = y + j;
          if (nx >= 0 && ny >= 0 && nx < this.width && ny < this.height) {
            currentCell = j === 0 && i === 0;
            if (this.alive(nx, ny) && !currentCell) {
              count += 1;
            }
          }
        }
      }
      return count;
    };
    World.prototype.tick = function() {
      var col, i, j, newGrid, newWorld, row, _len, _len2, _ref;
      newWorld = new World({
        width: this.width,
        height: this.height
      });
      newGrid = newWorld.grid;
      for (j = 0, _len = newGrid.length; j < _len; j++) {
        row = newGrid[j];
        newGrid[j] = new Array(this.width);
        _ref = newGrid[j];
        for (i = 0, _len2 = _ref.length; i < _len2; i++) {
          col = _ref[i];
          newGrid[j][i] = this.alive(i, j) && this.neighbours(i, j) < 2 ? false : this.alive(i, j) && this.neighbours(i, j) > 3 ? false : this.alive(i, j) ? true : this.dead(i, j) && this.neighbours(i, j) === 3 ? true : false;
        }
      }
      return this.grid = newGrid;
    };
    return World;
  })();
  window.World = World;
}).call(this);
