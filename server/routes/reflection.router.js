const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('made it to reflection router.get')
  const queryText = `SELECT * FROM "reflection"`;
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing get reflection query', err);
      res.sendStatus(500);
    });
});//end router.get

router.post('/', (req, res) => {
  console.log('made it to reflection router.post');
    const newReflection = req.body;
    console.log(newReflection);
    const queryText = `
    INSERT INTO "reflection" ("topic", "description")
    VALUES ($1, $2)
    `;
    const queryValues = [
      newReflection.topic,
      newReflection.reflection
    ];
    pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing PUT reflection query', err);
      res.sendStatus(500);
    });
  });//end router.post

  router.put('/:id', (req, res) => {
    //updates reflection entry in sql reflection table
    console.log('PUT /reflections', req.body);
    const id = req.params.id;
    console.log(req.params.id);
    const reflection = req.body;
    const queryText = `UPDATE "reflection" SET "topic" = $1, "description" = $2, "bookmarked" = $3 WHERE "id" = $4;
`;
    pool.query(queryText, [reflection.topic, reflection.description, reflection.bookmarked, id])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error making reflection router put query', error);
            res.sendStatus(500);
        });
});//end router.put

router.delete('/:id', (req, res) => {
  //deletes a reflection from the table
  let reflectionId = req.params.id;
  let queryText = `DELETE FROM "reflection" where "id" = $1`;
  pool.query(queryText, [reflectionId]).then((response) => {
      console.log('this is the delete response from sql: ', response);
      res.sendStatus(201);
  }).catch((error) => {
      console.log('error on reflection router.delete', error);
  });
});//end router.delete



 



module.exports = router;