const { createRouter } = require("noswbi");
const { getUserInfoController } = require("../controllers/user.controllers");

const router = createRouter({ requireAuth: true });

router.get("/user/me", getUserInfoController);

module.exports = router;
