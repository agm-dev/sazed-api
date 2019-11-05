const { createRouter } = require("noswbi");
const { isAdmin, isValidatedUser } = require("../utils/middlewares");
const {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  removeCustomer
} = require("../controllers/customer.controllers");
const {
  validateAddCustomer,
  validateUpdateCustomer
} = require("../validations/customer.validation");
const { catchErrors } = require("../utils/handlers");

const router = createRouter({ requireAuth: true });

router.get("/customer", isValidatedUser, catchErrors(getCustomers));
router.get("/customer/:id", isValidatedUser, catchErrors(getCustomerById));
router.post(
  "/customer",
  isAdmin,
  validateAddCustomer,
  catchErrors(addCustomer)
);
router.put(
  "/customer/:id",
  isAdmin,
  validateUpdateCustomer,
  catchErrors(updateCustomer)
);
router.delete("/customer/:id", isAdmin, catchErrors(removeCustomer));

module.exports = router;
