/**
 * MyQuad
 * @constructor
 */
class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	};

	initBuffers() 
	{	
		// DRAW VERTICES ------------

		this.vertices = [];

		var alpha = 2* Math.PI / this.slices;

		for (var i = 0; i < this.stacks + 1; i++) {
			for (var angle = 0; angle < 2* Math.PI; angle+= alpha) {
				this.vertices.push(Math.cos(angle), Math.sin(angle), 0 + i/this.stacks);
				this.vertices.push(Math.cos(angle), Math.sin(angle), 0 + i/this.stacks);
			}
		}

		// DRAW INDICES ------------

		this.indices = [];
	
		// Side
		
		for (var j = 0; j < this.stacks; j++) {
			var offset = j * this.slices * 2; // offset for each face
			
			this.indices.push(0 + offset, 4 * this.slices - 1 + offset,2 * this.slices - 1 + offset);
			this.indices.push(0 + offset, 2 * this.slices + offset, 4 * this.slices - 1 + offset);

			for (var i = 1; i < this.slices*2 - 1; i+= 2) {
				this.indices.push(i+1 + offset, i + 2*this.slices + offset, i + offset);
				this.indices.push(i+1 + offset, i + 2*this.slices + 1 + offset, i + 2*this.slices + offset);
			}
		}


		// DRAW NORMALS ------------

		this.normals = [];
		var angle = Math.PI / this.slices; // alpha / 2

		for (var i = 0; i < this.stacks + 1; i++) {
			this.normals.push(Math.cos(2*Math.PI - angle), Math.sin(2*Math.PI - angle), 0);

			for (var j = 0; j < this.slices - 1; j++) {
				this.normals.push(Math.cos(angle + j*alpha), Math.sin(angle + j*alpha), 0);
				this.normals.push(Math.cos(angle + j*alpha), Math.sin(angle + j*alpha), 0);
			}

			this.normals.push(Math.cos(2*Math.PI - angle), Math.sin(2*Math.PI - angle), 0);
		}
        /*
		for (var i = 0; i < this.vertices.length; i++) {
			console.log(this.vertices[i]);
			console.log("--");
		}
		
		console.log("INDICES");
		for (var i = 0; i < this.indices.length; i++) {
			console.log(this.indices[i]);
			console.log("--");
		}

		console.log("NORMALS");
		for (var i = 0; i < this.normals.length; i++) {
			console.log(this.normals[i]);
			console.log("--");
		}

		

		console.log(this.vertices.length);
		console.log(this.indices.length);
		console.log(this.normals.length);
        */
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
