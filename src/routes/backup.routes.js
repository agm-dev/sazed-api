const multer = require("multer");
const { createRouter } = require("noswbi");
const { isAdmin } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");
const {
  downloadBackup,
  restoreBackup
} = require("../controllers/backup.controller");

const upload = multer();

const router = createRouter({ requireAuth: true });

router.get("/db/backup", isAdmin, catchErrors(downloadBackup));

router.post(
  "/db/backup",
  isAdmin,
  upload.single("file"),
  catchErrors(restoreBackup)
);

module.exports = router;
