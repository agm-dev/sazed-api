const { createRouter } = require("noswbi");
const { isAdmin } = require("../utils/middlewares");
const {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  removeCustomer
} = require("../controllers/customer.controllers");
const { catchErrors } = require("../utils/handlers");

const router = createRouter({ requireAuth: true });

router.get("/customer", catchErrors(getCustomers));
router.get("/customer/:id", catchErrors(getCustomerById));
router.post("/customer", isAdmin, catchErrors(addCustomer));
router.put("/customer/:id", isAdmin, catchErrors(updateCustomer));
// router.delete("/customer/:id", onlyAdminAllowed, catchErrors(removeCustomer)); // only for admin
router.delete("/customer/:id", isAdmin, catchErrors(removeCustomer));

module.exports = router;
