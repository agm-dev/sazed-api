const { createRouter } = require("noswbi");
const { getUserInfoController } = require("../controllers/user.controllers");
const { isValidatedUser } = require("../utils/middlewares");

const router = createRouter({ requireAuth: true });

router.get("/user/me", isValidatedUser, getUserInfoController);

module.exports = router;
