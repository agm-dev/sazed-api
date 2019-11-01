const { createRouter } = require("noswbi");
const {
  getUserInfoController,
  getUsersController,
  validateUserController,
  disableUserController
} = require("../controllers/user.controllers");
const { isAdmin, isValidatedUser } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");

const router = createRouter({ requireAuth: true });

router.get("/user/me", isValidatedUser, getUserInfoController);

router.get("/user", isAdmin, catchErrors(getUsersController));

router.put("/user/:id/validate", isAdmin, catchErrors(validateUserController));

router.put("/user/:id/disable", isAdmin, catchErrors(disableUserController));

module.exports = router;
