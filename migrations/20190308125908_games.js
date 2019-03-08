exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", function(games) {
    games.increments();
    games
      .string("title")
      .notNullable()
      .unique();
    games.string("genre");
    games.integer("releaseYear");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
