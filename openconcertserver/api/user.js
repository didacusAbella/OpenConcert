const express = require("express");
const userRouter = express.Router();
const driver = require("../db/driver");
const moment = require("moment");

var session = driver.session();

moment.locale('it')

// Get users
userRouter.get("/", function (req, res) {
  session
    .run('MATCH (n:User) RETURN n.name AS name, n.lastname AS lastname, n.email AS email, n.city AS city')
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "name": element.get("name"), "lastname": element.get("lastname"), "email": element.get("email"), "city": element.get("city") });
      });
      res.json(response)
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});

//Update
userRouter.put("/user/:email", function (req, res) {
  session
    .run('MATCH (n:User {email:{email}}) SET n = {props} RETURN n', { email: req.params.email, props: req.body })
    .then(function (result) {
      res.status(200).json({ update: true });
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
});

//Delete
userRouter.delete("/user/:email", function (req, res) {
  session
    .run('MATCH (n:User) WHERE n.email={email} DELETE n', { email: req.params.email })
    .then(function () {
      res.status(200).json({ deleted: true });
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ deleted: false });
    });
});

// Get single user
userRouter.get("/user/:email", function (req, res) {
  session
    .run('MATCH (n:User) WHERE n.email={email} RETURN n', { email: req.params.email })
    .then(function (result) {
      if (result.records.length == 1) {
        result.records.forEach(element => {
          res.status(200).json(element.get("n").properties);
        });
      } else {
        res.status(412).json({ exist: false });
      }
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ exist: false });
    });
})

//Get user friends
userRouter.get("/user_friends/:email", function (req, res) {
  session
    .run('MATCH (u:User)-[FRIEND]->(f:User) WHERE u.email = {email} Return f.name AS name, f.lastname AS lastname, f.city AS city, f.email AS email', { email: req.params.email })
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "name": element.get("name"), "lastname": element.get("lastname"), "email": element.get("email"), "city": element.get("city") });
      })
      res.status(200).json(response);
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ exist: false });
    });
})

//Add user friend
userRouter.post("/user_friends/:email", function (req, res) {
  session
    .run('MATCH (a:User), (b:User) WHERE a.email = {email} AND b.email = {bemail} MERGE (a)-[r:FRIEND]->(b) RETURN r', { email: req.params.email, bemail: req.body.email })
    .then(function () {
      res.status(200).json({ friend: true })
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ friend: false });
    });
})

//Remove user friend
userRouter.delete("/user_friends/:email/:bemail", function (req, res) {
  session
    .run('MATCH (u:User)-[f:FRIEND]->(g:User) WHERE u.email = {email} AND g.email={bemail} DELETE f', { email: req.params.email, bemail: req.params.bemail })
    .then(function () {
      res.status(200).json({ friend: false })
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
})


//Get user genres
userRouter.get("/user_genres/:email", function (req, res) {
  session
    .run('MATCH (u:User)-[TYPE]->(g:Genre) WHERE u.email = {email} Return g.name AS name', { email: req.params.email })
    .then(function (result) {
      response = [];
      result.records.forEach(element => {
        response.push({ "genre": element.get("name") });
      })
      res.status(200).json(response);
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ exist: false });
    });
})

//Add user genre
userRouter.post("/user_genres/:email", function (req, res) {
  session
    .run('MATCH (a:User), (b:Genre) WHERE a.email = {email} AND b.name = {name} MERGE (a)-[r:LIKE]->(b) RETURN r', { email: req.params.email, name: req.body.genre })
    .then(function () {
      res.status(200).json({ like: true })
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ like: false });
    });
})

//Remove user genre
userRouter.delete("/user_genres/:email/:name", function (req, res) {
  session
    .run('MATCH (u:User)-[f:LIKE]->(g:Genre) WHERE u.email = {email} AND g.name={name} DELETE f', { email: req.params.email, name: req.params.name })
    .then(function () {
      res.status(200).json({ like: false })
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
  var time = new Date()
})




//Get user locales
userRouter.get("/user_locales/:email", function (req, res) {
  var response = []
  session
    .run('MATCH (u:User)-[FREQUENT]->(l:Locale) WHERE u.email = {email} Return l', { email: req.params.email })
    .then(function (result) {
      result.records.forEach(element => {
        response.push(element.get("l").properties)
      })
      res.status(200).json(response);
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ exist: false });
    });
})

//Add user locale
userRouter.post("/user_locales/:email", function (req, res) {
  session
    .run('MATCH (a:User), (b:Locale) WHERE a.email = {email} AND b.name = {name} MERGE (a)-[r:FREQUENT]->(b) RETURN r', { email: req.params.email, name: req.body.name })
    .then(function () {
      res.status(200).json({ frequented: true })
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ frequented: false });
    });
})

//Remove user locale
userRouter.delete("/user_locales/:email/:name", function (req, res) {
  session
    .run('MATCH (u:User)-[f:FREQUENT]->(g:Locale) WHERE u.email = {email} AND g.name={name} DELETE f', { email: req.params.email, name: req.params.name })
    .then(function () {
      res.status(200).json({ frequented: false })
      session.close();
    })
    .catch(function (error) {
      console.log(error);
    });
})

//Recommendation user friends
userRouter.get("/recom_friends/:email", function (req, res) {
  var response = []
  var email = req.params.email

  session
    .run('MATCH (p1:User{email:{email}})-[:FRIEND*2]->(friend:User),(p1)-[:LIKE]->(g:Genre), (friend)-[:LIKE]->(g2:Genre) WHERE NOT (friend)<-[:FRIEND]-(p1) AND g.name = g2.name RETURN DISTINCT friend.name AS name, friend.lastname AS lastname, friend.email AS email', { email: email })
    .then(function (result) {
      result.records.forEach(element => {
        response.push({ "name": element.get("name"), "lastname": element.get("lastname"), "email": element.get("email"), "genre": true });
      })
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ recommendation: false });
    });

  session
    .run('MATCH (p1:User{email:{email}})-[:FRIEND]->(friend:User)-[:FRIEND]->(p2:User) WITH p1, p2,count(friend) AS friend_count WHERE NOT (p2)<-[:FRIEND]-(p1) AND  friend_count >= 2 AND p1.city = p2.city RETURN p2.name AS name, p2.lastname AS lastname, p2.email AS email', { email: email })
    .then(function (result) {
      result.records.forEach(element => {
        response.push({ "name": element.get("name"), "lastname": element.get("lastname"), "email": element.get("email"), "preference": 2 });
      })
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ recommendation: false });
    });

  session
    .run('MATCH (p1:User{email:{email}})-[:FRIEND]->(friend:User)-[:FRIEND]->(p2:User) WITH p1, p2,count(friend) AS friend_count WHERE NOT (p2)<-[:FRIEND]-(p1) AND  friend_count >= 2 AND p1.city <> p2.city  RETURN p2.name AS name, p2.lastname AS lastname, p2.email AS email', { email: email })
    .then(function (result) {
      result.records.forEach(element => {
        response.push({ "name": element.get("name"), "lastname": element.get("lastname"), "email": element.get("email"), "preference": 1 });
      })
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ recommendation: false });
    });

  session
    .run('MATCH (u:User{email:{email}})-[:FRIEND*2]->(friend:User) WITH u, friend, count(friend) AS friend_count WHERE NOT (friend)<-[:FRIEND]-(u) AND friend_count < 2 RETURN friend.name AS name, friend.lastname AS lastname, friend.email AS email', { email: email })
    .then(function (result) {
      result.records.forEach(element => {
        response.push({ "name": element.get("name"), "lastname": element.get("lastname"), "email": element.get("email"), "preference": 0 });
      })
      res.status(200).json(response);
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ recommendation: false });
    });
})

// Recommendation user genres
userRouter.get("/recom_genres/:email", function (req, res) {
  var response = []
  var user_genres = []

  session
    .run('MATCH (p1:User{email:{email}})-[:LIKE]->(g:Genre) RETURN  DISTINCT g.name AS name', { email: req.params.email })
    .then(function (result) {
      result.records.forEach(element => {
        user_genres.push(element.get("name"));
      })
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ recommendation: false });
    });

  session
    .run('MATCH (p1:User{email:{email}})-[:FRIEND]->(friend:User), (p1)-[:LIKE]->(g:Genre), (friend)-[:LIKE]->(g2:Genre)  RETURN  DISTINCT g2.name AS name', { email: req.params.email })
    .then(function (result) {
      result.records.forEach(element => {
        name = element.get("name")
        if (user_genres.includes(name) == false) {
          response.push({ "genre": name })
        }
      })
      res.status(200).json(response);
      session.close();
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ recommendation: false });
    });
  /*
    session
      .run('MATCH (p1:User{email:{email}})-[:FRIEND*2]->(friend:User), (p1)-[:LIKE]->(g:Genre), (friend)-[:LIKE]->(g2:Genre)  RETURN  DISTINCT g2.name AS name', { email: req.params.email })
      .then(function (result) {
        result.records.forEach(element => {
          name = element.get("name")
          if (user_genres.includes(name) == false) {
            response.push({ "genre": name })
          }
        })
        res.status(200).json(response);
        session.close();
      })
      .catch(function (error) {
        console.log(error);
        res.status(412).json({ recommendation: false });
      });
      */
})

// Recommendation user events
userRouter.get("/recom_events/:email", function (req, res) {
  var response = []
  session
    .run('MATCH (u:User{email:{email}})-[l:LIKE]->(type), (b:Band)-[t:TYPE]->(genres), (b:Band)-[p:PLAYED]->(locales) WHERE genres = type AND p.date > {time} RETURN b.name AS name, locales, p.date AS timestamp ORDER BY timestamp', { email: req.params.email, time: Math.floor(Date.now() / 1000) })
    .then(function (result) {
      result.records.forEach(element => {
        response.push({ "band": element.get("name"), "locale": element.get("locales").properties, "date": moment(moment.unix(element.get("timestamp").low)).format('LLLL') });
      })
      res.status(200).json(response)
      session.close()
    })
    .catch(function (error) {
      console.log(error);
      res.status(412).json({ recommendation: false });
    })
});



module.exports = userRouter;