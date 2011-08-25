(function() {
  describe("World", function() {
    it("has an initial height", function() {
      var world;
      world = new World({
        height: 3,
        width: 3
      });
      return expect(world.height).toEqual(3);
    });
    it("has an initial width", function() {
      var world;
      world = new World({
        height: 3,
        width: 3
      });
      return expect(world.width).toEqual(3);
    });
    it("has all cells dead on creation", function() {
      var world;
      world = new World({
        height: 1,
        width: 1
      });
      return expect(world.alive(0, 0)).toEqual(false);
    });
    return it("can spawn and kill life in a cell", function() {
      var world;
      world = new World({
        height: 3,
        width: 3
      });
      world.spawn(0, 0);
      expect(world.alive(0, 0)).toEqual(true);
      world.kill(0, 0);
      return expect(world.alive(0, 0)).toEqual(false);
    });
  });
  describe("Howdy neighbour", function() {
    it("should have no neighbours initially", function() {
      var world;
      world = new World({
        height: 3,
        width: 3
      });
      return expect(world.neighbours(0, 0)).toEqual(0);
    });
    it("should have 1 neighbour", function() {
      var world;
      world = new World({
        height: 3,
        width: 3
      });
      world.spawn(1, 1);
      expect(world.neighbours(1, 1)).toEqual(0);
      expect(world.neighbours(0, 0)).toEqual(1);
      expect(world.neighbours(1, 0)).toEqual(1);
      expect(world.neighbours(2, 0)).toEqual(1);
      expect(world.neighbours(0, 1)).toEqual(1);
      expect(world.neighbours(2, 1)).toEqual(1);
      expect(world.neighbours(0, 2)).toEqual(1);
      expect(world.neighbours(1, 2)).toEqual(1);
      return expect(world.neighbours(2, 2)).toEqual(1);
    });
    return it("should have correct neighbours", function() {
      var world;
      world = new World({
        height: 1,
        width: 3
      });
      world.spawn(0, 0);
      world.spawn(1, 0);
      world.spawn(2, 0);
      expect(world.neighbours(0, 0)).toEqual(1);
      expect(world.neighbours(1, 0)).toEqual(2);
      return expect(world.neighbours(2, 0)).toEqual(1);
    });
  });
  describe("The rules", function() {
    it("living cell with fewer than 2 live neighbours should die from loneliness", function() {
      var world;
      world = new World({
        height: 2,
        width: 2
      });
      world.spawn(0, 0);
      expect(world.alive(0, 0)).toEqual(true);
      world.tick();
      return expect(world.alive(0, 0)).toEqual(false);
    });
    it("living cell with 2 or 3 live neighbours should live a long and happy life", function() {
      var world;
      world = new World({
        height: 1,
        width: 3
      });
      world.spawn(0, 0);
      world.spawn(1, 0);
      world.spawn(2, 0);
      world.tick();
      expect(world.alive(0, 0)).toEqual(false);
      expect(world.alive(1, 0)).toEqual(true);
      return expect(world.alive(2, 0)).toEqual(false);
    });
    return it("living cell with more than 3 live neighbours should die from trampling or disease", function() {
      var world;
      world = new World({
        height: 3,
        width: 3
      });
      world.spawn(1, 1);
      world.spawn(0, 0);
      world.spawn(0, 1);
      world.spawn(0, 2);
      world.spawn(1, 0);
      world.tick();
      return expect(world.alive(1, 1)).toEqual(false);
    });
  });
}).call(this);
