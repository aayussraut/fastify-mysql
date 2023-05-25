const signUp = (req, reply) => {
  req.server.mysql.query(
    "INSERT INTO users (username,password) VALUES (?,?)",
    [req.body.username, req.body.password],
    function onResult(err, result) {
      const token = req.server.jwt.sign({ username: req.body.username });
      // reply.header("Authorization", `Bearer ${token}`);
      reply.send({ token });
    }
  );
};

const signIn = (req, reply) => {
  req.server.mysql.query(
    "SELECT users FROM where username=(?) and  VALUES (?,?)",
    [req.body.username, req.body.password],
    function onResult(err, result) {
      const token = req.server.jwt.sign({ username: req.body.username });
      const refreshToken = req.server.jwt.sign(
        { username: req.body.username },
        { expiresIn: "50s" }
      );
      reply.send({ token });
    }
  );
};

module.exports = { signUp, signIn };
