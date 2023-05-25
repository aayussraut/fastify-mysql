const { signUp, signIn } = require("../controller/authController");

const authRoutes = async (fastify, options) => {
  const signUpOpts = {
    schema: {
      body: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: signUp,
  };

  const signInOpts = {
    schema: {
      body: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: signIn,
  };

  await fastify.post("/signup", signUpOpts);
  await fastify.post("/login", signInOpts);
};

module.exports = authRoutes;
