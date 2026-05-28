const db = require("../db");

async function routes(fastify) {
  fastify.post("/", async (req) => {
    const { name } = req.body;

    const result = await db.query(
      "INSERT INTO users (name, elo) VALUES ($1, 1000) RETURNING *",
      [name]
    );

    return result.rows[0];
  });

  fastify.get("/:id", async (req) => {
    const result = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [req.params.id]
    );

    return result.rows[0];
  });
}

module.exports = routes;