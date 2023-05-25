const getItems = (req, reply) => {
  req.server.mysql.query(
    "SELECT item_name FROM items",
    function onResult(err, result) {
      reply.send(err || result);
    }
  );
};

const getItem = (req, reply) => {
  req.server.mysql.query(
    "SELECT item_name FROM items WHERE id= ?",
    [req.params.id],
    function onResult(err, result) {
      reply.send(err || result);
    }
  );
};

const postItem = (req, reply) => {
  req.server.mysql.query(
    "INSERT INTO items (item_name) VALUES (?)",
    [req.body.item_name],
    function onResult(err, result) {
      if (!err) {
        reply.send({ msg: "Item added" });
      } else reply.send(err);
    }
  );
};

const putItem = (req, reply) => {
  req.server.mysql.query(
    "UPDATE items SET item_name = ? WHERE id = ?",
    [req.body.item_name, req.params.id],
    function onResult(err, result) {
      if (!err) {
        reply.send({ msg: "Item updated" });
      } else reply.send(err);
    }
  );
};

const deleteItem = (req, reply) => {
  req.server.mysql.query(
    "DELETE FROM items WHERE id = ?",
    [req.params.id],
    function onResult(err, result) {
      if (!err) reply.send({ message: "Item deleted" });
      else reply.send(err);
    }
  );
};

module.exports = { getItems, getItem, postItem, putItem, deleteItem };
