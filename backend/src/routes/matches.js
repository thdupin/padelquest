const db = require("../db");

function updateElo(winnerIds, loserIds) {
  const K = 20;

  winnerIds.forEach(async (id) => {
    await db.query("UPDATE users SET elo = elo + $1 WHERE id = $2", [
      K,
      id,
    ]);
  });

  loserIds.forEach(async (id) => {
    await db.query("UPDATE users SET elo = elo - $1 WHERE id = $2", [
      K,
      id,
    ]);
  });
}

async function routes(fastify) {
  fastify.post("/", async (req) => {
    const { teamA, teamB, scoreA, scoreB } = req.body;

    const result = await db.query(
      `INSERT INTO matches (team_a, team_b, score_a, score_b)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [teamA, teamB, scoreA, scoreB]
    );

    const match = result.rows[0];

    const winner = scoreA > scoreB ? teamA : teamB;
    const loser = scoreA > scoreB ? teamB : teamA;

    await updateElo(winner, loser);

    return {
      match,
      winner,
      loser,
    };
  });

  fastify.get("/", async () => {
    const res = await db.query("SELECT * FROM matches ORDER BY id DESC");
    return res.rows;
  });
}

module.exports = routes;