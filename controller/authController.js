const signUp = (req, reply) => {
  req.server.mysql.query(
    "INSERT INTO users (username,password) VALUES (?,?)",
    [req.body.username, req.body.password],
    function onResult(err, result) {
      // const token = req.server.jwt.sign({ username: req.body.username });
      // reply.header("Authorization", `Bearer ${token}`);
      console.log("\nHelllooo WOrld\n");
      if (result) reply.send({ msg: "Registration Successful" });
      else reply.send({ msg: "Registration Failed" });
    }
  );
};

const signIn = (req, reply) => {
  req.server.mysql.query(
    "SELECT * FROM users where username=(?) and  password (?)",
    [req.body.username, req.body.password],
    function onResult(err, result) {
      if (result) {
        const token = req.server.jwt.sign({ username: req.body.username });
        reply.header("Authorization", `Bearer ${token}`);
        reply.send({ token });
      } else reply.send(err);
      // const refreshToken = req.server.jwt.sign(
      //   { username: req.body.username },
      //   { expiresIn: "50s" }
      // );
    }
  );
};

module.exports = { signUp, signIn };
