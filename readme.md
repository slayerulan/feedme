SkyBet FeedMe tech test
-----------------------

### Prerequisites

- Node.js (tested on v8.2.0)
- NPM (tested on v5.3.0)
- Docker (tested on v17.06.0-ce)
- Docker compose (tested on v1.14.0)

Tested on OSX but should also run on windows.

### Getting started

1. Start docker to bring up mongodb with `docker-compose up`
1. Install dependencies with `npm i`
1. Run the application with `npm start`

To run unit test run `npm run test` or `npm run test:watch` if you wish to run them continuously.

**NOTE: Due to a bug in `mongomem` ([#2](https://github.com/CImrie/mongomem/issues/2)) port 27017 needs to be kept free for the in memory mongodb tests to run.**

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
 - [ ] #004 Save the JSON into a NoSQL store with a document per fixture. Each document should contain the event data and the child markets and outcomes for the fixture
 - [ ] #005 Implement a way of sharding / partitioning the transformed JSON packets via one or more message queues
 - [ ] #006 Utilising the message queue(s) move your NoSQL logic into another app that can be run multiple times to enable concurrent NoSQL writes
 - [ ] #007 Implement a front end that displays the hierarchical NoSQL data. Use the Sky Bet website for layout and navigational inspiration
 - [ ] #008 Create a Dockerfile for your app(s)


