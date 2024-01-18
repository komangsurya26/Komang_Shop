const { createOrder, updateOrder, getOrderDetails } = require("../controller/order");
const { verifyAccesToken } = require("../middleware/verifyAccess");

const router = require("express").Router();

router
  .post("/order/v1", verifyAccesToken, createOrder)
  .put("/update/order/v1", updateOrder)
  .get("/get/order/v1", getOrderDetails)

module.exports = router;
