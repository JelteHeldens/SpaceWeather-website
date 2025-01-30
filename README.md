# Space Weather

![image](https://github.com/user-attachments/assets/a409b5c4-74fe-4435-bbba-842476d03ca1)

Space Weather is a web browser application made to experiment with Three.js. It includes a basic model of our solar system with rotating and interactable planets.
When clicking on a planet, the user will receive information about the average temperature, in the case of planet Mars, this info is gathered using NASA's InSight API.
It's this API that inspired this small project.


![image](https://github.com/user-attachments/assets/48d9bc93-2ea1-41b3-901b-ae3d379fa886)

## Simulation

The application contains a basic simulation of our solar system.

The planets are scaled:

- radius in km/10000

The distance to the sun of each planet is also relative in size:

- distance in km/(10*^7)

The sun has a different scale than the planets:

- radius in km/200000

Planets rotate at a speed relative to earth. (For simplicity they all rotate around the y-axis)

## Installation

The weather on Mars is gathered from [NASA's InSight API](https://api.nasa.gov/). To make this work, simply create your own NASA API Key and paste it into API-KEY.txt

After downloading this repo, simply enter the folder and execute the following command:

```bash
python server.py
```

Enjoy :)
