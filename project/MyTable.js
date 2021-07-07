/**
 * MyTable
 * @constructor
 */
 class MyTable extends CGFobject
 {
	constructor(scene)
	{
		super(scene);

		this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);

		this.materialTop = new CGFappearance(this.scene);
		this.materialLeg = new CGFappearance(this.scene);

    this.materialTop.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialTop.setSpecular(0.3, 0.3, 0.3, 1);
    this.materialTop.setDiffuse(0.8, 0.8, 0.8, 1);
    this.materialTop.setShininess(20);
    this.materialTop.loadTexture("../resources/images/table.png");

		this.materialLeg.setEmission(160.0/255, 160.0/255, 160.0/255, 1);
		this.materialLeg.setSpecular(0.9, 0.9, 0.9, 1);
		this.materialLeg.setShininess(20);
	};

	display()
	{
		this.materialLeg.apply();

		// legs
		this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.materialTop.apply();

		// table top
		this.scene.pushMatrix();
		this.scene.translate(0, 3.5, 0);
		this.scene.scale(5, 0.3, 3);

		this.myUnitCubeQuad.display();
		this.scene.popMatrix();
	};
 };
