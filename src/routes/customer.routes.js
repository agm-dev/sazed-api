const { createRouter } = require("noswbi");
const {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  removeCustomer
} = require("../controllers/customer.controllers");

const router = createRouter({ requireAuth: true });

router.get("/customer", getCustomers);
router.get("/customer/:id", getCustomerById);
router.post("/customer", addCustomer);
router.put("/customer/:id", updateCustomer);
// router.delete("/customer/:id", onlyAdminAllowed, controllers.removeCustomer); // only for admin
router.delete("/customer/:id", removeCustomer);

module.exports = router;
