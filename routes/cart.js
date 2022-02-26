const router = require("express").Router();
const {
  authenticate,
  authenticateTokenAdmin,
  authenticateAdmin,
} = require("./middleware/authenticate");
const Cart = require("../Modals/Cart");

//Create cart
// POST /api/carts
router.post("/", authenticate, async (req, res) => {
  const newCart = new Cart(req.body);
  newCart
    .save()

    .then((cart) => {
      return res.status(200).json({
        cart,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Update a cart
// PUT /api/carts/:id
router.put("/:id", authenticateTokenAdmin, async (req, res) => {
  const { id } = req.params;
  Cart.findByIdAndUpdate(id, req.body, { new: true })

    .then((cart) => {
      if (!cart) {
        return res.status(404).json({
          error: "Cart not found",
        });
      }
      return res.status(200).json({
        cart,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Delete a cart
// DELETE /api/carts/:id
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  Cart.findByIdAndDelete(id)

    .then((cart) => {
      if (!cart) {
        return res.status(404).json({
          error: "Cart not found",
        });
      }
      return res.status(200).json({
        Message: "Cart deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get a user cart
// GET /api/carts/find/:userId
router.get("/find/:userId", authenticateAdmin, async (req, res) => {
  const { userId } = req.params;
  Cart.findOne({ userId })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({
          error: "Cart not found",
        });
      }
      return res.status(200).json({
        cart,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get all
// GET /api/carts/find/
router.get("/find/", authenticateAdmin, async (req, res) => {
  Cart.find()
    .then((carts) => {
      if (!carts) {
        return res.status(404).json({
          error: "No Carts found",
        });
      }
      return res.status(200).json({
        carts,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
