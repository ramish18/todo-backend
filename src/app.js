const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
const apiLogRoute = require("./routes/apiLogRoutes");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/todos", todoRoutes);
app.use("/api-logs", apiLogRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
