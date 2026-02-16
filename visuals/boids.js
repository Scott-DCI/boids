let boids = [];
let maxBoids;

function Boids() {
  this.name = "Boids";

  this.setup = () => {
    boids = [];
    maxBoids = (typeof boidParams !== 'undefined' && boidParams) ? boidParams.maxBoids : 200;
    addBoids(70, Boid);
    angleMode(RADIANS);
  };

  this.draw = (output) => {
    const params = (typeof boidParams !== 'undefined' && boidParams) ? boidParams : null;
    if (params) maxBoids = params.maxBoids;

    if (params && params.resetRequested) {
      params.resetRequested = false;
      boids = [];
      addBoids(70, Boid);
    }

    push();
    translate(width / 2, height / 2);
    background(0);

    let behaviour = {
      separationStrength: params ? params.separationStrength : 0.2,
      alignmentStrength: params ? params.alignmentStrength : 1,
      cohesionStrength: params ? params.cohesionStrength : 0.8,
    };

    const passParams = params ? {
      separationDistance: params.separationDistance,
      alignmentDistance: params.alignmentDistance,
      bufferZone: params.bufferZone,
      centerSeekStrength: params.centerSeekStrength,
    } : null;

    for (let i = 0; i < boids.length; i++) {
      boids[i].update(behaviour, output, passParams);
      boids[i].draw();

      if (boids[i].killBoid) {
        killBoid(i);
      }
    }

    if (boids.length < maxBoids - 1) addBoids(floor(random(10)), Boid);

    pop();
  };

  this.setup();
}

function addBoids(n) {
  for (let i = 0; i < n; i++) {
    boids.push(new Boid(0, 0));
  }
}

//destroys boid with index i
function killBoid(i) {
  boids.splice(i, 1);
}
