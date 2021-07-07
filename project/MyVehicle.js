/**
 * MyVehicle
 * @constructor
 */
 class MyVehicle extends CGFobject
 {
	constructor(scene, x, z)
	{
		/* CAR CHASSIS (Toyota Sprinter Trueno AE86)
			Real Car Specs:
				Length: 4200mm
				WheelBase: 2400mm
				Width: 1630mm
				Height: 1340mm

			Ratio: 1.15 units per meter

			Model Size:
				Length: 4.830 units
				WheelBase: 2.760 units
				Width: 1.8745 units
				Height: 1.541 units

			Wheel diameter: around 0.7 units
		*/
		super(scene);

		// Dimension Constants
		this.LENGTH 	= 4.830;
		this.WHEELBASE 	= 2.760;
		this.WIDTH 		= 1.8745;

		// Physics / Animation Constants
		this.THROTTLE	= .001; 	// Positive acceleration of vehicle
		this.BRAKES		= .001; 	// Negative acceleration of vehicle
		this.MAXVEL		= .05;		// Maximum Velocity allowed for car

		this.STEERING	= 2; 		// Angular Velocity of steering (independent of delta)
		this.TURNANGLE  = 35;		// Max steering angle for car
		this.TURNBACK	= 3;		// Angular Velocity of turn stabalization (independent of delta)

		this.POPUP		= .05;		// Angular Velocity of pop up headlights
		this.MAXPOPUP 	= 70;		// Maximum Angle the headlights pop up

		this.FALLVEL 	= .02;		// Fall Velocity (When dropped by crane)

		this.cube 		= new MyUnitCubeQuad(this.scene);
		this.prism 		= new MyPrism(this.scene, 4, 10);
		this.square 	= new MyQuad(this.scene);
		this.semiSphere = new MySphere(this.scene, 10, 4);

		this.LRWheel = new MyWheel(this.scene);
		this.LLWheel = new MyWheel(this.scene);
		this.URWheel = new MyWheel(this.scene);
		this.ULWheel = new MyWheel(this.scene);

		this.initSpecialSolids();

		this.initMaterials();

		this.initMovement(x || 0, z || 0);

		// Pop Up Headlights
		this.popUpAngle = 0;

		this.isPopped = false;
		this.isPopping = false;

	};

	initSpecialSolids()
	{
		this.bBumper = new MyTrapSolid(this.scene, 72, 85);

		this.carTop = new MyTrapSolid(this.scene, 40, 60);
		this.carBot = new MyTrapSolid(this.scene, 87, 87);

		this.fdBumper = new MyTrapSolid(this.scene, 80, 85);
		this.fmBumper = new MyTrapSolid(this.scene, 90, 85);
		this.fuBumper = new MyTrapSolid(this.scene, 90, 85);

		this.upperLight = new MyTrapSolid(this.scene, 90, 85);

		this.leftMirror = new MyTrapSolid(this.scene, 90, 45);
		this.rightMirror = new MyTrapSolid(this.scene, 45, 90);

		this.rightGlass = new MyTrapeze(this.scene, 80, 53);
		this.leftGlass = new MyTrapeze(this.scene, 53, 80);
	}

	initMaterials()
	{

    // BODY MATERIALS ---------------------------------

	this.materialBody = new CGFappearance(this.scene);

    this.materialBodyNone = new CGFappearance(this.scene);
    this.materialBodyNone.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialBodyNone.setSpecular(0.7, 0.7, 0.7, 1);
    this.materialBodyNone.setDiffuse(.7, .7, .7, 1);

    this.materialBodyPineapple = new CGFappearance(this.scene);
    this.materialBodyPineapple.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialBodyPineapple.setSpecular(1, 1, 1, 1);
    this.materialBodyPineapple.setDiffuse(.5, .5, .5, 1);
    this.materialBodyPineapple.loadTexture("../resources/images/pineapple.png");

    this.materialBodyApple = new CGFappearance(this.scene);
    this.materialBodyApple.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialBodyApple.setSpecular(0.7, 0.7, 0.7, 1);
    this.materialBodyApple.setDiffuse(.5, .5, .5, 1);
    this.materialBodyApple.loadTexture("../resources/images/apple.png");

    this.materialBodyOrange = new CGFappearance(this.scene);
    this.materialBodyOrange.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialBodyOrange.setSpecular(0.7, 0.7, 0.7, 1);
    this.materialBodyOrange.setDiffuse(.5, .5, .5, 1);
    this.materialBodyOrange.loadTexture("../resources/images/orange.png");

    this.materialBodyStrawberry = new CGFappearance(this.scene);
    this.materialBodyStrawberry.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialBodyStrawberry.setSpecular(0.7, 0.7, 0.7, 1);
    this.materialBodyStrawberry.setDiffuse(.5, .5, .5, 1);
    this.materialBodyStrawberry.loadTexture("../resources/images/strawberry.png");

    this.bodyPossibleAppearances = [this.materialBodyNone, this.materialBodyPineapple, this.materialBodyApple, this.materialBodyOrange, this.materialBodyStrawberry];


    // GLASS MATERIALS ---------------------------------
    this.materialGlass = new CGFappearance(this.scene);

	this.materialGlassDefault = new CGFappearance(this.scene);
    this.materialGlassDefault.setSpecular(.8, .8, .8, 1);
	this.materialGlassDefault.setDiffuse(.4, .4, .4, 1);
	this.materialGlassDefault.loadTexture("../resources/images/windshield.png");
	
    this.materialGlass1 = new CGFappearance(this.scene);
    this.materialGlass1.setSpecular(.8, .8, .8, 1);
	this.materialGlass1.setDiffuse(.4, .4, .4, 1);
	this.materialGlass1.loadTexture("../resources/images/glass1.png");

	this.materialTakumi = new CGFappearance(this.scene);
    this.materialTakumi.setSpecular(.8, .8, .8, 1);
	this.materialTakumi.setDiffuse(.8, .8, .8, 1);
	this.materialTakumi.loadTexture("../resources/images/takumi.jpg");

    this.materialVitral = new CGFappearance(this.scene);
    this.materialVitral.setSpecular(.8, .8, .8, 1);
    this.materialVitral.setDiffuse(.6, .6, .6, 1);
    this.materialVitral.loadTexture("../resources/images/vitral.png");

    this.glassPossibleAppearances = [this.materialGlassDefault, this.materialGlass1, this.materialTakumi, this.materialVitral];


    //WHEEL MATERIAL ---------------------------------
    this.materialWheel = new CGFappearance(this.scene);

    this.materialWheelDefault = new CGFappearance(this.scene);
    this.materialWheelDefault.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialWheelDefault.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialWheelDefault.setDiffuse(0.2, 0.2, 0.2, 1);
    this.materialWheelDefault.loadTexture("../resources/images/wheel.jpg");

    this.materialWheelLolipop = new CGFappearance(this.scene);
    this.materialWheelLolipop.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialWheelLolipop.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialWheelLolipop.setDiffuse(0.2, 0.2, 0.2, 1);
    this.materialWheelLolipop.loadTexture("../resources/images/lolipop.png");

    this.materialWheelClock = new CGFappearance(this.scene);
    this.materialWheelClock.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialWheelClock.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialWheelClock.setDiffuse(0.2, 0.2, 0.2, 1);
    this.materialWheelClock.loadTexture("../resources/images/clock.png");

    this.materialWheelCookie = new CGFappearance(this.scene);
    this.materialWheelCookie.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialWheelCookie.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialWheelCookie.setDiffuse(0.2, 0.2, 0.2, 1);
    this.materialWheelCookie.loadTexture("../resources/images/cookie.png");

    this.wheelPossibleAppearances = [this.materialWheelDefault, this.materialWheelLolipop, this.materialWheelClock, this.materialWheelCookie];


    //HEADLIGHTS MATERIAL ---------------------------------

    this.materialHeadlights = new CGFappearance(this.scene);

    this.materialHeadlightsDefault = new CGFappearance(this.scene);
    this.materialHeadlightsDefault.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialHeadlightsDefault.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialHeadlightsDefault.setDiffuse(0.2, 0.2, 0.2, 1);
    this.materialHeadlightsDefault.loadTexture("../resources/images/headlight.png");

    this.materialHeadlights1 = new CGFappearance(this.scene);
    this.materialHeadlights1.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialHeadlights1.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialHeadlights1.setDiffuse(0.2, 0.2, 0.2, 1);
    this.materialHeadlights1.loadTexture("../resources/images/lanterna1.png");

    this.materialHeadlights2 = new CGFappearance(this.scene);
    this.materialHeadlights2.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialHeadlights2.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialHeadlights2.setDiffuse(0.2, 0.2, 0.2, 1);
    this.materialHeadlights2.loadTexture("../resources/images/lanterna2.png");

    this.materialHeadlights3 = new CGFappearance(this.scene);
    this.materialHeadlights3.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialHeadlights3.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialHeadlights3.setDiffuse(0.2, 0.2, 0.2, 1);
    this.materialHeadlights3.loadTexture("../resources/images/lanterna3.png");

    this.headlightsPossibleAppearances = [this.materialHeadlightsDefault, this.materialHeadlights1, this.materialHeadlights2, this.materialHeadlights3];
  }

	initMovement(x, z)
	{
		// Car Position and Rotation
		this.xCarPos = x;
		this.yCarPos = .35;
		this.zCarPos = z;
		this.carAng = 0;

		// Angle of Wheels (Wheel Spin)
		this.wheelAng = 0;

		// angle of front wheels in respect to the front of the car
		this.turnAng = 0;

		// linear velocity of car. Direction depends on the turn angle
		this.velocity = 0;

		this.turning = false;

		this.isFrozen = false;
		this.dropped = false;
	}

	// External Methods (To be accessed by other classes)
	throttle()
	{
		if (this.isFrozen)	return;
		this.velocity = Math.min(this.velocity + this.THROTTLE, this.MAXVEL);
	}

	brake()
	{
		if (this.isFrozen)	return;
		this.velocity = Math.max(this.velocity - this.BRAKES, -this.MAXVEL);
	}

	turnLeft()
	{
		this.turnAng = Math.min(this.turnAng + this.STEERING, this.TURNANGLE);
		this.turning = true;
	}

	turnRight()
	{
		this.turnAng = Math.max(this.turnAng - this.STEERING, -this.TURNANGLE);
		this.turning = true;
	}

	togglePopUpHeadlights()
	{
		if (!this.isPopping) {
			this.isPopped = !this.isPopped;
			this.isPopping = true;
		}
	}

	getXPos() 
	{
		return this.xCarPos;
	}

	getZPos() 
	{
		return this.zCarPos;
	}

	freeze()
	{
		this.isFrozen = true;

		this.xCarPos = 0;
		this.zCarPos = 0;
		this.velocity = 0;
	}

	drop(x, y, z, dAng)
	{
		this.dropped = true;

		this.xCarPos = x;
		this.yCarPos = y;
		this.zCarPos = z;
		this.carAng += dAng;
	}

	update(delta)
	{
		// stabilize turning angle
		if (this.turning) 	this.turning = false;
		else {
			if (this.turnAng > 0) {
				this.turnAng -= this.TURNBACK;
				if (this.turnAng < 0)	this.turnAng = 0;
			}
			else {
				this.turnAng += this.TURNBACK;
				if (this.turnAng > 0)	this.turnAng = 0;
			}
		}

		// get position delta and steering delta and apply it to car
		var deltaPos = this.velocity * delta;

		var oldTurnAng = oldTurnAng || 0;
		var deltaTurn = this.turnAng - oldTurnAng;
		oldTurnAng = this.turnAng;

		if (deltaPos != 0) {
			this.carAng += deltaTurn * deltaPos;

			this.xCarPos += deltaPos * Math.sin(this.carAng * degToRad);
			this.zCarPos += deltaPos * Math.cos(this.carAng * degToRad);
		}

		// Update wheel spin based on velocity
		this.wheelAng += deltaPos;

		// update pop up headlights angle
		if (this.isPopping) {
			var deltaPopUp = this.POPUP * delta;

			if (this.isPopped)
				this.popUpAngle = Math.min(this.popUpAngle + deltaPopUp, this.MAXPOPUP);
			else
				this.popUpAngle = Math.max(this.popUpAngle - deltaPopUp, 0);

			if (this.popUpAngle == 0 || this.popUpAngle == this.MAXPOPUP)
				this.isPopping = false;
		}

		// update height (dropped from crane)
		if (this.dropped) {
			this.yCarPos = Math.max(.35, this.yCarPos - this.FALLVEL * delta);
			if (this.yCarPos == .35)	{
				this.isFrozen = false;
				this.dropped = false;	
			}
		}
	}

	  updateTexture(currVehicleAppearance, currWheelAppearance, currGlassAppearance,currLightAppearance)
	  {
		this.materialBody = this.bodyPossibleAppearances[currVehicleAppearance];
		this.bBumper.updateTexture(this.bodyPossibleAppearances[currVehicleAppearance]);
		this.carTop.updateTexture(this.bodyPossibleAppearances[currVehicleAppearance]);
		this.carBot.updateTexture(this.bodyPossibleAppearances[currVehicleAppearance]);
		this.fdBumper.updateTexture(this.bodyPossibleAppearances[currVehicleAppearance]);
		this.fmBumper.updateTexture(this.bodyPossibleAppearances[currVehicleAppearance]);
		this.fuBumper.updateTexture(this.bodyPossibleAppearances[currVehicleAppearance]);
		this.leftMirror.updateTexture(this.bodyPossibleAppearances[currVehicleAppearance]);
		this.rightMirror.updateTexture(this.bodyPossibleAppearances[currVehicleAppearance]);
		this.upperLight.updateTexture(this.bodyPossibleAppearances[currVehicleAppearance]);

		this.materialGlass = this.glassPossibleAppearances[currGlassAppearance];
		this.materialWheel = this.wheelPossibleAppearances[currWheelAppearance];
		this.materialHeadlights = this.headlightsPossibleAppearances[currLightAppearance];
	  }

  	display()
	{
		this.scene.pushMatrix();
			this.scene.translate(this.xCarPos, this.yCarPos, this.zCarPos);
			this.scene.rotate(this.carAng * degToRad, 0, 1, 0);

			// CAR WHEELS ---------------------------------
			this.materialWheel.apply();

			this.scene.pushMatrix();
				this.scene.pushMatrix();
					this.scene.translate(this.WIDTH/2-.35, 0, -this.LENGTH*2/7)
					this.scene.scale(0.35, 0.35, 0.35);
					this.scene.rotate(this.wheelAng, 1, 0, 0);
					this.scene.rotate(Math.PI/2, 0, 1, 0);
					this.LLWheel.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
					this.scene.translate(this.WIDTH/2-.35, 0, -this.LENGTH*2/7+this.WHEELBASE);
					this.scene.scale(0.35, 0.35, 0.35);
					this.scene.rotate(Math.PI/2 + this.turnAng * degToRad, 0, 1, 0);
					this.scene.rotate(this.wheelAng, 0, 0, 1);
					this.ULWheel.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
					this.scene.translate(-this.WIDTH/2+.35, 0, -this.LENGTH*2/7);
					this.scene.scale(0.35, 0.35, 0.35);
					this.scene.rotate(this.wheelAng, 1, 0, 0);
					this.scene.rotate(-Math.PI/2, 0, 1, 0);
					this.LRWheel.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
					this.scene.translate(-this.WIDTH/2+.35, 0, -this.LENGTH*2/7+this.WHEELBASE);
					this.scene.scale(0.35, 0.35, 0.35);
					this.scene.rotate(-Math.PI/2 + this.turnAng * degToRad, 0, 1, 0);
					this.scene.rotate(-this.wheelAng, 0, 0, 1);
					this.URWheel.display();
				this.scene.popMatrix();
			this.scene.popMatrix();

			// BACK OF CAR -----------------------------
			this.materialBody.apply();

			this.scene.pushMatrix();
				this.scene.translate(0, 0, -this.LENGTH/2 +.35);
				this.scene.scale(this.WIDTH, .2, .60);
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.bBumper.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, .2, -this.LENGTH/2 + .25);
				this.scene.scale(this.WIDTH, .2, .9);
				this.cube.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, .5, -this.LENGTH/2 +.3);
				this.scene.scale(this.WIDTH, .5, .8);
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.cube.display();
			this.scene.popMatrix();

			// MIDDLE OF CAR -----------------------------
			this.scene.pushMatrix();
				this.scene.translate(0, .9, -.5);
				this.scene.scale(this.WIDTH, .45, 1.2);
				this.scene.rotate(-Math.PI/2, 0, 1, 0);
				this.carTop.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, .515, -.55);
				this.scene.scale(this.WIDTH, .32, 3);
				this.cube.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, .11, 0);
				this.scene.scale(this.WIDTH, .5, 1.96);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.scene.rotate(-Math.PI/2, 0, 1, 0);
				this.carBot.display();
			this.scene.popMatrix();

			// FRONT OF CAR -----------------------------
			this.scene.pushMatrix();
				this.scene.translate(0, 0.025, this.LENGTH/2 -.38);
				this.scene.scale(this.WIDTH, .15, .55);
				this.scene.rotate(-90 * degToRad, 0, 1, 0);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.fdBumper.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, 0.2, this.LENGTH/2 -.35);
				this.scene.scale(this.WIDTH, .2, .7);
				this.scene.rotate(-90 * degToRad, 0, 1, 0);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.fmBumper.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, 0.375, this.LENGTH/2 -.4);
				this.scene.scale(this.WIDTH *.6, .15, .60);
				this.scene.rotate(-90 * degToRad, 0, 1, 0);
				this.fuBumper.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, 0.464, this.LENGTH/3);
				this.scene.rotate(9.3 * degToRad, 1, 0, 0);
				this.scene.scale(this.WIDTH, .2, 1.4);
				this.cube.display();
			this.scene.popMatrix();

			// POP UP HEADLIGHTS -----------------------------
			this.scene.pushMatrix();
				this.scene.translate(-this.WIDTH/2 + .19, 0.375, this.LENGTH/2 -.27 + .001 * this.popUpAngle);
				this.scene.rotate(-this.popUpAngle * degToRad, 1, 0, 0);
				this.scene.pushMatrix();
					this.scene.scale(this.WIDTH *.2, .15, this.WIDTH *.2);
					this.scene.rotate(-90 * degToRad, 0, 1, 0);
					this.upperLight.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
					this.scene.translate(0, -.07, 0.01);
					this.scene.rotate(-20 * degToRad, 1, 0, 0);
					this.scene.scale(this.WIDTH *.2, .15, this.WIDTH *.2);
					this.cube.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
					this.materialHeadlights.apply();
					this.scene.translate(0, -.07, 0.05);
					this.scene.rotate(-20 * degToRad, 1, 0, 0);
					this.scene.scale(this.WIDTH *.19, .15, this.WIDTH *.17);
					this.cube.display();
				this.scene.popMatrix();
			this.scene.popMatrix();
			this.materialBody.apply();
			this.scene.pushMatrix();
				this.scene.translate(+this.WIDTH/2 - .19, 0.375, this.LENGTH/2 -.27 + .001 * this.popUpAngle);
				this.scene.rotate(-this.popUpAngle * degToRad, 1, 0, 0);
				this.scene.pushMatrix();
					this.scene.scale(this.WIDTH *.2, .15, this.WIDTH *.2);
					this.scene.rotate(-90 * degToRad, 0, 1, 0);
					this.upperLight.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
					this.scene.translate(0, -.07, 0.01);
					this.scene.rotate(-20 * degToRad, 1, 0, 0);
					this.scene.scale(this.WIDTH *.2, .15, this.WIDTH *.2);
					this.cube.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
					this.materialHeadlights.apply();
					this.scene.translate(0, -.07, 0.05);
					this.scene.rotate(-20 * degToRad, 1, 0, 0);
					this.scene.scale(this.WIDTH *.19, .15, this.WIDTH *.17);
					this.cube.display();
				this.scene.popMatrix();
			this.scene.popMatrix();

			// SIDE MIRRORS -----------------------------
			this.scene.pushMatrix();
				this.scene.translate(this.WIDTH/2 -.02, .75, .5);
				this.scene.scale(.1, .1, .1);
				this.scene.rotate(Math.PI / 2, 1, 0, 0);
				this.leftMirror.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(-this.WIDTH/2 +.02, .75, .5);
				this.scene.scale(.1, .1, .1);
				this.scene.rotate(Math.PI / 2, 1, 0, 0);
				this.rightMirror.display();
			this.scene.popMatrix();

			// WINDOWS -----------------------------
      		this.materialGlass.apply();
			// Windshield (Front)
			this.scene.pushMatrix();
				this.scene.translate(0, .9, .45);
				this.scene.rotate(-57 * degToRad, 1, 0, 0);
				this.scene.scale(this.WIDTH - .1, .7, 1.2);
				this.square.display();
			this.scene.popMatrix();
			// Rear Window
			this.scene.pushMatrix();
				this.scene.translate(0, .98, -1.6);
				this.scene.rotate(253 * degToRad, 1, 0, 0);
				this.scene.scale(this.WIDTH - .1, 1, 1.2);
				this.square.display();
			this.scene.popMatrix();
			// Side Windows
			this.scene.pushMatrix();
				this.scene.translate(-this.WIDTH/2 -.01, .9, -.3);
				this.scene.scale(1, .4, .8)
				this.scene.rotate(-Math.PI / 2, 0, 1, 0);
				this.rightGlass.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(this.WIDTH/2 +.01, .9, -.3);
				this.scene.scale(1, .4, .8);
				this.scene.rotate(Math.PI, 0, 1, 0);
				this.scene.rotate(-Math.PI / 2, 0, 1, 0);
				this.leftGlass.display();
			this.scene.popMatrix();

		this.scene.popMatrix();
	};
 };
 