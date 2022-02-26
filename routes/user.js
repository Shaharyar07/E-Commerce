const router = require("express").Router();
const {
  authenticate,
  authenticateTokenAdmin,
  authenticateAdmin,
} = require("./middleware/authenticate");
const CryptoJS = require("crypto-js");
const User = require("../Modals/User");
//Key for encrypting the password
const key = "glitch";

//Update a user
// PUT /api/users/:id
router.put("/:id", authenticateTokenAdmin, async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (password) {
    const newPass = CryptoJS.AES.encrypt(password, key).toString();
    req.body.password = newPass;
  }
  User.findByIdAndUpdate(id, req.body, { new: true })

    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }
      return res.status(200).json({
        user,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Delete a user
// DELETE /api/users/:id
router.delete("/:id", authenticateTokenAdmin, async (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)

    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }
      return res.status(200).json({
        Message: "User deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get a user
// GET /api/users/:id
router.get("/find/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  User.findById(id)

    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }
      return res.status(200).json({
        user,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

//Get all users
// GET /api/users
router.get("/", authenticateAdmin, async (req, res) => {
  const query = req.query.new;
  if (query) {
    User.find()
      .sort({ _id: -1 })
      .limit(5)
      .then((users) => {
        if (!users) {
          return res.status(404).json({
            error: "No users found",
          });
        }
        return res.status(200).json({
          users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  } else {
    User.find()
      .then((users) => {
        if (!users) {
          return res.status(404).json({
            error: "No users found",
          });
        }
        return res.status(200).json({
          users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  }
});

//Get user Stats
// GET /api/users/stats
router.get("/stats", authenticateAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: err, 
    });
  }
});

module.exports = router;
