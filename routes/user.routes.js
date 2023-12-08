const { register, login } = require("../controller/auth");
const { getAll, update, deleted } = require("../controller/user");
const { verifyAccesToken } = require("../middleware/verifyAccess");

const router = require("express").Router();

router
  .post("/register", register)
  .post("/login", login)
  .get("/all", getAll)
  .put("/update", verifyAccesToken, update)
  .delete("/delete", verifyAccesToken, deleted);

module.exports = router;
