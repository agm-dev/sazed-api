const { createRouter } = require("noswbi");
const { isAdmin } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");
const { downloadBackup } = require("../controllers/backup.controller");

const router = createRouter({ requireAuth: true });

router.get("/db/backup", isAdmin, catchErrors(downloadBackup));

module.exports = router;
