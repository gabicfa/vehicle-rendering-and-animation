/**
 * MyQuad
 * @constructor
 */
class MyTrapeze extends CGFobject
{
	constructor(scene, lAng, rAng)
	{
		super(scene);

		this.lAng = lAng;
		this.rAng = rAng;

		this.initBuffers();
	};

	initBuffers()
	{
        this.vertices = [
        	-0.5 - 1/Math.tan(this.lAng * Math.PI / 180), -0.5, 0,
            0.5 + 1/Math.tan(this.rAng * Math.PI / 180), -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,
        ];

        this.indices = [
            0, 1, 2,
            3, 2, 1
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.texCoords = [
			0, 1,
			1, 1,
            0, 0,
            1, 0
        ];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
