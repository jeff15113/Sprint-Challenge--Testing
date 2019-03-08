const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

const db = require("./data/gamesDb");

server.post("/api/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({
      errorMessage: "game must have a title and genre."
    });
    return;
  }
  db.insert({
    title,
    genre,
    releaseYear
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the game to the database"
      });
      return;
    });
});

server.get("/api/games", (req, res) => {
  db.get()
    .then(games => {
      res.status(200).json({ games });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "game list could not be retrieved."
      });
      return;
    });
});

server.get("/api/games/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(game => {
      if (game.length === 0) {
        res.status(404).json({
          message: "That game does not exist."
        });
        return;
      }
      res.json({ game });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "game could not be retrived"
      });
      return;
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
game;
