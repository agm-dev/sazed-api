const { createRouter } = require("noswbi");
const { isValidatedUser, isOwner } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");
const {
  getSessions,
  getSessionById,
  addSession,
  updateSession,
  removeSession
} = require("../controllers/session.controllers");
const {
  validateAddSession,
  validateUpdateSession
} = require("../validations/session.validation");

const router = createRouter({ requireAuth: true });

router.get("/session", isValidatedUser, catchErrors(getSessions));

router.get("/session/:id", isValidatedUser, catchErrors(getSessionById));

router.post(
  "/session",
  isValidatedUser,
  validateAddSession,
  catchErrors(addSession)
);

router.put(
  "/session/:id",
  isValidatedUser,
  catchErrors(isOwner),
  validateUpdateSession,
  catchErrors(updateSession)
);

router.delete(
  "/session/:id",
  isValidatedUser,
  catchErrors(isOwner),
  catchErrors(removeSession)
);

module.exports = router;
