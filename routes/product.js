const router = require("express").Router();
const {
  authenticate,
  authenticateTokenAdmin,
  authenticateAdmin,
} = require("./middleware/authenticate");
const Product = require("../Modals/Product");

//Create Product
// POST /api/products
router.post("/", authenticateTokenAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()

    .then((product) => {
      return res.status(200).json({
        product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Update a product
// PUT /api/products/:id
router.put("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body, { new: true })

    .then((product) => {
      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }
      return res.status(200).json({
        product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Delete a product
// DELETE /api/products/:id
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)

    .then((product) => {
      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }
      return res.status(200).json({
        Message: "Product deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get a product
// GET /api/products/find/:id
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }
      return res.status(200).json({
        product,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get all products
// GET /api/products
router.get("/find/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  if (qNew) {
    Product.find()
      .sort({ _id: -1 })
      .limit(5)
      .then((products) => {
        if (!products) {
          return res.status(404).json({
            error: "No products found",
          });
        }
        return res.status(200).json({
          products,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }
  if (qCategory) {
    Product.find({
      categories: {
        $in: [qCategory],
      },
    })

      .then((products) => {
        if (!products) {
          return res.status(404).json({
            error: "No products found",
          });
        }
        return res.status(200).json({
          products,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  } else {
    Product.find()
      .then((products) => {
        if (!products) {
          return res.status(404).json({
            error: "No products found",
          });
        }
        return res.status(200).json({
          products,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }
});

module.exports = router;
