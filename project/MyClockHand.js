
class MyClockHand extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.myCylinder = new MyCylinder(this.scene, 12, 1);
		this.angle = 0;
	};

	display()
	{
		this.scene.rotate(-this.angle, 0, 0, 1);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(.02, .01, 1);

		this.myCylinder.display();
	}


	setAngle(angleDegree)
	{
    	this.angle = angleDegree * Math.PI/180;
  	}
};
