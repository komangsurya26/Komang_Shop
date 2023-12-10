const { createItem, updateItem, getItem, getAllItem } = require("../controller/item");
const { verifyAccesAdmin } = require("../middleware/verifyAccess");

const router = require("express").Router();

router
  .post("/create/item/v1", createItem)
  .put("/update/item/:id/v1", updateItem)
  .get("/item/:id/v1", getItem)
  .get("/item/v1", getAllItem)


module.exports = router;