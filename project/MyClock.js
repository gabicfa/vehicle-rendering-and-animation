/**
 * MyTable
 * @constructor
 */
 class MyClock extends CGFobject
 {
	constructor(scene)
	{
		super(scene);

		this.myCylinder = new MyCylinder(this.scene, 12, 1);
		this.myCircle = new MyCircle(this.scene,12)

		this.secondsHand = new MyClockHand(this.scene);
		this.minutesHand = new MyClockHand(this.scene);
		this.hoursHand = new MyClockHand(this.scene);

		this.materialTop = new CGFappearance(this.scene);
		this.materialTop.setAmbient(0.8, 0.8, 0.8, 1);
		this.materialTop.setSpecular(0.3, 0.3, 0.3, 1);
		this.materialTop.setDiffuse(0.8, 0.8, 0.8, 1);
		this.materialTop.setShininess(20);
		this.materialTop.loadTexture("../resources/images/clock.png");

		this.materialSecondsHand = new CGFappearance(this.scene);
		this.materialSecondsHand.setDiffuse(0.8, 0.8, 0.2, 1);

		this.materialRegularHand = new CGFappearance(this.scene);
		this.materialRegularHand.setDiffuse(.2, .2, .2, 1);
		this.materialRegularHand.setAmbient(.1, .1, .1, 1);

		this.secondsAngle = 270;
		this.minutesAngle = 180;
		this.hoursAngle = 90;

		this.secondsHand.setAngle(270);
		this.minutesHand.setAngle(180);
		this.hoursHand.setAngle(90);
	};

  display()
	{
		this.scene.pushMatrix();
		  this.myCylinder.display();
		this.scene.popMatrix();

    this.materialTop.apply();

    this.scene.pushMatrix();
      this.scene.translate(0, 0, 1);
      this.myCircle.display();

		// Seconds
	  this.materialSecondsHand.apply();
      this.scene.pushMatrix();
      	this.scene.scale(.6, .7,1);
      	this.secondsHand.display();
      this.scene.popMatrix();

	  this.materialRegularHand.apply();

	  	// Minutes
      this.scene.pushMatrix();
      	this.scene.scale(.5, .7, 1);
      	this.minutesHand.display();
      this.scene.popMatrix();
      	// Hours
      this.scene.pushMatrix();
      	this.scene.scale(.5, .5, 1);
      	this.hoursHand.display();
      this.scene.popMatrix();

    this.scene.popMatrix();
	};

	update(deltaTime)
	{
		this.secondsAngle += .006 * deltaTime;
		this.secondsHand.setAngle(this.secondsAngle);

		this.minutesAngle += .0001 * deltaTime;
		this.minutesHand.setAngle(this.minutesAngle);

		this.hoursAngle += .0001 / 24 * deltaTime;
		this.hoursHand.setAngle(this.hoursAngle);
	}
 };
