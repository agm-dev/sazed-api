const { createRouter } = require("noswbi");
// const { isOwner } = require("../utils/middlewares");
const { isValidatedUser } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");
const {
  getSessions,
  getSessionById,
  addSession,
  updateSession,
  removeSession
} = require("../controllers/session.controllers");

const router = createRouter({ requireAuth: true });

router.get("/session", isValidatedUser, catchErrors(getSessions));
router.get("/session/:id", isValidatedUser, catchErrors(getSessionById));
router.post("/session", isValidatedUser, catchErrors(addSession));
// router.put("/session/:id", catchErrors(isOwner), catchErrors(updateSession));
router.put("/session/:id", isValidatedUser, catchErrors(updateSession));
// router.delete("/session/:id", catchErrors(isOwner), catchErrors(removeSession));
router.delete("/session/:id", isValidatedUser, catchErrors(removeSession));

module.exports = router;
