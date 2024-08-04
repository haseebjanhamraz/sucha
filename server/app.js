const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const animalRoutes = require("./routes/animals");
const milkRecordRoutes = require("./routes/milkRecords");
const vaccineRecordRoutes = require("./routes/vaccineRecords");
const vaccineRoutes = require("./routes/vaccineList");
const AiSemen = require("./routes/aiSemen");
const pregnancyRecord = require("./routes/pregnancyRecord");
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
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/milk-records", milkRecordRoutes);
app.use("/api/vaccine-records", vaccineRecordRoutes);
app.use("/api/vaccines", vaccineRoutes);
app.use("/api/ai-semens", AiSemen);
app.use("/api/inject-ai", pregnancyRecord);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
