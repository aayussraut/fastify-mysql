const fastify = require("fastify")({ logger: true });

const app = fastify;

fastify.register(require("./plugins/database"));
fastify.register(require("@fastify/jwt"), {
  secret: "secret",
});

fastify.register(require("./routes/itemRoutes"));
fastify.register(require("./routes/authRoutes"));

fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
