import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import env from "dotenv";
import { default as mongodb, ServerApiVersion } from "mongodb";

let MongoClient = mongodb.MongoClient;

const app = express();
const saltRounds = 10;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("heliverse");
const usersCollection = db.collection("users");
const classroomCollection = db.collection("classroom");

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(req, email, password);
  const result = await usersCollection.findOne({ email: email });
  console.log(result);
  if (result) {
    bcrypt.compare(password, result.password, (err, check) => {
      if (err) console.error(err);
      if (!check) {
        res.json({
          message: "Incorrect Password",
        });
      } else {
        res.json({
          ...result,
          message: "Authentication Success",
        });
      }
    });
  } else {
    res.json({
      message: "Failure",
    });
  }
});

app.listen(3000, () => {
  console.log("Listening on 3000.");
});
