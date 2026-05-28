const db = require("../db");

async function routes(fastify) {
  fastify.get("/", async () => {
    const res = await db.query("SELECT id, name, elo FROM users ORDER BY elo DESC");

    return res.rows;
  });
}

module.exports = routes;