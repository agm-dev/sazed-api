const { createRouter } = require("noswbi");
const { isAdmin } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");
const {
  downloadBackup,
  restoreBackup
} = require("../controllers/backup.controller");

const router = createRouter({ requireAuth: true });

router.get("/db/backup", isAdmin, catchErrors(downloadBackup));

router.post("/db/backup", isAdmin, catchErrors(restoreBackup));

module.exports = router;
