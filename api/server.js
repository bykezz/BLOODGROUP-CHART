const express = require("express");
const { getDocs, collection } = require("firebase/firestore");
const { db } = require("./firebaseConfig");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/people", async (req, res) => {
  try {
    const people = [];
    const querySnapshot = await getDocs(collection(db, "people"));
    querySnapshot.forEach((doc) => {
      people.push({ id: doc.id, ...doc.data() });
    });
    res.json(people);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
