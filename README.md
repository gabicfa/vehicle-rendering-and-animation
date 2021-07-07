# vehicle-rendering-and-animation

## Goal
  * Apply the knowledge and techniques acquired in the Computer Graphics module from the University of Porto
  * Use elements of interaction with the scene through the keyboard and graphic interface elements

## Runing

Run the follow command at you terminal:
```bash
python -m http.server 8080
```
The project will run at port 8080

## Description

A four-wheeled motor vehicle and the terrain where the vehicle travels were modeled. A graphical interface (GUI) was also created with some controls to change scene parameters at runtime. In addition, a mechanism was created to control the vehicle using the keys as follows: forward or backward as you press "W" or "S", respectively and if the "A" or "D" keys are pressed when the vehicle is moving, the vehicle must advance (or rewind) by turning left or right, respectively.

An interface for the selection of textures was built, integrated into the application's GUI and the terrain was modeled with altimetry, modifying the terrain class so that the plane vertices have a variable height.

Finally, an articulated crane with a magnet that interacts with the vehicle was modeled.
