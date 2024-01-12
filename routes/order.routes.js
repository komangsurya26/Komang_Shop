const { createOrder, updateDateOrder, deleteAllOrder } = require("../controller/order");
const { verifyAccesToken } = require("../middleware/verifyAccess");

const router = require("express").Router();

router
  .post("/order/v1", verifyAccesToken, createOrder)
  .put("/update/order/v1/:id", updateDateOrder)
  .delete("/delete/order/v1", deleteAllOrder);

module.exports = router;
