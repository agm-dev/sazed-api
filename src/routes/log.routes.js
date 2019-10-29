const { createRouter } = require("noswbi");
const { isAdmin, isValidatedUser } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");
const { getLogs } = require("../controllers/log.controllers");

const router = createRouter({ requireAuth: true });

router.get("/log", isValidatedUser, isAdmin, catchErrors(getLogs));

module.exports = router;
