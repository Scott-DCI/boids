//store visualisations in a container
let vis = null;
let ctx;

// global params for boids (used by Boids draw and Boid update/constructor)
let boidParams = {
	separationStrength: 0.2,
	alignmentStrength: 1,
	cohesionStrength: 0.8,
	separationDistance: 20,
	alignmentDistance: 50,
	maxBoids: 200,
	bufferZone: 350,
	centerSeekStrength: 0.1,
	resetRequested: false,
};

setup = () => {

	//create a new canvas instance
	ctx = createCanvas(windowWidth, windowHeight);
	
	//general sketch settings
	imageMode(CENTER);
	colorMode(HSB);
	angleMode(RADIANS);
	background(0);

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Boids()); //Boid flock

	//select a random visualisaion on load
	let selected = floor(random(vis.visuals.length));
	vis.selectVisual(vis.visuals[selected].name);

	createControlPanel();
}

function createControlPanel() {
	const panel = createDiv();
	panel.id('boid-controls');
	panel.position(10, 10);
	panel.style('background', 'rgba(0,0,0,0.75)');
	panel.style('padding', '14px 16px');
	panel.style('border-radius', '8px');
	panel.style('color', '#eee');
	panel.style('font-family', 'sans-serif');
	panel.style('font-size', '12px');
	panel.style('display', 'flex');
	panel.style('flex-direction', 'column');
	panel.style('gap', '12px');
	panel.style('min-width', '280px');

	const heading = createElement('h3', 'Boids');
	heading.style('margin', '0');
	heading.style('font-size', '14px');
	heading.style('padding-bottom', '4px');
	heading.parent(panel);

	const slidersWrap = createDiv();
	slidersWrap.parent(panel);
	slidersWrap.style('display', 'grid');
	slidersWrap.style('grid-template-columns', 'minmax(0, max-content) 40px 140px');
	slidersWrap.style('gap', '10px 14px');
	slidersWrap.style('align-items', 'center');

	function addSlider(label, key, min, max, step) {
		const stepVal = step != null ? step : (max - min) / 100;
		const lab = createSpan(label);
		lab.parent(slidersWrap);
		lab.style('white-space', 'nowrap');
		const valSpan = createSpan('');
		valSpan.parent(slidersWrap);
		valSpan.style('text-align', 'right');
		valSpan.style('min-width', '36px');
		const sl = createSlider(min, max, boidParams[key], stepVal);
		sl.parent(slidersWrap);
		sl.style('width', '100%');
		sl.style('min-width', '0');
		function updateVal() {
			boidParams[key] = stepVal >= 1 ? parseFloat(sl.value()) : parseFloat(sl.value());
			valSpan.html(stepVal >= 1 ? String(round(boidParams[key])) : String(round(boidParams[key] * 100) / 100));
		}
		sl.input(updateVal);
		updateVal();
	}

	addSlider('Separation strength', 'separationStrength', 0, 3, 0.05);
	addSlider('Alignment strength', 'alignmentStrength', 0, 3, 0.05);
	addSlider('Cohesion strength', 'cohesionStrength', 0, 3, 0.05);
	addSlider('Separation distance', 'separationDistance', 5, 80, 1);
	addSlider('Alignment radius', 'alignmentDistance', 20, 150, 1);
	addSlider('Max boids', 'maxBoids', 10, 500, 10);
	addSlider('Boundary buffer', 'bufferZone', 50, 500, 10);
	addSlider('Center seek', 'centerSeekStrength', 0, 0.5, 0.01);

	const resetBtn = createButton('Reset flock');
	resetBtn.parent(panel);
	resetBtn.style('margin-top', '4px');
	resetBtn.mousePressed(() => { boidParams.resetRequested = true; });
}

draw = () => {
	//create output object to pass to visualisations

	//draw the selected visualisation 
	vis.selectedVisual.draw(0);
}