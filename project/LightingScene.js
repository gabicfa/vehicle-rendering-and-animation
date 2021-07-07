var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 300;
var BOARD_B_DIVISIONS = 4;

var axisControl = true;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.setUpdatePeriod(1/60);

   		this.enableTextures(true);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(179/255,236/255,255/255,1); 
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.altimetry =[[6.0, 0.0, 0.0, 4.4, 4.4, 4.4, 4.4, 4.4, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 4.4, 4.4, 4.4, 4.4, 4.4, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 4.2, 4.2, 4.2, 4.2, 4.2, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 3.5, 0.0, 0.0, 0.0, 3.5, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 2.4, 0.0, 0.0, 0.0, 2.4, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 1.3, 2.3, 2.4, 2.3, 1.3, 0.0, 0.0, 4.7],
						 [6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.7],
						 [6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.7],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 5.6, 4.7, 3.4, 4.7, 6.5],
						];

		this.cylinder = new MyCylinder(this,10,10);
		this.sphere = new MySphere(this, 10,10);
		this.trapeze = new MyTrapSolid(this, 72, 85);
		this.cube = new MyUnitCubeQuad(this, 10, 10);

		this.materialTeste = new CGFappearance(this);
		this.materialTeste.setAmbient(0.8, 0.8, 0.8, 1);
		this.materialTeste.setSpecular(1, 1, 1, 1);
		this.materialTeste.setDiffuse(.5, .5, .5, 1);
		this.materialTeste.loadTexture("../resources/images/orange.png");

    	this.light1=true;
		this.light2=true;

		this.bodyAppearance = "none";
		this.wheelAppearance= "default";
		this.glassAppearance= "default";
		this.lightAppearance= "default";
		this.terrainAppearance="rocky";

		this.vehicleAppearances =["none",	"pineapple", "apple", "orange", "strawberry"];
		this.wheelAppearances =["default", "lolipop", "clock", "cookie"];
		this.glassAppearances =["default", "glass", "takumi", "vitral"];
		this.lightAppearances=["default", "lanterna1", "lanterna2", "lanterna3"];
		this.terrainAppearances=["rocky", "grass", "sand"];

		this.vehicleAppearanceList = {};
		this.wheelAppearanceList = {};
		this.glassAppearanceList = {};
		this.lightAppearanceList = {};
		this.terrainAppearanceList = {};

		for (var i = 0; i < this.vehicleAppearances.length; i++) {
			this.vehicleAppearanceList[this.vehicleAppearances[i]] = i;
		}
		for (var i = 0; i < this.wheelAppearances.length; i++) {
			this.wheelAppearanceList[this.wheelAppearances[i]] = i;
		}
		for (var i = 0; i < this.glassAppearances.length; i++) {
			this.glassAppearanceList[this.glassAppearances[i]] = i;
		}
		for (var i = 0; i < this.lightAppearances.length; i++) {
			this.lightAppearanceList[this.lightAppearances[i]] = i;
		}
		for (var i = 0; i < this.terrainAppearances.length; i++) {
			this.terrainAppearanceList[this.terrainAppearances[i]] = i;
		}

		this.currVehicleAppearance = 0;
		this.currWheelAppearance = 0;
		this.currGlassAppearance = 0;
		this.currLightAppearance = 0;
		this.currTerrainAppearance = 0;

		this.vehicle = new MyVehicle(this, 0, -5);
		this.crane 	 = new MyCrane(this, 0, 3, this.vehicle);
		this.craneHasVehicle = false;
		
		this.terrain = new MyTerrain(this, this.altimetry);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

		this.lights[0].setPosition(0, 10, 0, 1);
		this.lights[0].enable();

		this.lights[1].setPosition(30, 0, 0, 1);
		this.lights[1].enable();

		this.lights[2].setPosition(0, 0, 10, 1);
		this.lights[2].enable();

	};

	update(currTime){
		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		this.checkKeys();

		// Update Vehicle and Crane
		this.vehicle.update(this.deltaTime);
		this.craneHasVehicle = this.crane.update(this.deltaTime);
		
		// Update textures
		this.terrain.updateTexture(this.currTerrainAppearance);
		this.vehicle.updateTexture(this.currVehicleAppearance, this.currWheelAppearance, this.currGlassAppearance, this.currLightAppearance);
	}

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	lightsControl()
	{
		if (this.light1) {
			this.lights[1].enable();
		}
		else{
			this.lights[1].disable();
		}

		if (this.light2) {
			this.lights[2].enable();
		}
		else{
			this.lights[2].disable();
		}
	}

	eixos()
	{
		if(axisControl){
			axisControl = false
		}
		else{
			axisControl = true;
		}
	}

	updateTexture(){
		this.currVehicleAppearance = this.vehicleAppearanceList[this.bodyAppearance]
		this.currWheelAppearance = this.wheelAppearanceList[this.wheelAppearance]
		this.currGlassAppearance = this.glassAppearanceList[this.glassAppearance]
		this.currLightAppearance = this.lightAppearanceList[this.lightAppearance]
		this.currTerrainAppearance = this.terrainAppearanceList[this.terrainAppearance]
	}

	checkKeys()
	{
		var text="Keys pressed: ";
		var keysPressed=false;
		if (this.gui.isKeyPressed("KeyW"))
		{
			text+=" W ";
			keysPressed=true;

			this.vehicle.throttle();
		}
		if (this.gui.isKeyPressed("KeyS"))
		{
			text+=" S ";
			keysPressed=true;

			this.vehicle.brake();
		}
		if (this.gui.isKeyPressed("KeyA"))
		{
			text+=" A ";
			keysPressed=true;

			this.vehicle.turnLeft();
		}
		if (this.gui.isKeyPressed("KeyD"))
		{
			text+=" D ";
			keysPressed=true;

			this.vehicle.turnRight();
		}
		if (this.gui.isKeyPressed("KeyL"))
		{
			text+=" L ";
			keysPressed=true;

			this.vehicle.togglePopUpHeadlights();
		}
		if (keysPressed)
			console.log(text);
	}

	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		this.lightsControl();

		this.updateTexture();

		// this.updateTextures();

		if(axisControl) {
			this.axis.display();
		}
		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section
		this.pushMatrix();
    		this.terrain.display();

			if (!this.craneHasVehicle)	this.vehicle.display();
			this.crane.display();
		this.popMatrix();

		this.materialTeste.apply();

		this.pushMatrix();
			this.translate(-5, 0, -30);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.cylinder.display();
			this.pushMatrix();
				this.translate(5, 0, 0);
				this.cube.display();
				this.translate(5, 0, 0);
				this.sphere.display();
				this.translate(5, 0, 0);
				this.rotate(Math.PI/2, 1, 0, 0);
				this.trapeze.updateTexture(this.materialTeste)
				this.trapeze.display();
			this.popMatrix();
		this.popMatrix();
		// ---- END Scene drawing section
	};
};
