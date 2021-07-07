/**
 * MyUnitCubeQuad
 * @constructor
 */
class MyTrapSolid extends CGFobject
{
	constructor(scene, lAng, rAng)
	{
		super(scene);

		this.lAng = lAng;
		this.rAng = rAng;

		this.quad = new MyQuad(this.scene);
		this.frontTrapeze = new MyTrapeze(this.scene, lAng, rAng);
		this.backTrapeze = new MyTrapeze(this.scene, rAng, lAng);

		this.initMaterials();
	};

	initMaterials(){
		this.material = new CGFappearance(this.scene);
	}

	updateTexture(materialChosen){
		this.material = materialChosen;
	}


	display()
	{
		this.material.apply();

		// front face
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.frontTrapeze.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(180 * degToRad, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.backTrapeze.display();
		this.scene.popMatrix();

		// top face
		this.scene.pushMatrix();
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// down face
		var dR = 1 / Math.tan(this.rAng * degToRad);
		var dL = 1 / Math.tan(this.lAng * degToRad);
		var dLen = 1 + dR + dL;

		this.scene.pushMatrix();
			this.scene.translate((dR - dL) / 2, 0, 0);
			this.scene.scale(dLen, 1, 1);
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.scene.translate(0, 0, 0.5);
			this.quad.display();
		this.scene.popMatrix();

		// left face
		this.scene.pushMatrix();
		this.scene.translate(-.5 - .5*dL, 0, 0);
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
		this.scene.rotate(-(90-this.lAng) * degToRad, 1, 0, 0);
		this.scene.scale(1, 1/Math.sin(this.lAng*degToRad), 1);
		this.quad.display();
		this.scene.popMatrix();

		// right face
		this.scene.pushMatrix();
		this.scene.translate(.5 + .5*dR, 0, 0);
		this.scene.rotate(90 * degToRad, 0, 1, 0);
		this.scene.rotate(-(90-this.rAng) * degToRad, 1, 0, 0);
		this.scene.scale(1, 1/Math.sin(this.rAng*degToRad), 1);
		this.quad.display();
		this.scene.popMatrix();
	};
};
