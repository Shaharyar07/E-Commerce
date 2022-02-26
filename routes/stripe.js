const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KUFCYIpA04TLWfa4DtJwlXLJcxBJNPUEWW72ktUWeO6mCBgWbowD8glgz0Ea6926Eqm0n8oK9TnsjfTErxxNdgX00zd2CxmaZ"
);
router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      amount: req.body.amount,
      currency: "usd",
      source: req.body.tokenId,
    },
    (err, charge) => {
      if (err) {
        res.send({
          success: false,
          message: err.message,
        });
      } else {
        res.send({
          success: true,
          charge,
          message: "payment successful",
        });
      }
    }
  );
});
module.exports = router;
