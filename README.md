# Space Weather

Space Weather is a web browser application made to experiment with Three.js. It includes a basic model of our solar system with rotating and interactable planets.
When clicked on a planet, the user will receive information about the average temperature, in the case of planet Mars, this info is gathered using NASA's InSight API.
It's this API that inspired this small project.

## Simulation

The application contains a basic simulation of our solar system.

The planets are scaled:

- radius in km/10000

The distance to the sun of each planet is also relative in size:

- distance in km/(10*^7)

The sun has a different scale than the planets:

- radius in km/200000

## Installation

After downloading this repo, simply enter the folder and execute the following command:

```bash
python server.py
```

Enjoy :)