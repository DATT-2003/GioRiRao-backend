const express = require("express");
const orderController = require("../controllers/order.controller");
const {} = require("../validations/order.validation");

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/code/:code", orderController.getOrderByCode);
router.patch("/:id", orderController.updateOrderStatusToComplete);
router.get("/:id", orderController.getOrderDetail);

router.get(
  "/pending-orders/:storeId",
  orderController.getPendingOrdersByStoreandDate
);

module.exports = router;
