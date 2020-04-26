Step Tracking Server

Imagine that your company is launching a fitness tracking wearable device. They need your team to develop a step tracking backend application that can do the following:

Maintain a user's cumulative step count through a stream of updates.
Provide an interface to retrieve the user's cumulative step count.
Here are the technical requirements:
A WebSocket-based API in which the client can send a series of updates with the number of steps that were recently taken. Whenever the server receives a valid update, the user's step count should be updated to reflect the total number of steps taken up until that point in time. A valid update is a WebSocket message containing a JSON payload that has an update_id (string), a username (string), a ts (numerical timestamp) representing when the client sent the update, and the newSteps (number) recently taken. The server should ignore an update that isn't valid.
The client will access your WebSocket server by opening a connection to ws://localhost:8081.
Here's an example of an update that your server needs to handle:

{
    "update_id": "c0efd8a1-b3b8-49b7-92b1-69edc8bd6c0c",
      "username": "jenna",
        "ts": 1503031275211,
          "newSteps": 17
        }

A REST API endpoint served to get the total number of steps taken by a user up until that point in time:

Request
GET http://localhost:8080/users/{username}/steps
Example: GET http://localhost:8080/users/jenna/steps

Success Response:
Code: 200
Body: { "cumulativeSteps": 183, "ts": 1503031279439 }
ts represents the timestamp of the most recent valid update for a user from the client.
Error Response:
Code: 404 (not found)
Body: { "error": "User doesn't exist" }
Your Task
Your task is to complete the Step Tracking application by implementing both the websocket API and the REST API endpoint described above.
This is an initial prototype to be tested internally at the company, so you don't need to handle user authentication. Since we don't expect a lot of users now, we're using a simple in-memory store object to maintain state. Here is an example of the store at a given point in time:

{
    jenna: { ts: 1503256778463, cumulativeSteps: 12323},
    james: { ts: 1503256824767, cumulativeSteps: 587 },
}

You should use the following npm package in your implementation of the WebSocket API:
ws (https://www.npmjs.com/package/ws)
If you roll your own, you must produce a function close() that shuts down the WebSocket server.
You may optionally use one of the following npm packages in your implementation of the REST API endpoint:
express (https://www.npmjs.com/package/express)
koa (https://www.npmjs.com/package/koa)
hapi (https://www.npmjs.com/package/hapi)
restify (https://www.npmjs.com/package/restify)
Running on your local environment
npm install to install dependencies.
npm test to run the tests (they will be failing at first).
Write your code in the existing files to make the tests pass. Look for the TODO comments.
Submit your code on the Devskiller platform. Make sure the tests pass here, too, before submitting.
Good Luck!