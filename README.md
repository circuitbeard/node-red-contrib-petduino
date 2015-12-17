# node-red-contrib-petduino

A set of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for interacting with a <a href="http://circuitbeard.co.uk/petduino" target="_new">Petduino</a>.

## Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-petduino


## Usage

### pet-event

A node that listens to a serial connection for a specified Petduino event, parsing out any associated value.

![Screenshot1](https://cdn.rawgit.com/circuitbeard/node-red-contrib-petduino/master/assets/screenshot01_01.png) 

_**Caption:** pet-event settings dialog_


![Screenshot2](https://cdn.rawgit.com/circuitbeard/node-red-contrib-petduino/master/assets/screenshot01.png)

_**Caption:** example of correct wiring of the pet-event node to an incoming serial node_

### pet-action

A node to construct a Petduino serial command of the specified action type with the specified value payload.

![Screenshot3](https://cdn.rawgit.com/circuitbeard/node-red-contrib-petduino/master/assets/screenshot02_01.png)

_**Caption:** pet-action settings dialog defining a state change action_

![Screenshot4](https://cdn.rawgit.com/circuitbeard/node-red-contrib-petduino/master/assets/screenshot02_02.png)

_**Caption:** pet-action settings dialog defining a screen layout to draw to the Petduino screen_

![Screenshot5](https://cdn.rawgit.com/circuitbeard/node-red-contrib-petduino/master/assets/screenshot02.png)

_**Caption:** example of correct wiring of the pet-action node to an outgoing serial node_
