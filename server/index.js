const express = require('express');
const cors = require('cors');

const app = express();
const parser = require('body-parser');
const db = require('./db');

app.use(express.static(`${__dirname}/../client/dist`));

app.use(parser.json(), cors());


app.get('/restaurant/:id/info', (req, res) => {
  db.getRestaurantById(req.params.id, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.send(result);
    }
  });
});


app.get('/restaurant/:id/suggestions', (req, res) => {
  db.getRestaurantById(req.params.id, (error, result) => {
    if (error) {
      throw error;
    } else {
      const { neighborhood } = result.businessInfo.location;
      const { cuisine } = result.details;
      db.getRestaurantSuggestions(neighborhood, cuisine, (err, restaurants) => {
        if (err) {
          console.log('error here');
          throw err;
        } else {
          res.send(restaurants);
        }
      });
    }
  });
});


app.listen('1170', () => {
  console.log('listening on elevenseventy');
});
