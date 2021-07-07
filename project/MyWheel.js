/**
 * 8MyWheel
 * @constructor
 */
 class MyWheel extends CGFobject
 {
	constructor(scene)
	{
		super(scene);

		this.tire = new MyCylinder(this.scene, 20, 3);
		this.rim  = new MyCircle(this.scene, 20);
	};

  	display()
	{
		this.scene.pushMatrix();
			this.tire.display();
			this.scene.pushMatrix();
				this.scene.rotate(Math.PI, 1, 0, 0);
				this.rim.display();
			this.scene.popMatrix();		

			this.scene.translate(0, 0, 1); 
			this.rim.display();
		this.scene.popMatrix();
	};
 };
