class MyInterface extends CGFinterface {
	/**
	 * MyInterface
	 * @constructor
	 */

 	constructor () {
 		super();
 	}

	/**
	 * init
	 * @param {CGFapplication} application
	 */

	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		// http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();

		// add a button:
		// the first parameter is the object that is being controlled (in this case the scene)
		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

		// this.gui.add(this.scene, 'control');

		// add a group of controls (and open/expand by defult)


    this.gui.add(this.scene, 'bodyAppearance', ['none', 'pineapple', 'apple', 'orange','strawberry'] );

    this.gui.add(this.scene, 'wheelAppearance', ['default', 'lolipop', 'clock', 'cookie'] );

    this.gui.add(this.scene, 'glassAppearance', ['default', 'glass', 'takumi', 'vitral'] );

    this.gui.add(this.scene, 'lightAppearance', ['default', 'lanterna1', 'lanterna2', 'lanterna3'] );

    this.gui.add(this.scene, 'terrainAppearance', ['rocky', 'grass', 'sand'] );

		var lights=this.gui.addFolder('Lights');
		lights.open();

    lights.add(this.scene, 'light1');
    lights.add(this.scene, 'light2');

    this.gui.add(this.scene, 'eixos');

    this.initKeys();

		return true;
	};


  initKeys(){
    this.scene.gui=this;
    this.processKeyboard=function(){};
    this.activeKeys={};
  }
  processKeyDown(event) {
    this.activeKeys[event.code]=true;
  };
  processKeyUp(event) {
    this.activeKeys[event.code]=false;
  };
  isKeyPressed(keyCode) {
    return this.activeKeys[keyCode] || false;
  }

};
