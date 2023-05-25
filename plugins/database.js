const fastifyPlugin = require("fastify-plugin");

const dbConnector = async (fastify, options) => {
  try {
    await fastify.register(require("@fastify/mysql"), {
      connectionString: "mysql://iush:8502@localhost:3306/item_database",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = fastifyPlugin(dbConnector);
