import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import env from "dotenv";
import { default as mongodb, ObjectId, ServerApiVersion } from "mongodb";

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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

app.post("/assignClass", async (req, res) => {
  await usersCollection.findOneAndUpdate(
    { name: req.body.student },
    { $set: { classroom: req.body.classroom } }
  );

  res.sendStatus(200);
});

app.get("/get/timetable/:id", async (req, res) => {
  const id = req.params.id;
  const teacherResult = await usersCollection.findOne({
    _id: new ObjectId(id),
  });
  const classroom = teacherResult.classroom;
  if (classroom === "NA") {
    res.json({
      message: "No Classroom",
    });
  } else {
    const { startTime, endTime } = await classroomCollection.findOne({
      name: classroom,
    });
    res.json({
      message: "Success",
      startTime: startTime,
      endTime: endTime,
    });
  }
});

app.get("/get/classStudents/:id", async (req, res) => {
  const id = req.params.id;
  const teacherResult = await usersCollection.findOne({
    _id: new ObjectId(id),
  });
  const classroom = teacherResult.classroom;
  if (classroom === "NA") {
    res.json({
      message: "No Classroom",
    });
  } else {
    const result = await usersCollection
      .find({ $and: [{ classroom: classroom }, { role: "Student" }] })
      .toArray();
    res.send(result);
  }
});

app.get("/get/students/:id", async (req, res) => {
  const id = req.params.id;
  const teacherResult = await usersCollection.findOne({
    _id: new ObjectId(id),
  });
  const classroom = teacherResult.classroom;
  if (classroom === "NA") {
    res.json({
      message: "No Classroom",
    });
  } else {
    const result = await usersCollection
      .find({ $and: [{ classroom: classroom }, { role: "Student" }] })
      .toArray();
    res.send(result);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const result = await usersCollection.findOne({ email: email });
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

app.get("/get/users", async (req, res) => {
  const result = await usersCollection
    .find({ role: { $ne: "Principal" } })
    .toArray();

  res.send(result);
});

app.post("/delete/byEmail", (req, res) => {
  usersCollection.findOneAndDelete({ email: req.body.email });
  res.sendStatus(200);
});

app.get("/get/students", async (req, res) => {
  const result = await usersCollection
    .find({ $and: [{ role: "Student" }, { classroom: "NA" }] })
    .toArray();
  res.send(result);
});

app.get("/get/class", async (req, res) => {
  const result = await classroomCollection.find({}).toArray();
  res.send(result);
});

app.get("/get/teachers", async (req, res) => {
  const arr = await usersCollection
    .find({ role: "Teacher", classroom: "NA" })
    .toArray(function (err, resultArr) {
      return resultArr;
    });
  res.send(arr);
});

app.post("/changeName", async (req, res) => {
  await usersCollection.findOneAndUpdate(
    { email: req.body.email },
    { $set: { name: req.body.name } }
  );
  res.sendStatus(200);
});

app.post("/Principal/createAcc", async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);

  const result = usersCollection.findOne({ email: req.body.email });
  if (result.isEmpty) {
    res.json({
      message: "Account Exists",
    });
  } else {
    await usersCollection.insertOne({
      ...req.body,
      classroom: "NA",
    });
    res.json({
      message: "Status OK",
    });
  }
});

app.post("/Principal/createClass", async (req, res) => {
  await classroomCollection.insertOne({
    ...req.body,
  });

  await usersCollection.updateOne(
    { name: req.body.teacher },
    { $set: { classroom: `${req.body.name}` } }
  );
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Listening on 3000.");
});
