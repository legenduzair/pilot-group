# ISS Tracker API

This project tracks the current location of the Internation Space Station, detects what country it is currently over if it is and displays the distance in miles from '15 Carnarvon Street, Cheetham Hill, Manchester M3 1HJ'.

## How to acquire and run the application

1. First, clone the respository onto your local machine or download the source code. 
2. Navigate to where your project is located on the machine.
3. Install the required dependencies using the following command: 'npm install'.
4. Start the application by running the following command: 'nodemon index.js'.

## How to query the endpoint

You may test the endpoint in different ways; you may download POSTMAN or anything similar to send a HTTP request to the following endpoint: 'http://localhost:5000/iss-tracker'. Or you can enter that url in your browser and it will return a JSON response with the desired requirements.

## Potential Improvements

If i was to improve this application I would:

1. Implement Authentication to secure the API. 
2. Add unit tests using a testing library such as JEST for the API endpoint. 
3. Possible, containerise the application using Docker so that it can used and deployed easily. 
4. Maybe instead of using console.log, use VS Code debugger for more efficient debugging.
5. Implement rate limiting so the API endpoint does not get abused. 
6. Potentially implement better error handling within the API endpoint so if the variables are null or undefined, then return a console warning. 

## Optional Extras

### Response Time

I would improve the response time by implementing caching. This helps performance as it stores the data that is commonly accessed. This means you dont need to keep calling the API constantly. Another method would be to implement a CDN which would cache the response data geographically closer to users which reduces latency. 

### Authentication

I would implement basic authentication by implementing a popular node library; JSON Web Token. I would create the appropriate middleware function to create and verify a JWT upon user authentication. If the token is valid, the API may be called. This would improve the application's security. 

### Unit Testing

I would implement a variety of unit tests using JEST. Tests include:
- Test the API endpoint '/iss-tracker' and ensure that it returns the correct JSON response (country and distance). Check that it returns a 200 status code.
- If the api endpoint fails, mock the API endpoint so it returns 500 server error code. Ensure that the JSON response for this is correct.  
- Test the functionality of calculating the distance between the targetted address and current location of the ISS. Input mock longitude and latitude coordinate objects and see if it returns the correct distance using geolib. 
- Ensure that the external APIs within the created API endpoint fetch the correct response results. 