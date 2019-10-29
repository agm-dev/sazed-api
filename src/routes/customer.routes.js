const { createRouter } = require("noswbi");
const { isAdmin, isValidatedUser } = require("../utils/middlewares");
const {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  removeCustomer
} = require("../controllers/customer.controllers");
const { catchErrors } = require("../utils/handlers");

const router = createRouter({ requireAuth: true });

router.get("/customer", isValidatedUser, catchErrors(getCustomers));
router.get("/customer/:id", isValidatedUser, catchErrors(getCustomerById));
router.post("/customer", isValidatedUser, isAdmin, catchErrors(addCustomer));
router.put(
  "/customer/:id",
  isValidatedUser,
  isAdmin,
  catchErrors(updateCustomer)
);
router.delete(
  "/customer/:id",
  isValidatedUser,
  isAdmin,
  catchErrors(removeCustomer)
);

module.exports = router;
