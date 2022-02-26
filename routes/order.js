const router = require("express").Router();
const {
  authenticate,
  authenticateTokenAdmin,
  authenticateAdmin,
} = require("./middleware/authenticate");
const Order = require("../Modals/Order");

//Create order
// POST /api/orders
router.post("/", authenticate, async (req, res) => {
  const newOrder = new Order(req.body);
  newOrder
    .save()

    .then((order) => {
      return res.status(200).json({
        order,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Update a order
// PUT /api/orders/:id
router.put("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  Order.findByIdAndUpdate(id, req.body, { new: true })

    .then((order) => {
      if (!order) {
        return res.status(404).json({
          error: "Order not found",
        });
      }
      return res.status(200).json({
        order,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Delete a Order
// DELETE /api/orders/:id
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  Order.findByIdAndDelete(id)

    .then((order) => {
      if (!order) {
        return res.status(404).json({
          error: "Order not found",
        });
      }
      return res.status(200).json({
        Message: "Order deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get a user orders
// GET /api/orders/:userId
router.get("/find/:userId", authenticateAdmin, async (req, res) => {
  const { userId } = req.params;
  Order.find({ userId })
    .then((orders) => {
      if (!orders) {
        return res.status(404).json({
          error: "Orders not found",
        });
      }
      return res.status(200).json({
        orders,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get all orders
// GET /api/orders
router.get("/find/", authenticateAdmin, async (req, res) => {
  Order.find()
    .then((orders) => {
      if (!orders) {
        return res.status(404).json({
          error: "No Orders found",
        });
      }
      return res.status(200).json({
        orders,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get monthly income
// GET /api/orders/income
router.get("/income/", authenticateAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ])
    .then((income) => {
      if (!income) {
        return res.status(404).json({
          error: "No income found",
        });
      }
      return res.status(200).json({
        income,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
