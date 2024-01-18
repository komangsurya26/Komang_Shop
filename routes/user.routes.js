const { register, login } = require("../controller/auth");
const { getAll, update, deleted, updateDetail, getOne } = require("../controller/user");
const { verifyAccesToken } = require("../middleware/verifyAccess");

const router = require("express").Router();

router
  .post("/register/v1", register)
  .post("/login/v1", login)
  .get("/all/v1" ,getAll)
  .get("/user/v1/:id", getOne)
  .put("/update/v1", verifyAccesToken, update)
  .put("/updateDetail/v1", verifyAccesToken, updateDetail)
  .delete("/delete/v1", verifyAccesToken, deleted);

module.exports = router;
