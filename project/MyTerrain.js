

class MyTerrain extends Plane{

  constructor(scene, altimetry)
  {
    super(scene, altimetry.length - 1);

    this.altimetry = altimetry;
    this.altimetry[0][0] = 7;

    this.initBuffers();
    this.initGLBuffers();
    this.initMaterials();
  };

  initBuffers()
  {
    if (!this.altimetry)  return;

    super.initBuffers();

    this.vertices = [];

    var yCoord = 0.5;
    for (var i = 0; i <= this.nrDivs; i++)
    {
      var xCoord = -0.5;
      for (var j = 0; j <= this.nrDivs; j++)
      {
        this.vertices.push(xCoord, yCoord, this.altimetry[i][j]);
        xCoord += this.patchLength;
      }
      yCoord -= this.patchLength;
    }
  }

  initMaterials(){
    this.materialTerrain = new CGFappearance(this.scene);

    this.materialTerrainRocky = new CGFappearance(this.scene);
    this.materialTerrainRocky.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialTerrainRocky.setSpecular(0.3, 0.3, 0.3, 1);
    this.materialTerrainRocky.setDiffuse(0.8, 0.8, 0.8, 1);
    this.materialTerrainRocky.setShininess(20);
    this.materialTerrainRocky.loadTexture("../resources/images/RockyDesert.png");

    this.materialTerrainGrass = new CGFappearance(this.scene);
    this.materialTerrainGrass.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialTerrainGrass.setSpecular(0.3, 0.3, 0.3, 1);
    this.materialTerrainGrass.setDiffuse(0.8, 0.8, 0.8, 1);
    this.materialTerrainGrass.setShininess(20);
    this.materialTerrainGrass.loadTexture("../resources/images/grass.jpg");

    this.materialTerrainSand = new CGFappearance(this.scene);
    this.materialTerrainSand.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialTerrainSand.setSpecular(0.3, 0.3, 0.3, 1);
    this.materialTerrainSand.setDiffuse(0.8, 0.8, 0.8, 1);
    this.materialTerrainSand.setShininess(20);
    this.materialTerrainSand.loadTexture("../resources/images/sand.jpg");

    this.terrainPossibleAppearances = [this.materialTerrainRocky, this.materialTerrainGrass, this.materialTerrainSand];
  }

  updateTexture(currTerrainAppearance){
    this.materialTerrain = this.terrainPossibleAppearances[currTerrainAppearance];
  }

  display()
  {
    this.materialTerrain.apply();
    this.scene.pushMatrix();
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.scene.scale(50, 50, 1);
      this.drawElements(this.primitiveType);
    this.scene.popMatrix();
  };
};
