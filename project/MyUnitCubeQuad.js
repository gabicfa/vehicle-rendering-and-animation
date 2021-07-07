/**
 * MyUnitCubeQuad
 * @constructor
 */
class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.quad = new MyQuad(this.scene);
	};

	display() 
	{
		// front face
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(180 * degToRad, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// top face
		this.scene.pushMatrix();
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(90 * degToRad, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// right face
		this.scene.pushMatrix();
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// left face
		this.scene.pushMatrix();
		this.scene.rotate(90 * degToRad, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	};
};
