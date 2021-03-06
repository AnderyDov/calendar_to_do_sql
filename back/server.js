import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { createPool } from "mysql2";
import { HOST, USER, PASSWORD, DB } from "./config/db.config.js";

let __dirname = dirname(fileURLToPath(import.meta.url));
__dirname = __dirname.split("back")[0];

const pool = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 30,
});

const server = express();
server.use(bodyParser.json());
server.use(express.static(path.resolve(__dirname, "front/build")));

server.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "front/build", "index.html"));
});

server.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

server.get("/connect", (req, res) => {
  pool.query("SELECT * FROM users", (err, result, fields) => {
    if (!err) {
      res.send("connect");
    } else {
      console.log(err);
    }
  });
});

server.post("/registration", (req, res) => {
  pool.query(
    `SELECT name FROM users WHERE name='${req.body.name}'`,
    (err, result, fields) => {
      if (!err) {
        if (result.length !== 0) {
          res.send(JSON.stringify("этот логин занят"));
        } else if (req.body.name.length === 0 || req.body.pass.length === 0) {
          res.send(JSON.stringify("все поля надо заполнить"));
        } else if (req.body.name.length < 3) {
          res.send(JSON.stringify("логин минимум три символа"));
        } else if (req.body.pass.length < 3) {
          res.send(JSON.stringify("пароль минимум три символа"));
        } else {
          pool.query(
            `INSERT INTO users(name, password) VALUES ('${req.body.name}', '${req.body.pass}')`
          );
          res.send(JSON.stringify("OK"));
        }
      } else {
        console.log(err);
      }
    }
  );
});

server.post("/login", (req, res) => {
  pool.query(
    `SELECT * FROM users WHERE name='${req.body.name}'`,
    (err, result, fields) => {
      if (!err) {
        if (req.body.name.length === 0 || req.body.pass.length === 0) {
          res.send(JSON.stringify("все поля надо заполнить"));
        } else if (result.length === 0) {
          res.send(JSON.stringify("нет такого юзера"));
        } else if (result[0].password !== req.body.pass) {
          res.send(JSON.stringify("неверный пароль"));
        } else {
          res.send(JSON.stringify("OK"));
        }
      } else {
        console.log(err);
      }
    }
  );
});

server.post("/base", (req, res) => {
  pool.query(
    `SELECT * FROM tasks WHERE name='${req.body.name}'`,
    (err, result, fields) => {
      if (!err) {
        res.send(JSON.stringify(result));
      } else {
        console.log(err);
      }
    }
  );
});

server.post("/add", (req, res) => {
  pool.query(
    `INSERT INTO tasks(name, date, text) VALUES ('${req.body.name}', '${req.body.date}', '${req.body.text}')`,
    (err, result, fields) => {
      if (!err) {
        pool.query(
          `SELECT * FROM tasks WHERE name='${req.body.name}'`,
          (err, result, fields) => {
            if (!err) {
              res.send(JSON.stringify(result));
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

server.post("/del", (req, res) => {
  pool.query(
    `DELETE FROM tasks WHERE name='${req.body.name}' AND id=${req.body.id} AND date='${req.body.date}'`,
    (err, result, fields) => {
      if (!err) {
        pool.query(
          `SELECT * FROM tasks WHERE name='${req.body.name}'`,
          (err, result, fields) => {
            if (!err) {
              res.send(JSON.stringify(result));
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

server.post("/save", (req, res) => {
  pool.query(
    `UPDATE tasks SET text='${req.body.text}' WHERE name='${req.body.name}' AND id=${req.body.id} AND date='${req.body.date}'`,
    (err, result, fields) => {
      if (!err) {
        pool.query(
          `SELECT * FROM tasks WHERE name='${req.body.name}'`,
          (err, result, fields) => {
            if (!err) {
              res.send(JSON.stringify(result));
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

server.use((req, res) => {
  res.send("error");
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
