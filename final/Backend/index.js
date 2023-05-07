const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Subscription = require("./dataSchema.js");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/ProjectData", {
  dbName: "ProjectData",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, resp) => {
  const query = {};
  const allSubscriptions = await Subscription.find(query);
  console.log(allSubscriptions);
  resp.send(allSubscriptions);
});

app.get("/:id", async (req, resp) => {
  const id = req.params.id;
  const query = { _id: id };
  const oneSubscription = await Subscription.findOne(query);
  console.log(oneSubscription);
  resp.send(oneSubscription);
});

app.post("/insert", async (req, res) => {
  console.log(req.body);
  const formData = new Subscription(req.body);
  try {
    await formData.save();
    const messageResponse = { message: `Subscription added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new subscription:" + err);
  }
});

app.delete("/delete", async (req, res) => {
  console.log("Delete :", req.body);
  try {
    const query = { _id: req.body._id };
    await Subscription.deleteOne(query);
    const messageResponse = {
      message: `Subscription ${req.body._id} deleted correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while deleting subscription:" + req.body._id + " " + err);
  }
});

const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});
