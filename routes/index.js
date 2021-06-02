const { Router } = require("express");

const apiRoutes = require("./api");

const router = Router();

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
