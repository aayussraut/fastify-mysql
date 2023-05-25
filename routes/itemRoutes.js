const {
  getItems,
  postItem,
  getItem,
  putItem,
  deleteItem,
} = require("../controller/itemController");

const itemRoutes = async (fastify, options) => {
  const getItemsOpts = {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              item_name: { type: "string" },
            },
          },
        },
      },
    },
    onRequest: fastify.authenticate,
    handler: getItems,
  };

  const getItemOpts = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              item_name: { type: "string" },
            },
          },
        },
      },
    },
    onRequest: fastify.authenticate,
    handler: getItem,
  };

  const postItemOpts = {
    schema: {
      body: {
        type: "object",
        required: ["item_name"],
        properties: {
          item_name: { type: "string" },
        },
      },
    },
    onRequest: fastify.authenticate,
    handler: postItem,
  };

  const putItemOpts = {
    schema: {
      body: {
        type: "object",
        required: ["item_name"],
        properties: {
          item_name: { type: "string" },
        },
      },
    },
    onRequest: fastify.authenticate,
    handler: putItem,
  };

  const deleteItemOpts = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    onRequest: fastify.authenticate,
    handler: deleteItem,
  };

  await fastify.get("/items", getItemsOpts);
  await fastify.get("/items/:id", getItemOpts);
  await fastify.post("/items", postItemOpts);
  await fastify.put("/items/:id", putItemOpts);
  await fastify.delete("/items/:id", deleteItemOpts);
};
module.exports = itemRoutes;
