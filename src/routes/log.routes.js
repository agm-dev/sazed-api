const { createRouter } = require("noswbi");
const { isAdmin } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");
const { getLogs } = require("../controllers/log.controllers");

const router = createRouter({ requireAuth: true });

router.get("/log", isAdmin, catchErrors(getLogs));

module.exports = router;
