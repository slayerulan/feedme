SkyBet FeedMe tech test
-----------------------

### Prerequisites

- Node.js (tested on v8.2.0)
- NPM (tested on v5.3.0)
- Docker (tested on v17.06.0-ce)
- Docker compose (tested on v1.14.0)

Tested on OSX but should also run on windows.

### Applications

This solution contains three applications:

1. packetConsumer - this is responsible for consuming the feedme provider, parsing the packets and writing them to rabbitmq
1. queueConsumer - this is responsible for reading the messages from rabbitmq and making the relevant update in mongoDB.
1. web - this react web app consumes the data from Mongo via an express API and displays it to the user.

### Running the app

1. Start all applications by running `docker-compose up`

This will build the images for each of the app which includes `npm install` so it could take a while. Once complete the apps will be brought up.

View the apps here:

 - frontend - [http://localhost:3000](http://localhost:3000)
 - rabbitmq - [http://localhost:15672](http://localhost:15672) details `rabbitmq:rabbitmq`
 - mongodb  - `mongodb://localhost:27017/feedme`

 To run the apps in isolation and in development mode simply comment out the relevant section of `docker-compose.yml` and run that application as described below. 

#### packetConsumer

1. Change directory to the app `cd packetConsumer`
1. Install dependencies with `npm i`
1. Run the application with `npm start`

To run unit test run `npm run test` or `npm run test:watch` if you wish to run them continuously.

#### queueConsumer

1. Change directory to the app `cd queueConsumer`
1. Install dependencies with `npm i`
1. Run the application with `npm start`

To run unit test run `npm run test` or `npm run test:watch` if you wish to run them continuously.

**~~NOTE: Due to a bug in `mongomem` ([#2](https://github.com/CImrie/mongomem/issues/2)) port 27017 needs to be kept free for the in memory mongodb tests to run.~~** these tests have been disabled to allow this to be run hassle free.

#### web

1. Change directory to the app `cd web`
1. Install dependencies with `npm i`
1. Start the express server with `npm run start:server`
1. Run the react app in development mode with hmr `npm start`

### Assumptions

- The tasks talk about "fixtures". I have assumed that these are synonymous with packets of type "event".
- eventId is unique
- marketId is unique
- outcomeId is unique
- all fields are always populated (null checking is not required)

### Tasks:

 - [x] #001 Create an app that connects the provider service on the exposed TCP port
 - [x] #002 Transform the proprietary data format into JSON using the field names and data types defined in the provider /types endpoint
 - [x] #003 Write unit tests
 - [x] #004 Save the JSON into a NoSQL store with a document per fixture. Each document should contain the event data and the child markets and outcomes for the fixture
 - [ ] #005 Implement a way of sharding / partitioning the transformed JSON packets via one or more message queues
 - [x] #006 Utilising the message queue(s) move your NoSQL logic into another app that can be run multiple times to enable concurrent NoSQL writes
 - [x] #007 Implement a front end that displays the hierarchical NoSQL data. Use the Sky Bet website for layout and navigational inspiration
 - [x] #008 Create a Dockerfile for your app(s)

### Known issues/Future modifications:

 - After the `packetConsumer` has been running for a while it occasionally loses connection with the feedme provider. A simple retry policy should resolve this.
 - Sharding by event (as requirements stated more events were to be added) - the majority of packets are create/update outcomes which do not  include the related eventId. To shard these on event we'd need to introduce a new query to Mongo from the `packetConsumer` - this could have a negative impact on performance.
 - Mongo readonly replica - as the website only reads the data it could read from a replica to decrease load on the main mongo instance.
 - Update web app to use websockets instead of polling.
 - Failures are logged to mongo but could easily be surfaced through the web app for ease of use.
 - Update UI to not render fixtures, markets or outcomes with `displayed` set to `false` or `suspended` set to `true`. In testing this looked to me most of the data so I removed the check to better test the app.
 - Move `fixture.model.js` into a shared resource. Currently there is duplication.