const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const animalRoutes = require("./routes/animals");
const milkRecordRoutes = require("./routes/milkRecords");
const vaccineRecordRoutes = require("./routes/vaccineRecords");
const authRoutes = require("./routes/auth");
const cors = require("cors");

require("./config/passport")(passport); // Passport config

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/dairyFarm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/animals", animalRoutes);
app.use("/api/milkRecords", milkRecordRoutes);
app.use("/api/vaccineRecords", vaccineRecordRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
