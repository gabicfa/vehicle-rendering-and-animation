/**
 * MyVehicle
 * @constructor
 */
 class MyCrane extends CGFobject
 {
	constructor(scene, x, z, vehicle)
	{
		super(scene);

		this.vehicle = vehicle;

		// Dimension Constants
		this.ARMLENGTH 	 = 10;
		this.CABLELENGTH = 3;
		this.MAGNETSIZE  = 2;
		this.BASESIZE 	 = 1.5;

		this.PITCH 		 = 30;		// Fixed Pitch of Lower Arm in Degrees

		// Physics / Animation Constants
		this.STEERING	 = .1; 		// Angular Velocity of joints

		// Pickup and Drop Areas Position Constants
		this.PICKUPX	 = 0;
		this.PICKUPZ	 = 17;

		this.DROPX 		 = -8.5;
		this.DROPY		 = 5;
		this.DROPZ 		 = -8.5;


		// Angles in degrees, starting from the Y axis
		this.PICKUPBASE  = 0;		// Angle of Base Joint in Pickup Position 
		this.PICKUPARM 	 = 108;		// Angle of Arm Joint in Pickup Position 
		this.DROPBASE 	 = 220;		// Angle of Base Joint in Drop Position 
		this.DROPARM 	 = 80;		// Angle of Base Joint in Drop Position


		this.cube 		 = new MyUnitCubeQuad(this.scene);
		this.wheel 		 = new MyWheel(this.scene);

		this.initMaterials();
		this.initMovement(x || 0, z || 0);
	};

	initMaterials()
	{
		this.materialBase = new CGFappearance(this.scene);
		this.materialBase.setAmbient(0.3, 0.3, 0.3, 1);
		this.materialBase.setSpecular(0.1, 0.1, 0.1, 1);
		this.materialBase.setDiffuse(0.1, 0.1, 0.1, 1);

		this.materialArm = new CGFappearance(this.scene);
		this.materialArm.setAmbient(0.8, 0.8, 0.8, 1);
		this.materialArm.setSpecular(0.6, 0.6, 0.6, 1);
		this.materialArm.setDiffuse(0.5, 0.7, 0.4, 1);
	}

	initMovement(x, z)
	{
		// Crane's Position
		this.xPos = x;
		this.zPos = z;

		// Angle of Both Joints (Degrees)
		this.baseAng = this.DROPBASE;
		this.armAng  = this.DROPARM;

		// Booleans representing the crane state
		this.pickingUp = false; // Flag for the crane to go to the pickup area
		this.hasVehicle = false; // Flag for the crane to handle the car being carried

		// Useful Variables for display()
		this.dzLowerArm	 = this.ARMLENGTH * Math.sin(this.PITCH * degToRad);
		this.dyLowerArm	 = this.ARMLENGTH * Math.cos(this.PITCH * degToRad);

		this.dzUpperArm	 = this.ARMLENGTH * Math.sin(this.armAng * degToRad);
		this.dyUpperArm	 = this.ARMLENGTH * Math.cos(this.armAng * degToRad);
	}

	// External Methods (To be accessed by other classes)

	checkPickUp(x, z)
	{
		this.pickingUp = (x <= this.PICKUPX + 3 && x >= this.PICKUPX - 3) &&
						 (z <= this.PICKUPZ + 1.5 && z >= this.PICKUPZ - 1.5);
	}

	update(delta)
	{
		this.checkPickUp(this.vehicle.getXPos(), this.vehicle.getZPos());

		var dAng = this.STEERING * delta;

		if (this.pickingUp) {
			this.baseAng = Math.max(this.baseAng - dAng, this.PICKUPBASE);
			this.armAng = Math.min(this.armAng + dAng, this.PICKUPARM);
			
			// Check if Reached Pickup Area
			if (this.baseAng == this.PICKUPBASE && this.armAng == this.PICKUPARM) {
				this.pickingUp = false;
				
				// Stick car to magnet
				this.hasVehicle = true;
				this.vehicle.freeze();
			}
			else {
				this.dzUpperArm	 = this.ARMLENGTH * Math.sin(this.armAng * degToRad);
				this.dyUpperArm	 = this.ARMLENGTH * Math.cos(this.armAng * degToRad);
			}
		}
		else if (this.baseAng != this.DROPBASE || this.armAng != this.DROPARM) {
			this.baseAng = Math.min(this.baseAng + dAng, this.DROPBASE);
			this.armAng = Math.max(this.armAng - dAng, this.DROPARM);

			this.dzUpperArm	 = this.ARMLENGTH * Math.sin(this.armAng * degToRad);
			this.dyUpperArm	 = this.ARMLENGTH * Math.cos(this.armAng * degToRad);
		}
		else {
			// Drop car if it's attached
			if (this.hasVehicle) {

				this.vehicle.drop(this.DROPX, this.DROPY, this.DROPZ, this.DROPBASE - this.PICKUPBASE);
				this.hasVehicle = false;
			}
		}

		return this.hasVehicle;
	}

  	display()
	{
		this.scene.pushMatrix();
			this.scene.translate(this.xPos, 1, this.zPos);
			this.scene.rotate(this.baseAng * degToRad, 0, 1, 0);

			// BASE HINGE
			this.scene.pushMatrix();
				this.materialBase.apply();
				this.scene.scale(this.BASESIZE, 1, this.BASESIZE);
				this.scene.rotate(Math.PI/2, 1, 0, 0);
				this.wheel.display();
			this.scene.popMatrix();
			
			// LOWER ARM
			this.scene.pushMatrix();
				this.materialArm.apply();
				this.scene.translate(0, this.dyLowerArm / 2 - 1, this.dzLowerArm / 2);
				this.scene.rotate(this.PITCH * degToRad, 1, 0, 0);
				this.scene.scale(.5, this.ARMLENGTH, 1);
				this.cube.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();	 
				this.scene.translate(0, this.dyLowerArm, this.dzLowerArm);

				// UPPER ARM
				this.scene.pushMatrix();
					this.scene.translate(0, this.dyUpperArm / 2 - 1, this.dzUpperArm / 2);
					this.scene.rotate(this.armAng * degToRad, 1, 0, 0);
					this.scene.scale(.5, this.ARMLENGTH, 1);
					this.cube.display();
				this.scene.popMatrix();

				// ARM HINGE
				this.materialBase.apply();
				this.scene.pushMatrix();
					this.scene.translate(-.5, -1, 0);
					this.scene.rotate(Math.PI/2, 0, 1, 0);
					this.wheel.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
					this.scene.translate(0, this.dyUpperArm - 1, this.dzUpperArm -.5);

					// MAGNET CABLE
					this.scene.pushMatrix();
						this.scene.translate(0, -this.CABLELENGTH / 2, 0);
						this.scene.scale(.1, this.CABLELENGTH, .1);
						this.cube.display();
					this.scene.popMatrix();

					// MAGNET
					this.scene.pushMatrix();
						this.scene.translate(0, -this.CABLELENGTH, 0);
						this.scene.scale(this.MAGNETSIZE, 1, this.MAGNETSIZE);
						this.scene.rotate(Math.PI/2, 1, 0, 0);
						this.wheel.display();
					this.scene.popMatrix();

					// VEHICLE
					if (this.hasVehicle) {
						this.scene.pushMatrix();
							this.scene.translate(0, -this.CABLELENGTH - 2.6, 0);
							this.vehicle.display();
						this.scene.popMatrix();
					}
				this.scene.popMatrix();
			this.scene.popMatrix();
		this.scene.popMatrix();

		// Pickup Marker
		this.scene.pushMatrix();
			this.materialArm.apply();
			this.scene.translate(this.PICKUPX, 0, this.PICKUPZ);
			this.scene.scale(6, .1, 3);
			this.cube.display();
		this.scene.popMatrix();
	};
 };
