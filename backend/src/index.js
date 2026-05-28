const fastify = require("fastify")({ logger: true });

const userRoutes = require("./routes/users");
const matchRoutes = require("./routes/matches");
const leaderboardRoutes = require("./routes/leaderboard");

fastify.get("/health", async () => {
  return { status: "ok" };
});

fastify.register(userRoutes, { prefix: "/users" });
fastify.register(matchRoutes, { prefix: "/matches" });
fastify.register(leaderboardRoutes, { prefix: "/leaderboard" });

const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
    console.log("API running on :4000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();