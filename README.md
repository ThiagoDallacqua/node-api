# node-api

**Links**

- [Requirements](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#requirements)

+ [Installation](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#installation)

* [Running the API](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#running-the-api)

+ [Usage](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#usage)

- [User](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#user)
- [Register a User](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#register-a-user-with-local-strategy)
- [Login](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#login)

* [Posts](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#posts)
* [Creating a post](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#creating-a-post)
* [Consulting a list of posts](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#consulting-a-list-of-posts)
* [Deleting a post](https://github.com/ThiagoDallacqua/node-api/blob/master/README.md#deleting-a-post)

## Requirements

Node.js versio 8+ [https://nodejs.org/en/](https://nodejs.org/en/)

MongoDB version 3+ [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/)

## Installation

`npm install`

## Running the API

`node server.js` if you want to run it as single thread or `node cluste.js` if you want to run it with the cluster

_tip: if you want to see the changes in your code, without having to restart the server manually, I recomend you to install [Nodemon.io](https://nodemon.io/)_

run `npm install -g nodemon` then run the application with `nodemon server.js` or `nodemon cluster.js`

also run `mongo --host 127.0.0.1:27017` to initiate the DB.

for linux users: if you face any issues while running the DB, try reading [this](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#start-mongodb)

**important:** you must initiate you DB before using this API and also setup the process.env.TOKEN_SECRET to be used as the secret for `jwt` validations.

## Usage

**Note that all routes, except the `/login` and `/register`, uses a middleware that check if there's a valid token. To check that middleware go to the
`middlewares/Authentication.js`**

### User

#### Register a User with local strategy

This application needs a valid user to be logged in, in order to user it's functionalities, so, the first step is to register a user, to do so
you must send a `POST` to `http://localhost:3001/register` with a JSON as follows:

```
{
	"name": "Jhon",
	"surname": "Doe",
	"email": "some@email.com",
	"password": "123pwd"
}
```

This route will automatically log in the user and returning a JSON containing a `token`:

```
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZ3JhenlAZW1haWwuY29tIiwibmFtZSI6IkdyYXp5Iiwic3VybmFtZSI6IkRhbGxhY3F1YSIsIl9pZCI6IjViNWUwM2FmMDBmMjc4MDY5MDAzYzcwMSJ9LCJleHAiOjE1MzI4OTE1ODQsImlhdCI6MTUzMjg4Nzk4NH0.7fav8Ax6jAjU3LFpgyFCMfLsNTnImRR7J_llgcmuzMY"
}
```

#### Login with local strategy

To login you must send a `POST` to `http://localhost:3001/users/login` containing
a valid `email` and `password` of a existing user, this will validate the user and generate a token that will be returned within a JSON:

 ```
{
	"email": "some@email.com",
	"password": "123pwd"
}
```

returns:

```
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZ3JhenlAZW1haWwuY29tIiwibmFtZSI6IkdyYXp5Iiwic3VybmFtZSI6IkRhbGxhY3F1YSIsIl9pZCI6IjViNWUwM2FmMDBmMjc4MDY5MDAzYzcwMSJ9LCJleHAiOjE1MzI4OTE1ODQsImlhdCI6MTUzMjg4Nzk4NH0.7fav8Ax6jAjU3LFpgyFCMfLsNTnImRR7J_llgcmuzMY"
}
```

### Posts

#### Creating a post

To create a new post you must send a `POST` to `http://localhost:3001/create/post` with a JSON containing as follows:
```
{
	"post": {
    "title": "some title",
    "content": "some content",
    "postDate": "2018-07-07",
    "creator": "Jhon Doe"
  }
}
```

This will return the data:

```
{
  "success": true,
  "response": {
    "user": {
      "id": "5b5e02d600f278069003c6fd"
    },
    "post": {
      "title": "some title",
      "content": "some content",
      "postDate": "2018-07-07T00:00:00.000Z",
      "creator": "Jhon Doe"
    },
    "_id": "5b5e344a9afb4c59c8a4485a",
    "__v": 0
  }
}
```

Notice that the `creator` attribute has been configurated in the frontend, you have the option to do it in the server changing [this section of the code](https://github.com/ThiagoDallacqua/node-api/blob/01fe66645d0ce8e861b18d7393e626e3927fcde9/controllers/posts.js#L10) as follows:

```
const post = {
      user: {
        id: req.decoded.user._id,
       },
       post: {
         creator: `${req.decoded.user.name} ${req.decoded.user.surname}`,
         ...req.body.post
       }
    };
```

### Consulting a list of posts

To check all posts created you must send a `GET` to `http://localhost:3001/posts`,
it will return an array of objects like that:

```
[
  {
    "id": "5b5e09cd91147f16753c03a9",
    "post": {
      "creator": "Jhon Doe",
      "title": "Some really nice title",
      "postDate": "2018-07-07T00:00:00.000Z",
      "content": "this is a really short content"
    },
    "creatorId": "5b5e02d600f278069003c6fd"
  },
  {
    "id": "5b5e0e872b21f92212bdcb37",
    "post": {
      "creator": "Jane Doe",
      "title": "Jane's Post",
      "postDate": "2018-07-07T00:00:00.000Z",
      "content": "lol"
    },
    "creatorId": "5b5e03af00f278069003c701"
  },
  {
    "id": "5b5e344a9afb4c59c8a4485a",
    "post": {
      "title": "some title",
      "content": "some content",
      "postDate": "2018-07-07T00:00:00.000Z",
      "creator": "Jhon Doe"
    },
    "creatorId": "5b5e02d600f278069003c6fd"
  },
  {
    "id": "5b5e35c73a26645cb26fd16b",
    "post": {
      "title": "some title",
      "content": "some content",
      "postDate": "2018-07-07T00:00:00.000Z",
      "creator": "Jhon Doe"
    },
    "creatorId": "5b5e02d600f278069003c6fd"
  }
]
```

#### Deleting a post

To delete an specific party you must send a `DELETE` to `http://localhost:3001/post/:id`, where the parameter `id` refers to the post id.

It will return an JSON with the return of the operation:

```
{
  "n": 1,
  "ok": 1
}
```

**Keep in mind that this operation will delete the post entry**