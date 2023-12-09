const { register, login } = require("../controller/auth");
const { getAll, update, deleted, updateDetail } = require("../controller/user");
const { verifyAccesToken } = require("../middleware/verifyAccess");

const router = require("express").Router();

router
  .post("/register", register)
  .post("/login", login)
  .get("/all", getAll)
  .put("/update", verifyAccesToken, update)
  .put("/updateDetail", verifyAccesToken, updateDetail)
  .delete("/delete", verifyAccesToken, deleted);

module.exports = router;
