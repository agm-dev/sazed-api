const { createRouter } = require("noswbi");
const {
  getUserInfoController,
  validateUserController,
  disableUserController
} = require("../controllers/user.controllers");
const { isAdmin, isValidatedUser } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");

const router = createRouter({ requireAuth: true });

router.get("/user/me", isValidatedUser, getUserInfoController);
router.put("/user/:id/validate", isAdmin, catchErrors(validateUserController));
router.put("/user/:id/disable", isAdmin, catchErrors(disableUserController));

module.exports = router;
