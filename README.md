# ELitmus Project

A website where user can attempt test by providing details, user's video is recorded and frontend sends images to backend at configurable regular intervals. Additionally, an admin dashboard where all images are shown.

## Frontend

Frontend is created using [React](https://reactjs.org/). It is hosted on [Vercel](https://vercel.com/)- a platform to deploy your applications.

- Local URL - [http://localhost:3000/](http://localhost:3000/)

- Vercel URL - [https://elitmus-fe.vercel.app/](https://elitmus-fe.vercel.app/)

It has an `admin` dashboard wherein admin can view all tests, users that attempted a particular test and images of that user in that test.

Admin can also configure `interval` and `duration` of amy test.

## Backend

Backend is a [Flask](https://flask.palletsprojects.com/en/2.2.x/) api with multiple endpoints. Hosted on Vercel.

- Local URL - [http://localhost:5000/](http://localhost:5000/)

- Vercel URL - [https://elitmus.vercel.app/](https://elitmus.vercel.app/)

There are 5 endpoints:

- `/` (Root endpoint): It displays a web page providing all endpoints.
- `/validate-creds` (Verify test code and email): This post request checks user's validity, correct test code and whether user has already attempted test or not.

  Body

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `code` | `string` | **Required**. Test code |
  | `email` | `string` | **Required**. User's email |
  
  Response

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `status` | `string` | Status code |
  | `message` | `number` | Message |
  
- `/test-details` (Get test details endpoint): It is a post request that firstly updates the user's email in attempted users of that test, initializes testUserData collection with this user and then returns the details of that test.

  Body

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `code` | `string` | **Required**. Test code |
  | `email` | `string` | **Required**. User's email |
  
  Response

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `code` | `string` | Test code |
  | `name` | `string` | Test name |
  | `interval` | `number` | Interval |
  | `duration` | `number` | Duration |
  
- `/send-image` (Send image to backend endpoint): It is a post request that sends image along with timestamp to the backend for storage in database and returns a message after successfull uploading.

  Body

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `key` | `string` | **Required**. Unique key to identify user (email-code) |
  | `img` | `string` | **Required**. User's image |
  | `timestamp` | `integer` | **Required**. Image timestamp |
  
  Response

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `data` | `string` | message |
  
- `/all-tests` (Get info of all tests endpoint): It is a get request that gets the details of all tests from the database and returns it to frontend.
  
  Response

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `code` | `string` | Test code |
  | `name` | `string` | Array of objects containaing |
  | `interval` | `number` | Interval of images |
  | `duration` | `number` | Duration of test |
  | `attemptedBy` | `array` | Array having email of users who attempted this test |
  
- `/user-data` (Get all images of user endpoint): It is a post request that finds all images of user in a particular test and returns to frontend.

  Body

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `key` | `string` | **Required**. Unique key to identify user (email-code) |
  
  Response

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `data` | `array` | Array of objects containing image and timestamp | 
  
- `/update-interval-or-duration` (Update interval or duration endpoint): It is a post request used to update interval/duration of a particular test. It can only be performed by admin.

  Body

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `code` | `string` | **Required**. Unique key to identify user (email-code) |
  | `key` | `string` | **Required**. interval/duration |
  | `value` | `number` | **Required**. Value of interval/duration |
  
  Response

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `data` | `string` | Message |   
  
## Extension

Chrome extension lets user fill in the following details: `email` , `name` and `code` , performs verification and then starts the test, sends images to backend.

## Database

Database used is [MongoDB](https://www.mongodb.com/)

There are 3 collections:

- `users` It contains details of all users

  Structure

  | Key | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `name` | `string` | Name of the user |
  | `email` | `string` | Email of user |

- `tests` It contains details of all tests

  Structure

  | Key | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `code` | `string` | Test Code |
  | `name` | `string` | Test Name |
  | `interval` | `number` | Interval of images |
  | `duration` | `number` | Duration of test |
  | `attemptedBy` | `array` | Array having email of users who attempted this test |
  
- `testUserData` It contains images of all tests

  Structure

  | Key | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `key` | `string` | email-code |
  | `attemptedBy` | `array` | Array of objects containing image and timestamp  |
  
## Run on Local

1. Clone the repository
2. Setup & Install dependencies

    - Frontend

      > First, you need [Node.js](https://nodejs.org/en/) installed.
      ```
      cd FE
      npm i
      ```
    - Backend

      > First, you need [Python(3.11.0)](https://www.python.org/downloads/release/python-3110/) installed.
      ```
      cd BE
      python -m ensurepip --upgrade
      pip install flask flask_cors pymongo
      ```
      
    - Extension

       - Open `chrome://extensions/`
       - Turn on `Developer Mode`
       - Click `Load Unpacked`
       - Select `Extension` Folder
       - Pin the extension

3. Run the app

    - Frontend
      ```
      npm start
      ```
    - Backend

      ```
      python -m flask --app index run
      ```
      
    - Extension

       - Click on `Elitmus Test` extension

 ## Sample Credentials
 
  Users
 
  | Name | Email     |
  | :-------- | :------- |
  | `Aman` | `aman@gmail.com` |
  | `Jeenifer` | `jenny@gmail.com` |
  | `Maria` | `maria@gmail.com` |
  | `Denial` | `denial@gmail.com` |
  | `Rose` | `rose@gmail.com` |
  
  Codes

  | Code |
  | :-------- |
  | `T12345` |
  | `T23456` |
  | `T34567` |
  | `T45678` | 
  | `T56789` |
  | `T67890` | 
  | `T11100` |
  | `T12300` | 
  | `G10101` |
  | `Q12300` | 
  | `W11100` |
  | `E1E30W` | 
  | `S1110Y` |
  | `Z32300` | 
  | `D1610P` |
  | `C12P00` | 
